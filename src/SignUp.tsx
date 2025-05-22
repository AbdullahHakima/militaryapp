import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const passwordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

const SignUp: React.FC = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (!validateEmail(email)) {
        setError('يرجى إدخال بريد إلكتروني صحيح');
        setLoading(false);
        return;
      }
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find((u: any) => u.username === username)) {
        setError('اسم المستخدم مستخدم بالفعل');
      } else if (users.find((u: any) => u.email === email)) {
        setError('البريد الإلكتروني مستخدم بالفعل');
      } else {
        setStep(2);
      }
      setLoading(false);
    }, 800);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (password !== confirmPassword) {
        setError('كلمتا المرور غير متطابقتين');
        setLoading(false);
        return;
      }
      if (passwordStrength(password) < 3) {
        setError('كلمة المرور ضعيفة. يرجى تحقيق جميع المتطلبات.');
        setLoading(false);
        return;
      }
      if (!agree) {
        setError('يجب الموافقة على الشروط وسياسة الخصوصية');
        setLoading(false);
        return;
      }
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push({ username, email, password });
      localStorage.setItem('users', JSON.stringify(users));
      setSuccess(true);
      setTimeout(() => navigate('/signin'), 1500);
      setLoading(false);
    }, 800);
  };

  const requirements = [
    { label: '٨ أحرف أو أكثر', valid: password.length >= 8 },
    { label: 'حرف كبير واحد على الأقل', valid: /[A-Z]/.test(password) },
    { label: 'رقم واحد على الأقل', valid: /[0-9]/.test(password) },
    { label: 'رمز خاص واحد على الأقل', valid: /[^A-Za-z0-9]/.test(password) },
  ];

  const strength = passwordStrength(password);
  const strengthLabels = ['ضعيفة', 'متوسطة', 'جيدة', 'قوية'];
  const strengthColors = ['#ef4444', '#f59e42', '#facc15', '#22c55e'];

  return (
    <div className="signin-concept-bg">
      <main className="signin-concept-center">
        <div className="signin-concept-card">
          <h2 className="signin-concept-title">إنشاء حساب جديد</h2>
          {success ? (
            <div style={{ textAlign: 'center', color: '#22c55e', fontWeight: 700, fontSize: '1.1rem', margin: '32px 0' }}>
              تم إنشاء الحساب بنجاح!<br />سيتم تحويلك لتسجيل الدخول...
            </div>
          ) : step === 1 ? (
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
              <label className="signin-concept-label">البريد الإلكتروني</label>
              <input
                className="signin-concept-input"
                type="email"
                placeholder="ادخل بريدك الإلكتروني"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
              <button className="signin-concept-btn" type="submit" disabled={loading || !username || !email}>{loading ? '...جاري التحقق' : 'متابعة'}</button>
              {error && <div className="signin-concept-error">{error}</div>}
            </form>
          ) : (
            <form className="signin-concept-form" onSubmit={handlePasswordSubmit}>
              <label className="signin-concept-label">اسم المستخدم</label>
              <input
                className="signin-concept-input"
                type="text"
                value={username}
                disabled
                style={{ background: '#f3f4f6', color: '#a3a3a3', cursor: 'not-allowed' }}
                title="اسم المستخدم"
                placeholder="اسم المستخدم"
              />
              <label className="signin-concept-label">كلمة المرور</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="signin-concept-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="ادخل كلمة المرور"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoFocus
                  autoComplete="new-password"
                />
                <button type="button" onClick={() => setShowPassword(v => !v)} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontSize: 18 }} aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}>
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 10C2 10 5 4 10 4C15 4 18 10 18 10C18 10 15 16 10 16C5 16 2 10 2 10Z" stroke="#6366f1" strokeWidth="1.5"/><circle cx="10" cy="10" r="3" stroke="#6366f1" strokeWidth="1.5"/></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 10C2 10 5 4 10 4C15 4 18 10 18 10C18 10 15 16 10 16C5 16 2 10 2 10Z" stroke="#6366f1" strokeWidth="1.5"/><circle cx="10" cy="10" r="3" stroke="#6366f1" strokeWidth="1.5"/><line x1="4" y1="4" x2="16" y2="16" stroke="#6366f1" strokeWidth="1.5"/></svg>
                  )}
                </button>
              </div>
              <div style={{ margin: '4px 0 8px 0' }}>
                <div style={{ height: 6, borderRadius: 4, background: '#e5e7eb', overflow: 'hidden', marginBottom: 4 }}>
                  <div style={{ width: `${(strength / 4) * 100}%`, height: '100%', background: strengthColors[strength - 1] || '#ef4444', transition: 'width 0.3s' }}></div>
                </div>
                <div style={{ fontSize: 13, color: strengthColors[strength - 1] || '#ef4444', fontWeight: 600 }}>{password ? strengthLabels[strength - 1] : 'ضعيفة'}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '6px 0 0 0', fontSize: 13, color: '#a3a3a3' }}>
                  {requirements.map((req, i) => (
                    <li key={i} style={{ color: req.valid ? '#22c55e' : '#a3a3a3', fontWeight: req.valid ? 700 : 400 }}>• {req.label}</li>
                  ))}
                </ul>
              </div>
              <label className="signin-concept-label">تأكيد كلمة المرور</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="signin-concept-input"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="اعد كتابة كلمة المرور"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button type="button" onClick={() => setShowConfirmPassword(v => !v)} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontSize: 18 }} aria-label={showConfirmPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}>
                  {showConfirmPassword ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 10C2 10 5 4 10 4C15 4 18 10 18 10C18 10 15 16 10 16C5 16 2 10 2 10Z" stroke="#6366f1" strokeWidth="1.5"/><circle cx="10" cy="10" r="3" stroke="#6366f1" strokeWidth="1.5"/></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 10C2 10 5 4 10 4C15 4 18 10 18 10C18 10 15 16 10 16C5 16 2 10 2 10Z" stroke="#6366f1" strokeWidth="1.5"/><circle cx="10" cy="10" r="3" stroke="#6366f1" strokeWidth="1.5"/><line x1="4" y1="4" x2="16" y2="16" stroke="#6366f1" strokeWidth="1.5"/></svg>
                  )}
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0 0 0', gap: 8 }}>
                <input type="checkbox" id="terms" checked={agree} onChange={e => setAgree(e.target.checked)} style={{ accentColor: '#6366f1', width: 16, height: 16 }} />
                <label htmlFor="terms" style={{ fontSize: 13, color: '#a3a3a3', cursor: 'pointer' }}>أوافق على <button type="button" style={{ background: 'none', border: 'none', color: '#6366f1', textDecoration: 'underline', padding: 0, cursor: 'pointer' }}>الشروط وسياسة الخصوصية</button></label>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <button type="button" className="signin-concept-btn" style={{ background: '#a3a3a3', color: '#fff', minWidth: 90 }} onClick={() => { setStep(1); setError(''); }}>
                  رجوع
                </button>
                <button className="signin-concept-btn" type="submit" disabled={loading || !password || !confirmPassword}>{loading ? '...جاري التسجيل' : 'تسجيل'}</button>
              </div>
              {error && <div className="signin-concept-error">{error}</div>}
            </form>
          )}
          <div className="signin-concept-divider"><span>أو</span></div>
          <div className="signin-concept-socials">
            <button className="signin-concept-social google" type="button">
              <span className="icon"><svg width="18" height="18" viewBox="0 0 20 20"><g><path d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.5a4.7 4.7 0 01-2.04 3.08v2.56h3.3c1.93-1.78 3.04-4.4 3.04-7.43z" fill="#4285F4"/><path d="M10 20c2.7 0 4.97-.9 6.63-2.44l-3.3-2.56c-.92.62-2.1.99-3.33.99-2.56 0-4.73-1.73-5.5-4.07H1.1v2.6A10 10 0 0010 20z" fill="#34A853"/><path d="M4.5 12.92A5.98 5.98 0 013.67 10c0-.99.18-1.95.5-2.92V4.48H1.1A10 10 0 000 10c0 1.64.4 3.19 1.1 4.52l3.4-2.6z" fill="#FBBC05"/><path d="M10 3.96c1.47 0 2.8.51 3.84 1.5l2.88-2.88C14.97.9 12.7 0 10 0A10 10 0 001.1 4.48l3.4 2.6C5.27 5.69 7.44 3.96 10 3.96z" fill="#EA4335"/></g></svg></span>
              <span>التسجيل عبر Google</span>
            </button>
          </div>
          <div className="signin-concept-footer">
            <span>لديك حساب؟ </span>
            <button className="signin-concept-link" onClick={() => navigate('/signin')}>تسجيل الدخول</button>
          </div>
        </div>
        <footer className="signin-concept-terms">
          <a href="#" tabIndex={-1}>الشروط وسياسة الخصوصية</a>
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

export default SignUp;