import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_USER = { username: 'admin', password: '1234' };

const SignIn: React.FC = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (username === MOCK_USER.username) {
        setStep(2);
      } else {
        setError('اسم المستخدم غير صحيح');
      }
      setLoading(false);
    }, 800);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (password === MOCK_USER.password) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', username);
        navigate('/');
      } else {
        setError('كلمة المرور غير صحيحة');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="signin-concept-bg">
      <main className="signin-concept-center">
        <div className="signin-concept-card">
          <h2 className="signin-concept-title">تسجيل الدخول</h2>
          {step === 1 && (
            <form className="signin-concept-form" onSubmit={handleUsernameSubmit}>
              <label className="signin-concept-label">اسم المستخدم</label>
              <input
                className="signin-concept-input"
                type="text"
                placeholder="ادخل اسم المستخدم"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoFocus
                autoComplete="username"
              />
              <button className="signin-concept-btn" type="submit" disabled={loading || !username}>{loading ? '...جاري التحقق' : 'متابعة'}</button>
              {error && <div className="signin-concept-error">{error}</div>}
            </form>
          )}
          {step === 2 && (
            <form className="signin-concept-form" onSubmit={handlePasswordSubmit}>
              <label className="signin-concept-label" htmlFor="username">اسم المستخدم</label>
              <input
                className="signin-concept-input"
                type="text"
                id="username"
                value={username}
                disabled
                style={{ background: '#f3f4f6', color: '#a3a3a3', cursor: 'not-allowed' }}
              />
              <label className="signin-concept-label">كلمة المرور</label>
              <input
                className="signin-concept-input"
                type="password"
                placeholder="ادخل كلمة المرور"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoFocus
                autoComplete="current-password"
              />
              <button className="signin-concept-btn" type="submit" disabled={loading || !password}>{loading ? '...جاري التحقق' : 'تسجيل الدخول'}</button>
              {error && <div className="signin-concept-error">{error}</div>}
            </form>
          )}
          <div className="signin-concept-divider"><span>أو</span></div>
          <div className="signin-concept-socials">
            <button className="signin-concept-social google" type="button">
              <span className="icon"><svg width="18" height="18" viewBox="0 0 20 20"><g><path d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.5a4.7 4.7 0 01-2.04 3.08v2.56h3.3c1.93-1.78 3.04-4.4 3.04-7.43z" fill="#4285F4"/><path d="M10 20c2.7 0 4.97-.9 6.63-2.44l-3.3-2.56c-.92.62-2.1.99-3.33.99-2.56 0-4.73-1.73-5.5-4.07H1.1v2.6A10 10 0 0010 20z" fill="#34A853"/><path d="M4.5 12.92A5.98 5.98 0 013.67 10c0-.99.18-1.95.5-2.92V4.48H1.1A10 10 0 000 10c0 1.64.4 3.19 1.1 4.52l3.4-2.6z" fill="#FBBC05"/><path d="M10 3.96c1.47 0 2.8.51 3.84 1.5l2.88-2.88C14.97.9 12.7 0 10 0A10 10 0 001.1 4.48l3.4 2.6C5.27 5.69 7.44 3.96 10 3.96z" fill="#EA4335"/></g></svg></span>
              <span>الدخول عبر Google</span>
            </button>
          </div>
          <div className="signin-concept-footer">
            <span>ليس لديك حساب؟ </span>
            <button className="signin-concept-link" onClick={() => navigate('/signup')}>سجل الآن</button>
          </div>
        </div>
        <footer className="signin-concept-terms">
          <button type="button" tabIndex={-1} style={{ background: 'none', border: 'none', color: '#6366f1', textDecoration: 'underline', padding: 0, cursor: 'pointer' }}>الشروط وسياسة الخصوصية</button>
        </footer>
      </main>
      <style>{`
        .signin-concept-bg {
          min-height: 100vh;
          background: var(--bg-gradient, #18181b);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .signin-concept-center {
          width: 100vw;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .signin-concept-card {
          background: var(--card-bg, #18181b);
          color: var(--text, #fff);
          border-radius: 18px;
          box-shadow: 0 4px 32px rgba(0,0,0,0.18);
          padding: 32px 28px 24px 28px;
          width: 100%;
          max-width: 370px;
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .signin-concept-title {
          color: var(--text, #fff);
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 24px;
          text-align: center;
        }
        .signin-concept-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .signin-concept-label {
          color: var(--primary-dark, #a3a3a3);
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 2px;
        }
        .signin-concept-input {
          padding: 12px;
          border-radius: 8px;
          border: 1.5px solid var(--input-border, #262626);
          background: var(--input-bg, #18181b);
          color: var(--text, #fff);
          font-size: 1rem;
          outline: none;
          margin-bottom: 4px;
          transition: border 0.2s;
        }
        .signin-concept-input:focus {
          border: 1.5px solid var(--primary, #fff);
        }
        .signin-concept-btn {
          margin-top: 8px;
          padding: 12px;
          border-radius: 8px;
          background: var(--primary, #6366f1);
          color: var(--card-bg, #fff);
          font-size: 1.1rem;
          font-weight: 600;
          border: none;
          box-shadow: 0 1px 2px rgba(0,0,0,0.04);
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        [data-theme='dark'] .signin-concept-btn {
          color: #18181b;
        }
        .signin-concept-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .signin-concept-error {
          color: #ef4444;
          background: #fef2f2;
          border-radius: 6px;
          padding: 8px 0;
          margin-top: 4px;
          text-align: center;
          font-weight: 600;
          font-size: 0.97rem;
        }
        .signin-concept-divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 18px 0 12px 0;
        }
        .signin-concept-divider span {
          flex: 1;
          border-bottom: 1px solid var(--input-border, #262626);
          margin: 0 8px;
          color: var(--primary-dark, #a3a3a3);
          font-size: 0.95rem;
        }
        .signin-concept-socials {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .signin-concept-social {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: var(--input-bg, #18181b);
          color: var(--text, #fff);
          border: 1.5px solid var(--input-border, #262626);
          border-radius: 8px;
          padding: 10px 0;
          font-size: 1.05rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, border 0.2s;
        }
        .signin-concept-social:hover {
          background: var(--recent-pill-bg, #23232a);
        }
        .signin-concept-social .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
        }
        .signin-concept-footer {
          margin-top: 8px;
          text-align: center;
          color: var(--primary-dark, #a3a3a3);
          font-size: 1rem;
        }
        .signin-concept-link {
          background: none;
          border: none;
          color: #a78bfa;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
          font-size: 1rem;
        }
        .signin-concept-terms {
          margin-top: 32px;
          text-align: center;
        }
        .signin-concept-terms a {
          color: var(--primary-dark, #a3a3a3);
          font-size: 1rem;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default SignIn;