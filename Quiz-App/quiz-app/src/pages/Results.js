import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Results() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('quizResult');
    if (!saved) { navigate('/quiz'); return; }
    setResult(JSON.parse(saved));
  }, [navigate]);

  if (!result) return null;

  const { score, total, topic } = result;
  const percentage = Math.round((score / total) * 100);
  const wrong      = total - score;
  const grade      = percentage >= 80 ? 'Excellent Work!' : percentage >= 60 ? 'Good Job!' : 'Keep Practicing';
  const gradeColor = percentage >= 80 ? '#1e8449' : percentage >= 60 ? '#b7770d' : '#c0392b';
  const myName     = localStorage.getItem('name') || 'You';

  return (
    <div className="results-wrapper">

      {/* Score card */}
      <div className="score-card">
        <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#2c3e7a', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>
          {topic} — Quiz Result
        </div>
        <div className="score-circle">
          <span className="score-number">{score}</span>
          <span className="score-out-of">out of {total}</span>
        </div>
        <div className="score-grade" style={{ color: gradeColor }}>{grade}</div>
        <div className="score-msg">You scored {percentage}% on this quiz</div>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-box">
          <div className="stat-value" style={{ color: '#1e8449' }}>{score}</div>
          <div className="stat-name">Correct</div>
        </div>
        <div className="stat-box">
          <div className="stat-value" style={{ color: '#c0392b' }}>{wrong}</div>
          <div className="stat-name">Wrong</div>
        </div>
        <div className="stat-box">
          <div className="stat-value" style={{ color: '#2c3e7a' }}>{percentage}%</div>
          <div className="stat-name">Score</div>
        </div>
      </div>

      {/* Result summary */}
      <div style={{ width: '100%', maxWidth: 480, background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10, padding: '20px 24px', marginBottom: 20 }}>
        <div className="section-heading" style={{ marginBottom: 14 }}>Your attempt</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: '#eef0fb', color: '#2c3e7a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1rem' }}>
            {myName.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1a1a2e' }}>{myName}</div>
            <div style={{ fontSize: '0.78rem', color: '#999', marginTop: 2 }}>Completed {topic} quiz</div>
          </div>
          <div style={{ fontWeight: 700, fontSize: '1rem', color: gradeColor }}>{percentage}%</div>
        </div>
      </div>

      {/* Question review */}
      <div style={{ width: '100%', maxWidth: 480, marginBottom: 24 }}>
        <div className="section-heading" style={{ marginBottom: 10 }}>Question review</div>
        {result.answers.map((a, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: '#fff',
            border: `1px solid ${a.isCorrect ? '#b2eacb' : '#f5c6c6'}`,
            borderRadius: 8,
            padding: '10px 14px',
            marginBottom: 7,
            fontSize: '0.85rem',
          }}>
            <div style={{
              width: 26, height: 26, borderRadius: 6,
              background: a.isCorrect ? '#f0fff6' : '#fff0f0',
              color: a.isCorrect ? '#1e8449' : '#c0392b',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '0.8rem', flexShrink: 0,
            }}>
              {a.isCorrect ? '✓' : '✗'}
            </div>
            <span style={{ color: '#555' }}>Question {i + 1}</span>
            <span style={{ marginLeft: 'auto', fontWeight: 600, color: a.isCorrect ? '#1e8449' : '#c0392b' }}>
              {a.isCorrect ? 'Correct' : 'Wrong'}
            </span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="results-actions">
        <button
          className="btn-secondary"
          onClick={() => { localStorage.removeItem('quizResult'); navigate('/quiz'); }}
        >
          Retake Quiz
        </button>
        <button
          className="btn-primary"
          style={{ width: 'auto', padding: '10px 22px' }}
          onClick={() => { localStorage.removeItem('quizResult'); navigate('/quiz'); }}
        >
          Try Another Subject
        </button>
      </div>

    </div>
  );
}

export default Results;