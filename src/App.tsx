import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { FiSearch, FiSun, FiMoon } from 'react-icons/fi';
import './App.css';
import Navbar from './Navbar';
import SoldierPage from './SoldierPage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import type { ReactNode, ReactElement } from 'react';
import type { Soldier } from './SoldierPage';

// Mock soldier data
const soldiers = [
  {
    id: '1001',
    fullName: 'أحمد محمد علي إبراهيم حسن',
    birthDate: '1998-05-12',
    enlistDate: '2018-07-01',
    reserveDate: '2020-07-01',
    education: 'بكالوريوس هندسة',
    tripleNumber: '123456',
    nationalId: '29805121234567',
    hasrNumber: '789654',
    moves: [
      { id: 'm1', from: 'مستجدين', to: 'س1', date: '2018-08-01', type: 'داخلي' as 'داخلي' },
      { id: 'm2', from: 'س1', to: 'س3', date: '2018-12-15', type: 'داخلي' as 'داخلي' },
      { id: 'm3', from: 'س3', to: 'قوات خاصة', date: '2019-05-10', type: 'داخلي' as 'داخلي' },
      { id: 'm4', from: 'قوات خاصة', to: 'هدف البترول', date: '2019-10-01', type: 'داخلي' as 'داخلي' },
      { id: 'm5', from: 'هدف البترول', to: 'خارج الإدارة', date: '2020-03-01', type: 'خارجي' as 'خارجي' }
    ],
    promotions: [
      { id: 'p1', fromRank: 'جندي', toRank: 'عريف', date: '2019-01-01', courseNumber: '101' },
      { id: 'p2', fromRank: 'عريف', toRank: 'رقيب', date: '2020-01-01', courseNumber: '102' }
    ],
    contact: {
      phones: [
        { label: 'رقم الجندي', value: '01000000001' },
        { label: 'رقم الأب', value: '01000000002' },
        { label: 'رقم الأم', value: '01000000003' }
      ],
      address: {
        street: 'شارع التحرير',
        district: 'مركز القاهرة',
        governorate: 'القاهرة'
      }
    },
    medicalRecords: [
      {
        hospitalName: 'مستشفى القاهرة',
        clinicType: 'عيادة باطنة',
        visitDate: '2023-01-10',
        representativeName: 'د/ أحمد علي',
        decision: 'إجازة مرضية 3 أيام'
      },
      {
        hospitalName: 'مستشفى التحرير',
        clinicType: 'عيادة عظام',
        visitDate: '2023-03-15',
        representativeName: '',
        decision: 'علاج ومتابعة'
      }
    ],
    weaponTraining: [
      {
        weaponName: 'بندقية آلية',
        trainingType: 'تدريب عملي',
        trainingDate: '2023-06-01',
        result: 'ناجح',
        trainerName: 'م. أحمد فوزي'
      },
      {
        weaponName: 'مسدس',
        trainingType: 'تدريب نظري',
        trainingDate: '2023-06-10',
        result: 'جيد جداً',
        trainerName: 'م. سامي علي'
      }
    ],
    leaves: [
      {
        type: 'شهريه' as 'شهريه',
        team: 'الأول' as 'الأول',
        periodStart: '2023-01-01',
        periodEnd: '2023-01-10',
        notes: 'إجازة الطقم الأول'
      },
      {
        type: 'فرديه' as 'فرديه',
        startDate: '2023-02-15',
        durationHours: 48,
        reason: 'ظروف عائلية',
        notes: 'إجازة فردية 48 ساعة'
      },
      {
        type: 'يوميه' as 'يوميه',
        date: '2023-03-10',
        overnight: true,
        returnTime: '11:00',
        notes: 'فسحة مع مبيت'
      }
    ]
  },
  {
    id: '1002',
    fullName: 'محمود عبد الله حسن عبد الرحمن',
    birthDate: '1997-11-23',
    enlistDate: '2017-10-15',
    reserveDate: '2019-10-15',
    education: 'ليسانس حقوق',
    tripleNumber: '654321',
    nationalId: '29711231234567',
    hasrNumber: '456123',
    moves: [
      { id: 'm1', from: 'مستجدين', to: 'س2', date: '2017-11-01', type: 'داخلي' as 'داخلي' },
      { id: 'm2', from: 'س2', to: 'المشروعات الإنتاجية', date: '2018-05-10', type: 'داخلي' as 'داخلي' },
      { id: 'm3', from: 'المشروعات الإنتاجية', to: 'س4', date: '2018-10-20', type: 'داخلي' as 'داخلي' },
      { id: 'm4', from: 'س4', to: 'خارج الإدارة', date: '2019-01-01', type: 'خارجي' as 'خارجي' }
    ],
    promotions: [
      { id: 'p1', fromRank: 'جندي', toRank: 'عريف', date: '2018-01-01', courseNumber: '201' },
      { id: 'p2', fromRank: 'عريف', toRank: 'رقيب', date: '2019-01-01', courseNumber: '202' }
    ],
    contact: {
      phones: [
        { label: 'رقم الجندي', value: '01000000004' },
        { label: 'رقم الأب', value: '01000000005' },
        { label: 'رقم الأم', value: '01000000006' }
      ],
      address: {
        street: 'شارع النصر',
        district: 'مركز الجيزة',
        governorate: 'الجيزة'
      }
    },
    medicalRecords: [
      {
        hospitalName: 'مستشفى الجيزة',
        clinicType: 'عيادة جلدية',
        visitDate: '2023-02-20',
        representativeName: 'د/ سامي يوسف',
        decision: 'علاج موضعي'
      }
    ],
    weaponTraining: [
      {
        weaponName: 'رشاش',
        trainingType: 'تدريب عملي',
        trainingDate: '2023-07-01',
        result: 'ممتاز',
        trainerName: 'م. خالد حسن'
      }
    ],
    leaves: [
      {
        type: 'شهريه' as 'شهريه',
        team: 'الثاني' as 'الثاني',
        periodStart: '2023-01-11',
        periodEnd: '2023-01-20',
        notes: 'إجازة الطقم الثاني'
      },
      {
        type: 'فرديه' as 'فرديه',
        startDate: '2023-03-01',
        durationHours: 24,
        reason: 'زيارة عائلية',
        notes: 'إجازة فردية 24 ساعة'
      },
      {
        type: 'يوميه' as 'يوميه',
        date: '2023-03-15',
        overnight: false,
        returnTime: '20:00',
        notes: 'فسحة بدون مبيت'
      }
    ]
  },
  {
    id: '1003',
    fullName: 'يوسف إبراهيم محمد عبد الفتاح',
    birthDate: '1999-03-30',
    enlistDate: '2019-09-10',
    reserveDate: '2021-09-10',
    education: 'دبلوم صنايع',
    tripleNumber: '789123',
    nationalId: '29903301234567',
    hasrNumber: '321789',
    moves: [
      { id: 'm1', from: 'مستجدين', to: 'س8 خارجي', date: '2019-10-01', type: 'داخلي' as 'داخلي' },
      { id: 'm2', from: 'س8 خارجي', to: 'هدف دهتوره', date: '2020-02-20', type: 'داخلي' as 'داخلي' },
      { id: 'm3', from: 'هدف دهتوره', to: 'س2', date: '2020-09-10', type: 'داخلي' as 'داخلي' },
      { id: 'm4', from: 'س2', to: 'خارج الإدارة', date: '2021-03-01', type: 'خارجي' as 'خارجي' }
    ],
    promotions: [
      { id: 'p1', fromRank: 'جندي', toRank: 'عريف', date: '2020-01-01', courseNumber: '301' }
    ],
    contact: {
      phones: [
        { label: 'رقم الجندي', value: '01000000007' },
        { label: 'رقم الأب', value: '01000000008' },
        { label: 'رقم الأم', value: '01000000009' }
      ],
      address: {
        street: 'شارع الثورة',
        district: 'مركز المنصورة',
        governorate: 'الدقهلية'
      }
    },
    medicalRecords: [
      {
        hospitalName: 'مستشفى المنصورة',
        clinicType: 'عيادة عيون',
        visitDate: '2023-04-05',
        representativeName: 'د/ فاطمة علي',
        decision: 'نظارة طبية'
      }
    ],
    weaponTraining: [
      {
        weaponName: 'بندقية قنص',
        trainingType: 'تدريب عملي',
        trainingDate: '2023-08-01',
        result: 'جيد',
        trainerName: 'م. ياسر عبد الله'
      }
    ],
    leaves: [
      {
        type: 'شهريه' as 'شهريه',
        team: 'الثالث' as 'الثالث',
        periodStart: '2023-01-21',
        periodEnd: '2023-01-30',
        notes: 'إجازة الطقم الثالث'
      },
      {
        type: 'فرديه' as 'فرديه',
        startDate: '2023-04-10',
        durationHours: 72,
        reason: 'زواج أخ',
        notes: 'إجازة فردية 72 ساعة'
      },
      {
        type: 'يوميه' as 'يوميه',
        date: '2023-04-20',
        overnight: false,
        returnTime: '19:00',
        notes: 'فسحة يومية'
      }
    ]
  },
  {
    id: '1004',
    fullName: 'سعيد محمد عبد العزيز مصطفى',
    birthDate: '1996-07-18',
    enlistDate: '2016-10-01',
    reserveDate: '2018-10-01',
    education: 'بكالوريوس تجارة',
    tripleNumber: '321654',
    nationalId: '29607181234567',
    hasrNumber: '987321',
    moves: [
      { id: 'm1', from: 'مستجدين', to: 'س5', date: '2016-11-01', type: 'داخلي' as 'داخلي' },
      { id: 'm2', from: 'س5', to: 'س6', date: '2017-03-15', type: 'داخلي' as 'داخلي' },
      { id: 'm3', from: 'س6', to: 'خارج الإدارة', date: '2018-01-10', type: 'خارجي' as 'خارجي' }
    ],
    promotions: [
      { id: 'p1', fromRank: 'جندي', toRank: 'عريف', date: '2017-01-01', courseNumber: '401' },
      { id: 'p2', fromRank: 'عريف', toRank: 'رقيب', date: '2018-01-01', courseNumber: '402' }
    ],
    contact: {
      phones: [
        { label: 'رقم الجندي', value: '01000000010' },
        { label: 'رقم الأب', value: '01000000011' },
        { label: 'رقم الأم', value: '01000000012' }
      ],
      address: {
        street: 'شارع الجيش',
        district: 'مركز طنطا',
        governorate: 'الغربية'
      }
    },
    medicalRecords: [
      {
        hospitalName: 'مستشفى طنطا',
        clinicType: 'عيادة أنف وأذن',
        visitDate: '2023-06-12',
        representativeName: 'د/ ياسر عبد الله',
        decision: 'عملية جراحية'
      }
    ],
    weaponTraining: [
      {
        weaponName: 'مدفع رشاش',
        trainingType: 'تدريب نظري',
        trainingDate: '2023-09-01',
        result: 'مقبول',
        trainerName: 'م. محمود عبد العزيز'
      }
    ],
    leaves: [
      {
        type: 'شهريه' as 'شهريه',
        team: 'الأول' as 'الأول',
        periodStart: '2023-02-01',
        periodEnd: '2023-02-10',
        notes: 'إجازة الطقم الأول لشهر فبراير'
      },
      {
        type: 'فرديه' as 'فرديه',
        startDate: '2023-05-05',
        durationHours: 96,
        reason: 'ظروف صحية',
        notes: 'إجازة فردية 4 أيام'
      },
      {
        type: 'يوميه' as 'يوميه',
        date: '2023-05-15',
        overnight: true,
        returnTime: '10:00',
        notes: 'فسحة مع مبيت'
      }
    ]
  }
];

function Home() {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<Soldier[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('recentSearches') || '[]');
  });
  const navigate = useNavigate();

  const commonSuggestions = [
    'أحمد محمد',
    'سعيد محمد',
    'بكالوريوس هندسة',
    'س1',
    'قوات خاصة',
    'هدف البترول',
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = search.trim();
    if (!query) return;
    const normalizedQuery = query.replace(/\s+/g, '').toLowerCase();
    const found = soldiers.find(s =>
      s.id.replace(/\s+/g, '').toLowerCase() === normalizedQuery ||
      s.fullName.replace(/\s+/g, '').toLowerCase() === normalizedQuery
    );
    if (found) {
      // Add to recent searches
      const updatedRecent = [query, ...recentSearches.filter(item => item !== query)].slice(0, 6);
      setRecentSearches(updatedRecent);
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
      navigate(`/soldier/${found.id}`);
    } else {
      alert('لا يوجد جندي بهذا الاسم أو الرقم العسكري');
    }
  };

  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const normalized = search.replace(/\s+/g, '').toLowerCase();
    const filtered = soldiers.filter(s =>
      s.id.replace(/\s+/g, '').toLowerCase().includes(normalized) ||
      s.fullName.replace(/\s+/g, '').toLowerCase().includes(normalized)
    );
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [search]);

  const handleSuggestionClick = (soldierId: string, name?: string) => {
    if (name) {
      const updatedRecent = [name, ...recentSearches.filter(item => item !== name)].slice(0, 6);
      setRecentSearches(updatedRecent);
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
    }
    setSearch('');
    setSuggestions([]);
    setShowSuggestions(false);
    navigate(`/soldier/${soldierId}`);
  };

  const handleRecentClick = (query: string) => {
    setSearch(query);
  };

  const handleCommonSuggestionClick = (query: string) => {
    setSearch(query);
  };

  return (
    <main className="App-main">
      <div className="search-section" style={{ position: 'relative', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h1 style={{ fontFamily: 'Cairo, Tajawal, Arial', fontWeight: 900, fontSize: '2.2rem', color: 'var(--primary)', marginBottom: 8, letterSpacing: 1 }}>
            نظام البحث عن الجنود
          </h1>
          <div style={{ fontSize: '1.1rem', color: '#888', marginBottom: 10 }}>
            ابحث عن بيانات الجندي بالاسم أو الرقم العسكري أو المؤهل الدراسي
          </div>
          <div style={{ fontSize: '1.05rem', color: '#4caf50', fontWeight: 600, marginBottom: 10 }}>
            "الوطنية شرف... وخدمة الوطن أمانة"
          </div>
        </div>
        <div className="search-bar-dropdown-wrapper" style={{position: 'relative', width: '100%', maxWidth: 420, margin: '0 auto'}}>
          <form className="search-bar-wrapper" onSubmit={handleSearch} autoComplete="off">
            <input
              type="text"
              className="search-bar"
              placeholder="ابحث باسم الجندي أو الرقم العسكري..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => setShowSuggestions(suggestions.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              aria-autocomplete="list"
              aria-controls="search-suggestions"
              style={{ fontFamily: 'Cairo, Tahoma, Arial' }}
            />
            <button className="search-btn" aria-label="بحث" type="submit">
              {FiSearch({})}
            </button>
          </form>
          {showSuggestions && (
            <ul id="search-suggestions" className="search-suggestions-list" style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'var(--card-bg)',
              width: '100%',
              zIndex: 1000,
              borderRadius: 14,
              boxShadow: '0 4px 24px rgba(0,0,0,0.13)',
              marginTop: 4,
              padding: 0,
              listStyle: 'none',
              maxHeight: 260,
              overflowY: 'auto',
              direction: 'rtl',
              border: '1.5px solid var(--primary-light)',
              animation: 'fadeIn 0.18s',
              transition: 'box-shadow 0.18s',
            }}>
              {suggestions.map((s, idx) => {
                const normalized = search.replace(/\s+/g, '').toLowerCase();
                const name = s.fullName;
                const id = s.id;
                const nameIndex = name.replace(/\s+/g, '').toLowerCase().indexOf(normalized);
                const idIndex = id.replace(/\s+/g, '').toLowerCase().indexOf(normalized);
                let nameDisplay: React.ReactNode = name;
                let idDisplay: React.ReactNode = id;
                if (nameIndex !== -1 && normalized) {
                  const start = nameIndex;
                  const end = nameIndex + normalized.length;
                  nameDisplay = <>{name.slice(0, start)}<span style={{background:'#ffe066',color:'#222',borderRadius:3, padding:'0 2px'}}>{name.slice(start, end)}</span>{name.slice(end)}</>;
                }
                if (idIndex !== -1 && normalized) {
                  const start = idIndex;
                  const end = idIndex + normalized.length;
                  idDisplay = <>{id.slice(0, start)}<span style={{background:'#ffe066',color:'#222',borderRadius:3, padding:'0 2px'}}>{id.slice(start, end)}</span>{id.slice(end)}</>;
                }
                return (
                  <li
                    key={s.id}
                    style={{
                      padding: '13px 22px',
                      cursor: 'pointer',
                      borderBottom: idx === suggestions.length - 1 ? 'none' : '1px solid var(--input-border)',
                      fontSize: '1.13rem',
                      color: 'var(--primary-dark)',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      background: idx === 0 ? 'var(--primary-light)' : 'transparent',
                      borderTopLeftRadius: idx === 0 ? 14 : 0,
                      borderTopRightRadius: idx === 0 ? 14 : 0,
                      borderBottomLeftRadius: idx === suggestions.length - 1 ? 14 : 0,
                      borderBottomRightRadius: idx === suggestions.length - 1 ? 14 : 0,
                      transition: 'background 0.13s',
                      gap: 16
                    }}
                    onMouseDown={() => handleSuggestionClick(s.id, s.fullName)}
                    tabIndex={0}
                    aria-label={`اذهب إلى صفحة الجندي ${s.fullName}`}
                    onMouseEnter={e => e.currentTarget.style.background = '#ffe066'}
                    onMouseLeave={e => e.currentTarget.style.background = idx === 0 ? 'var(--primary-light)' : 'transparent'}
                  >
                    <span style={{marginLeft: 10, fontSize: '1.5em', color: '#4caf50'}}>{FiSearch({})}</span>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flex: 1}}>
                      <span style={{ fontWeight: 800, fontSize: '1.08em', letterSpacing: 0.2 }}>{nameDisplay}</span>
                      <span style={{ color: '#888', fontSize: '0.99em', marginRight: 8, fontWeight: 500 }}>{idDisplay}</span>
                      <span style={{ color: '#aaa', fontSize: '0.95em', marginRight: 8 }}>{s.education} | {s.birthDate}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {!search && (
          <div className="common-suggestions" style={{ margin: '18px 0 0 0', width: '100%' }}>
            <div style={{ color: '#888', fontWeight: 600, marginBottom: 8, fontSize: '1.08rem' }}>اقتراحات البحث السريع:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
              {commonSuggestions.map((s, i) => (
                <span
                  key={i}
                  style={{ background: '#f3f3f3', color: '#222', borderRadius: 16, padding: '7px 18px', fontSize: '1.01rem', cursor: 'pointer', border: '1px solid #e0e0e0', transition: 'background 0.13s' }}
                  onClick={() => handleCommonSuggestionClick(s)}
                  tabIndex={0}
                  aria-label={`بحث عن ${s}`}
                  onMouseEnter={e => e.currentTarget.style.background = '#ffe066'}
                  onMouseLeave={e => e.currentTarget.style.background = '#f3f3f3'}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="recent-searches" style={{ marginTop: 24, width: '100%' }}>
          <h2 style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: 14, fontWeight: 700, letterSpacing: 0.5 }}>عمليات البحث الأخيرة</h2>
          <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 10, listStyle: 'none', padding: 0, margin: 0, justifyContent: 'center' }}>
            {recentSearches.length === 0 ? (
              <li style={{ color: '#aaa', fontSize: '1rem', padding: '8px 18px' }}>لا يوجد عمليات بحث حديثة</li>
            ) : (
              recentSearches.map((item, idx) => (
                <li
                  key={idx}
                  style={{ background: 'var(--recent-pill-bg)', color: 'var(--text)', borderRadius: 20, padding: '8px 18px', fontSize: '1rem', boxShadow: 'var(--shadow)', border: '1px solid var(--recent-pill-border)', cursor: 'pointer', transition: 'background 0.13s' }}
                  onClick={() => handleRecentClick(item)}
                  tabIndex={0}
                  aria-label={`بحث عن ${item}`}
                  onMouseEnter={e => e.currentTarget.style.background = '#ffe066'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--recent-pill-bg)'}
                >
                  {item}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}

function PrivateRoute({ children }: { children: ReactElement }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
}

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <div className="App">
        <Navbar onToggleTheme={toggleTheme} theme={theme} />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/soldier/:id" element={<PrivateRoute><SoldierPage soldiers={soldiers} /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

<style>{`
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .search-suggestions-list::-webkit-scrollbar {
    width: 7px;
    background: #f3f3f3;
    border-radius: 8px;
  }
  .search-suggestions-list::-webkit-scrollbar-thumb {
    background: #e0e0e0;
    border-radius: 8px;
  }
`}</style>
