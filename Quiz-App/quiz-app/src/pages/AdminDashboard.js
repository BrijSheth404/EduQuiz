import React, { useState } from 'react';

const METRICS = [
  { label: 'Registered Users', value: '12',  change: '3 joined this week', up: true,  icon: '👥' },
  { label: 'Total Quizzes',    value: '5',   change: '5 subjects available', up: true, icon: '📝' },
  { label: 'Total Attempts',   value: '38',  change: 'since launch',        up: true,  icon: '🎯' },
  { label: 'Avg. Score',       value: '58%', change: 'across all subjects', up: true,  icon: '📊' },
];

const QUIZZES = [
  { name: 'Computer Organization & Architecture', subject: 'COA', questions: 5, attempts: 10, status: 'active' },
  { name: 'Computer Networks',                    subject: 'CN',  questions: 5, attempts: 9,  status: 'active' },
  { name: 'Advanced Web Technologies',            subject: 'AWT', questions: 5, attempts: 8,  status: 'active' },
  { name: 'Discrete Mathematics',                 subject: 'DM',  questions: 5, attempts: 6,  status: 'active' },
  { name: 'Operating Systems',                    subject: 'OS',  questions: 5, attempts: 5,  status: 'active' },
];

const DOT_COLORS = ['#2c3e7a', '#27ae60', '#e67e22', '#8e44ad', '#c0392b'];

const NAV = [
  { icon: '📊', label: 'Overview', key: 'overview' },
  { icon: '📝', label: 'Quizzes',  key: 'quizzes'  },
  { icon: '⚙️', label: 'Settings', key: 'settings' },
];

function AdminDashboard() {
  const [tab, setTab] = useState('overview');
  const name = localStorage.getItem('name') || 'Admin';

  // Settings state
  const [appName, setAppName]       = useState('EduQuiz');
  const [savedName, setSavedName]   = useState('EduQuiz');
  const [timeLimit, setTimeLimit]   = useState('30');
  const [savedTime, setSavedTime]   = useState('30');
  const [maxQuestions, setMaxQ]     = useState('5');
  const [savedMaxQ, setSavedMaxQ]   = useState('5');
  const [settingMsg, setSettingMsg] = useState('');

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    setSavedName(appName);
    setSettingMsg('General settings saved successfully!');
    setTimeout(() => setSettingMsg(''), 3000);
  };

  const handleSaveQuiz = (e) => {
    e.preventDefault();
    setSavedTime(timeLimit);
    setSavedMaxQ(maxQuestions);
    setSettingMsg('Quiz settings saved successfully!');
    setTimeout(() => setSettingMsg(''), 3000);
  };

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div style={{ padding: '4px 8px 14px', borderBottom: '1px solid #eee', marginBottom: 8 }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1a1a2e' }}>EduQuiz</div>
          <div style={{ fontSize: '0.75rem', color: '#aaa' }}>Admin Panel</div>
        </div>
        <div className="sidebar-label">Menu</div>
        {NAV.map(item => (
          <button
            key={item.key}
            className={`sidebar-btn ${tab === item.key ? 'active' : ''}`}
            onClick={() => { setTab(item.key); setSettingMsg(''); }}
          >
            <span>{item.icon}</span> {item.label}
          </button>
        ))}
        <div className="sidebar-label">Account</div>
        <div className="sidebar-btn" style={{ cursor: 'default' }}>
          <span>👤</span> {name}
        </div>
        <button
          className="sidebar-btn"
          onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
        >
          <span>🚪</span> Logout
        </button>
      </aside>

      <main className="admin-content">

        {/* ── OVERVIEW ── */}
        {tab === 'overview' && (
          <>
            <div className="topbar-row">
              <div>
                <div className="page-title">Overview</div>
                <div className="page-subtitle">
                  {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
            </div>

            <div className="metrics-grid">
              {METRICS.map((m, i) => (
                <div className="metric-card" key={i}>
                  <div className="metric-icon">{m.icon}</div>
                  <div className="metric-value">{m.value}</div>
                  <div className="metric-label">{m.label}</div>
                  <div className="metric-change up">{m.change}</div>
                </div>
              ))}
            </div>

            <div className="admin-card">
              <div className="card-title">
                Available Quizzes
                <button className="card-link" onClick={() => setTab('quizzes')}>View all</button>
              </div>
              {QUIZZES.map((q, i) => (
                <div className="list-row" key={i}>
                  <span className="list-dot" style={{ background: DOT_COLORS[i] }} />
                  <span className="list-name">{q.name}</span>
                  <span className="list-count">{q.attempts} attempts</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── QUIZZES ── */}
        {tab === 'quizzes' && (
          <>
            <div className="topbar-row">
              <div>
                <div className="page-title">Quizzes</div>
                <div className="page-subtitle">All available subject quizzes</div>
              </div>
            </div>
            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Full Name</th>
                    <th>Questions</th>
                    <th>Attempts</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {QUIZZES.map((q, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 700, color: DOT_COLORS[i] }}>{q.subject}</td>
                      <td>{q.name}</td>
                      <td>{q.questions}</td>
                      <td>{q.attempts}</td>
                      <td><span className="status-badge active">{q.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── SETTINGS ── */}
        {tab === 'settings' && (
          <>
            <div className="topbar-row">
              <div>
                <div className="page-title">Settings</div>
                <div className="page-subtitle">Manage application configuration</div>
              </div>
            </div>

            {settingMsg && (
              <div className="alert alert-success" style={{ maxWidth: 600, marginBottom: 20 }}>
                ✓ {settingMsg}
              </div>
            )}

            {/* General Settings */}
            <div className="admin-card" style={{ maxWidth: 600, marginBottom: 20 }}>
              <div className="card-title">General Settings</div>

              <form onSubmit={handleSaveGeneral}>
                <div className="form-group">
                  <label className="form-label">Application name</label>
                  <input
                    className="form-input"
                    type="text"
                    value={appName}
                    onChange={e => setAppName(e.target.value)}
                    placeholder="Enter app name"
                  />
                  <div style={{ fontSize: '0.75rem', color: '#999', marginTop: 4 }}>
                    Currently showing: <strong>{savedName}</strong>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Admin email</label>
                  <input
                    className="form-input"
                    type="email"
                    defaultValue="admin@eduquiz.com"
                    disabled
                    style={{ background: '#f5f5f5', cursor: 'not-allowed' }}
                  />
                  <div style={{ fontSize: '0.75rem', color: '#999', marginTop: 4 }}>
                    Email cannot be changed here
                  </div>
                </div>

                <button className="btn-primary" type="submit" style={{ marginTop: 8 }}>
                  Save General Settings
                </button>
              </form>
            </div>

            {/* Quiz Settings */}
            <div className="admin-card" style={{ maxWidth: 600, marginBottom: 20 }}>
              <div className="card-title">Quiz Settings</div>

              <form onSubmit={handleSaveQuiz}>
                <div className="form-group">
                  <label className="form-label">Time limit per question (seconds)</label>
                  <select
                    className="form-select"
                    value={timeLimit}
                    onChange={e => setTimeLimit(e.target.value)}
                  >
                    <option value="15">15 seconds</option>
                    <option value="30">30 seconds</option>
                    <option value="45">45 seconds</option>
                    <option value="60">60 seconds</option>
                  </select>
                  <div style={{ fontSize: '0.75rem', color: '#999', marginTop: 4 }}>
                    Currently set to: <strong>{savedTime} seconds</strong>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Questions per quiz</label>
                  <select
                    className="form-select"
                    value={maxQuestions}
                    onChange={e => setMaxQ(e.target.value)}
                  >
                    <option value="5">5 questions</option>
                    <option value="10">10 questions</option>
                    <option value="15">15 questions</option>
                  </select>
                  <div style={{ fontSize: '0.75rem', color: '#999', marginTop: 4 }}>
                    Currently set to: <strong>{savedMaxQ} questions</strong>
                  </div>
                </div>

                <button className="btn-primary" type="submit" style={{ marginTop: 8 }}>
                  Save Quiz Settings
                </button>
              </form>
            </div>

            {/* Account Settings */}
            <div className="admin-card" style={{ maxWidth: 600 }}>
              <div className="card-title">Account</div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid #f2f2f2', marginBottom: 16 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: '#eef0fb', color: '#2c3e7a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.1rem' }}>
                  {name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1a1a2e' }}>{name}</div>
                  <div style={{ fontSize: '0.78rem', color: '#999' }}>Administrator</div>
                </div>
              </div>

              <button
                className="btn-secondary"
                style={{ width: '100%' }}
                onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
              >
                Logout from all devices
              </button>
            </div>
          </>
        )}

      </main>
    </div>
  );
}

export default AdminDashboard;