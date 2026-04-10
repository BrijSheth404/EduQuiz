import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const ALL_QUESTIONS = {
  coa: [
    { id: 1, question: 'What does COA stand for?', options: ['Computer Organization and Architecture', 'Central Operations and Algorithms', 'Computer Output and Algorithms', 'Core Operations Architecture'], correct: 0 },
    { id: 2, question: 'Which component stores data temporarily in a CPU?', options: ['Hard Disk', 'Register', 'RAM', 'Cache'], correct: 1 },
    { id: 3, question: 'What is the function of the ALU?', options: ['Store data permanently', 'Perform arithmetic and logic operations', 'Control input/output devices', 'Manage memory allocation'], correct: 1 },
    { id: 4, question: 'What does the program counter (PC) do?', options: ['Counts the number of programs', 'Holds the address of the next instruction', 'Stores the result of operations', 'Controls the clock speed'], correct: 1 },
    { id: 5, question: 'Which memory is fastest in a computer system?', options: ['Hard Disk', 'RAM', 'Cache Memory', 'ROM'], correct: 2 },
  ],
  cn: [
    { id: 1, question: 'What does IP stand for in networking?', options: ['Internet Protocol', 'Internal Process', 'Input Port', 'Integrated Packet'], correct: 0 },
    { id: 2, question: 'How many layers are in the OSI model?', options: ['5', '6', '7', '4'], correct: 2 },
    { id: 3, question: 'Which layer is responsible for routing in the OSI model?', options: ['Transport Layer', 'Data Link Layer', 'Network Layer', 'Session Layer'], correct: 2 },
    { id: 4, question: 'What does DNS stand for?', options: ['Data Network System', 'Domain Name System', 'Dynamic Name Server', 'Direct Network Service'], correct: 1 },
    { id: 5, question: 'Which protocol is used to send emails?', options: ['FTP', 'HTTP', 'SMTP', 'SNMP'], correct: 2 },
  ],
  awt: [
    { id: 1, question: 'What does MERN stand for?', options: ['MongoDB, Express, React, Node.js', 'MySQL, Express, Redux, Node.js', 'MongoDB, Electron, React, Nginx', 'MySQL, Ember, React, Node.js'], correct: 0 },
    { id: 2, question: 'Which hook manages state in React?', options: ['useEffect', 'useRef', 'useState', 'useContext'], correct: 2 },
    { id: 3, question: 'What is the purpose of Express.js?', options: ['Frontend framework', 'Database management', 'Backend web framework for Node.js', 'CSS preprocessor'], correct: 2 },
    { id: 4, question: 'What does REST stand for?', options: ['Remote Execution State Transfer', 'Representational State Transfer', 'Request and State Transfer', 'Relational State Transfer'], correct: 1 },
    { id: 5, question: 'Which method in HTTP is used to send data to the server?', options: ['GET', 'DELETE', 'POST', 'PUT'], correct: 2 },
  ],
  dm: [
    { id: 1, question: 'What is a set in Discrete Mathematics?', options: ['A list of numbers', 'A collection of distinct objects', 'A sequence of elements', 'A group of functions'], correct: 1 },
    { id: 2, question: 'What is the result of A ∪ B called?', options: ['Intersection', 'Complement', 'Union', 'Difference'], correct: 2 },
    { id: 3, question: 'What is a graph in Discrete Mathematics?', options: ['A bar chart', 'A set of vertices connected by edges', 'A mathematical function', 'A sorted list'], correct: 1 },
    { id: 4, question: 'What does P → Q mean in logic?', options: ['P and Q', 'P or Q', 'If P then Q', 'P is equal to Q'], correct: 2 },
    { id: 5, question: 'What is a tree in graph theory?', options: ['A connected graph with no cycles', 'A graph with all vertices connected', 'A graph with weighted edges', 'A directed graph'], correct: 0 },
  ],
  os: [
    { id: 1, question: 'What is an operating system?', options: ['A programming language', 'Software that manages hardware and software resources', 'A type of database', 'A network protocol'], correct: 1 },
    { id: 2, question: 'What is a process in an OS?', options: ['A stored file', 'A program in execution', 'A hardware component', 'A network connection'], correct: 1 },
    { id: 3, question: 'What is deadlock in an OS?', options: ['A system crash', 'When two processes wait for each other forever', 'A slow running process', 'Memory overflow'], correct: 1 },
    { id: 4, question: 'What does CPU scheduling decide?', options: ['Which file to open', 'Which process gets the CPU and when', 'How much RAM to use', 'Which program to install'], correct: 1 },
    { id: 5, question: 'What is virtual memory?', options: ['Extra RAM added to the system', 'Using hard disk space as extra RAM', 'Memory inside the CPU', 'Read-only memory'], correct: 1 },
  ],
};

const TOPICS = [
  { key: 'coa', label: 'COA', icon: '💻' },
  { key: 'cn',  label: 'CN',  icon: '🌐' },
  { key: 'awt', label: 'AWT', icon: '⚛' },
  { key: 'dm',  label: 'DM',  icon: '📐' },
  { key: 'os',  label: 'OS',  icon: '⚙️' },
];

const LETTERS = ['A', 'B', 'C', 'D'];

function QuizPage() {
  const navigate = useNavigate();

  const [started, setStarted]   = useState(false);
  const [topic, setTopic]       = useState('coa');
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent]   = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [timer, setTimer]       = useState(30);
  const [answers, setAnswers]   = useState([]);

  const goNext = useCallback(() => {
    const isCorrect = selected === questions[current].correct;
    const updated   = [...answers, { id: questions[current].id, selected, isCorrect }];
    setAnswers(updated);
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
      setTimer(30);
    } else {
      const score = updated.filter(a => a.isCorrect).length;
      localStorage.setItem('quizResult', JSON.stringify({
        score,
        total: questions.length,
        topic: TOPICS.find(t => t.key === topic).label,
        answers: updated,
      }));
      navigate('/results');
    }
  }, [selected, current, questions, answers, navigate, topic]);

  useEffect(() => {
    if (!started || answered) return;
    if (timer === 0) { goNext(); return; }
    const id = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer, answered, goNext, started]);

  const handleStart = () => {
    setQuestions(ALL_QUESTIONS[topic]);
    setTimer(30);
    setStarted(true);
  };

  // ── SETUP SCREEN ──
  if (!started) {
    return (
      <div className="quiz-wrapper">
        <div className="question-card" style={{ maxWidth: 500 }}>
          <div className="question-label">Select subject</div>
          <div className="question-text" style={{ fontSize: '1rem', marginBottom: 24 }}>
            Choose a subject to start the quiz — 5 questions, 30 seconds each
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 28 }}>
            {TOPICS.map(t => (
              <button
                key={t.key}
                onClick={() => setTopic(t.key)}
                style={{
                  padding: '14px 8px',
                  border: `1.5px solid ${topic === t.key ? '#2c3e7a' : '#dde1ef'}`,
                  borderRadius: 8,
                  background: topic === t.key ? '#eef0fb' : '#fafafa',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ fontSize: 20, marginBottom: 6 }}>{t.icon}</div>
                <div style={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: topic === t.key ? '#2c3e7a' : '#333',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  {t.label}
                </div>
              </button>
            ))}
          </div>

          <div style={{ background: '#f4f6f9', borderRadius: 8, padding: '12px 16px', marginBottom: 24, fontSize: '0.85rem', color: '#555' }}>
            <strong style={{ color: '#2c3e7a' }}>{TOPICS.find(t => t.key === topic).label}</strong> — 5 questions · 30 seconds per question
          </div>

          <button className="btn-primary" onClick={handleStart}>
            Start Quiz →
          </button>
        </div>
      </div>
    );
  }

  // ── QUIZ SCREEN ──
  const q        = questions[current];
  const progress = (current / questions.length) * 100;

  return (
    <div className="quiz-wrapper">
      <div className="quiz-topbar">
        <span className="quiz-category">
          {TOPICS.find(t => t.key === topic).icon} {TOPICS.find(t => t.key === topic).label}
        </span>
        <span className={`quiz-timer ${timer <= 8 ? 'urgent' : ''}`}>
          Time: {String(Math.floor(timer / 60)).padStart(2,'0')}:{String(timer % 60).padStart(2,'0')}
        </span>
      </div>

      <div className="progress-section">
        <div className="progress-labels">
          <span>Question {current + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% done</span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="question-card">
        <div className="question-label">Question {current + 1}</div>
        <div className="question-text">{q.question}</div>
        <div className="options-list">
          {q.options.map((opt, idx) => {
            let cls = 'option-item';
            if (answered) {
              if (idx === q.correct) cls += ' correct';
              else if (idx === selected) cls += ' wrong';
            } else if (idx === selected) cls += ' selected';
            return (
              <button key={idx} className={cls} onClick={() => { if (!answered) { setSelected(idx); setAnswered(true); } }}>
                <span className="option-badge">{LETTERS[idx]}</span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      <div className="quiz-footer">
        <button className="btn-next" onClick={goNext} disabled={!answered}>
          {current + 1 === questions.length ? 'Finish Quiz' : 'Next Question'} →
        </button>
      </div>
    </div>
  );
}

export default QuizPage;