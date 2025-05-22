import React, { useState, useRef, useEffect } from 'react';
import logo from './logo.png';
import './Navbar.css';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onToggleTheme: () => void;
  theme: string;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleTheme, theme }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const username = localStorage.getItem('username') || '';
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    navigate('/signin');
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-logo" tabIndex={0} aria-label="الصفحة الرئيسية" onClick={() => navigate('/')} style={{ minWidth: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
        <img src={logo} alt="Logo" />
        <span className="navbar-title" style={{ whiteSpace: 'normal', overflow: 'visible', textOverflow: 'unset' }}>{'إدارة قوات أمن الغربية'}</span>
      </div>
      <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 1 }}>
        {/* User menu */}
        {isAuthenticated && (
          <div className="user-menu-wrapper" ref={menuRef} style={{ position: 'relative' }}>
            <button className="user-menu-btn" onClick={() => setMenuOpen(v => !v)} aria-haspopup="true" aria-expanded={menuOpen ? "true" : "false"} aria-label="قائمة المستخدم">
              <span className="user-menu-name" style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--primary-dark)' }}>{username}</span>
              <svg style={{ marginRight: 4, verticalAlign: 'middle' }} width="16" height="16" viewBox="0 0 20 20"><path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
            </button>
            {menuOpen && (
              <div className="user-menu-dropdown" style={{ position: 'absolute', left: 0, top: '110%', minWidth: 150, background: 'var(--card-bg)', boxShadow: '0 2px 12px rgba(0,0,0,0.10)', borderRadius: 8, zIndex: 1001, padding: '8px 0', textAlign: 'right' }}>
                <button className="user-menu-item" onClick={onToggleTheme} style={{ width: '100%', background: 'none', border: 'none', padding: '10px 18px', textAlign: 'right', color: 'var(--text)', fontWeight: 500, fontSize: '1rem', cursor: 'pointer' }}>
                  {theme === 'light' ? 'تفعيل الوضع الليلي' : 'تفعيل الوضع النهاري'}
                </button>
                <button className="user-menu-item" onClick={handleLogout} style={{ width: '100%', background: 'none', border: 'none', padding: '10px 18px', textAlign: 'right', color: '#ef4444', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>
                  تسجيل الخروج
                </button>
                <div className="user-menu-item" style={{ width: '100%', padding: '10px 18px', color: '#a3a3a3', fontSize: '0.95rem', cursor: 'not-allowed' }}>
                  خيارات أخرى قريباً
                </div>
              </div>
            )}
          </div>
        )}
        {/* Theme button for unauthenticated users */}
        {!isAuthenticated && (
          <button className="theme-toggle-btn" onClick={onToggleTheme} aria-label="تبديل الوضع الليلي/النهاري">
            {theme === 'light' ? FiMoon({}) : FiSun({})}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;