import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export interface Soldier {
  id: string;
  fullName: string;
  birthDate: string;
  enlistDate: string;
  reserveDate: string;
  education: string;
  tripleNumber: string;
  nationalId: string;
  hasrNumber: string;
  moves?: SoldierMove[];
  promotions?: SoldierPromotion[];
  contact?: {
    phones: { label: string; value: string }[];
    address: {
      street: string;
      district: string;
      governorate: string;
    };
  };
  medicalRecords?: MedicalRecord[];
  weaponTraining?: WeaponTrainingRecord[];
  leaves?: LeaveRecord[];
}

interface SoldierMove {
  id: string;
  from: string;
  to: string;
  date: string;
  type: 'داخلي' | 'خارجي';
}

interface SoldierPromotion {
  id: string;
  fromRank: string;
  toRank: string;
  date: string;
  courseNumber: string;
}

interface MedicalRecord {
  hospitalName: string;
  clinicType: string;
  visitDate: string;
  representativeName: string;
  decision: string;
}

interface WeaponTrainingRecord {
  weaponName: string;
  trainingType: string;
  trainingDate: string;
  result: string;
  trainerName: string;
}

interface LeaveRecord {
  type: 'شهريه' | 'فرديه' | 'يوميه';
  // شهريه
  team?: 'الأول' | 'الثاني' | 'الثالث';
  periodStart?: string;
  periodEnd?: string;
  // فرديه
  startDate?: string;
  durationHours?: number; // 24, 48, 72, 96
  reason?: string;
  // يوميه/فسحة
  date?: string;
  overnight?: boolean;
  returnTime?: string;
  // مشترك/ملاحظات
  notes?: string;
}

interface SoldierPageProps {
  soldiers: Soldier[];
}

const SECTIONS = [
  { key: 'personal', label: 'البيانات الشخصية' },
  { key: 'moves', label: 'سجل التنقلات' },
  { key: 'promotions', label: 'سجل الترقيات' },
  { key: 'contact', label: 'بيانات التواصل' },
  { key: 'leaves', label: 'سجل الاجازات' },
  { key: 'medical', label: 'سجل الطبي' },
  { key: 'training', label: 'سجل تدريب السلاح' }
];

const SoldierPage: React.FC<SoldierPageProps> = ({ soldiers }) => {
  const { id } = useParams<{ id: string }>();
  const soldier = soldiers.find(s => s.id === id);
  const [activeSection, setActiveSection] = useState('personal');

  if (!soldier) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', direction: 'rtl' }}>
        <h1>الجندي غير موجود</h1>
        <p>لا يوجد جندي بالرقم: <strong>{id}</strong></p>
      </div>
    );
  }

  return (
    <div className="soldier-responsive-root" style={{ width: '100vw', minHeight: '100vh', height: '100vh', display: 'flex', flexDirection: 'row', justifyContent: 'stretch', alignItems: 'stretch', background: 'var(--bg-gradient)', direction: 'rtl' }}>
      {/* Sidebar on the left */}
      <div className="soldier-sidebar" style={{ width: 220, minWidth: 180, background: 'var(--card-bg)', borderRadius: 0, boxShadow: 'none', margin: 0, padding: '32px 0', display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 0, position: 'relative', top: 0, height: '100vh' }}>
        <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary-dark)', marginBottom: 24, textAlign: 'center', letterSpacing: 1 }}>الأقسام</div>
        {SECTIONS.map(section => (
          <button
            key={section.key}
            onClick={() => setActiveSection(section.key)}
            style={{
              background: activeSection === section.key ? 'var(--primary)' : 'transparent',
              color: activeSection === section.key ? 'var(--bg)' : 'var(--text)',
              border: 'none',
              borderRadius: 0,
              padding: '14px 18px',
              margin: '0',
              fontWeight: 600,
              fontSize: '1.08rem',
              cursor: 'pointer',
              transition: 'all 0.18s',
              outline: 'none',
              textAlign: 'right',
              borderBottom: '1px solid var(--input-border)',
            }}
          >
            {section.label}
          </button>
        ))}
      </div>
      {/* Main Content */}
      <div className="soldier-content" style={{ background: 'transparent', borderRadius: 0, boxShadow: 'none', padding: '48px 48px 48px 0', width: '100%', margin: 0, minWidth: 0, maxWidth: 'none', height: '100vh', overflowY: 'auto' }}>
        {activeSection === 'personal' && <>
          <h2 style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '2rem', marginBottom: 24, textAlign: 'center' }}>البيانات الشخصية للجندي</h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'nowrap',
            margin: '0 auto',
            maxWidth: 400,
          }}>
            <div style={{
              background: 'var(--card-bg)',
              borderRadius: 16,
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              padding: '28px 24px',
              minWidth: 270,
              width: '100%',
              marginBottom: 18,
            }}>
              <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1.13rem', marginBottom: 18, letterSpacing: 0.5, textAlign: 'center' }}>
                معلومات الهوية والخدمة والشخصية
              </div>
              <DetailItem label="الرقم العسكري" value={soldier.id} />
              <DetailItem label="الرقم الثلاثي" value={soldier.tripleNumber} />
              <DetailItem label="الرقم القومي" value={soldier.nationalId} />
              <DetailItem label="رقم الحصر" value={soldier.hasrNumber} />
              <DetailItem label="الاسم الخماسي" value={soldier.fullName} />
              <DetailItem label="تاريخ الميلاد" value={soldier.birthDate} />
              <DetailItem label="تاريخ التجنيد" value={soldier.enlistDate} />
              <DetailItem label="تاريخ الرديف" value={soldier.reserveDate} />
              <DetailItem label="المؤهل الدراسي" value={soldier.education} />
            </div>
          </div>
          <style>{`
            @media (max-width: 900px) {
              .soldier-content > div[style*='display: flex'] {
                flex-direction: column !important;
                gap: 18px !important;
                align-items: stretch !important;
              }
            }
          `}</style>
        </>}
        {activeSection === 'moves' && (
          <div>
            <h2 style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '2rem', marginBottom: 24, textAlign: 'center' }}>سجل التنقلات</h2>
            {soldier.moves && soldier.moves.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--card-bg)', borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
                <thead>
                  <tr style={{ background: 'var(--primary)', color: 'var(--bg)' }}>
                    <th style={{ padding: '12px', fontWeight: 700 }}>من</th>
                    <th style={{ padding: '12px', fontWeight: 700 }}>إلى</th>
                    <th style={{ padding: '12px', fontWeight: 700 }}>تاريخ النقل</th>
                    <th style={{ padding: '12px', fontWeight: 700 }}>نوع النقل</th>
                  </tr>
                </thead>
                <tbody>
                  {soldier.moves.map(move => (
                    <tr key={move.id} style={{ borderBottom: '1px solid var(--input-border)' }}>
                      <td style={{ padding: '10px', textAlign: 'center' }}>{move.from}</td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>{move.to}</td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>{move.date}</td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>{move.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <SectionPlaceholder title="سجل التنقلات" />
            )}
          </div>
        )}
        {activeSection === 'promotions' && (
          <div>
            <h2 style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '2rem', marginBottom: 24, textAlign: 'center' }}>سجل الترقيات</h2>
            {soldier.promotions && soldier.promotions.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--card-bg)', borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
                <thead>
                  <tr style={{ background: 'var(--primary)', color: 'var(--bg)' }}>
                    <th style={{ padding: '12px', fontWeight: 700 }}>الرتبة السابقة</th>
                    <th style={{ padding: '12px', fontWeight: 700 }}>الرتبة الجديدة</th>
                    <th style={{ padding: '12px', fontWeight: 700 }}>تاريخ الترقية</th>
                    <th style={{ padding: '12px', fontWeight: 700 }}>رقم الدوره</th>
                  </tr>
                </thead>
                <tbody>
                  {soldier.promotions.map((promotion: any) => (
                    <tr key={promotion.id} style={{ borderBottom: '1px solid var(--input-border)' }}>
                      <td style={{ padding: '10px', textAlign: 'center' }}>{promotion.fromRank}</td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>{promotion.toRank}</td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>{promotion.date}</td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>{promotion.courseNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <SectionPlaceholder title="سجل الترقيات" />
            )}
          </div>
        )}
        {activeSection === 'contact' && (
          <div>
            <h2 style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '2rem', marginBottom: 24, textAlign: 'center' }}>بيانات التواصل</h2>
            {soldier.contact ? (
              <div style={{
                background: 'var(--card-bg)',
                borderRadius: 16,
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                padding: '28px 24px',
                minWidth: 270,
                width: '100%',
                margin: '0 auto',
                maxWidth: 400,
                display: 'flex',
                flexDirection: 'column',
                gap: 18
              }}>
                <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1.13rem', marginBottom: 18, letterSpacing: 0.5, textAlign: 'center' }}>
                  أرقام الهواتف
                </div>
                {soldier.contact.phones.map((phone, idx) => (
                  <DetailItem key={idx} label={phone.label} value={phone.value} />
                ))}
                <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1.13rem', margin: '18px 0 8px 0', letterSpacing: 0.5, textAlign: 'center' }}>
                  العنوان
                </div>
                <DetailItem label="الشارع" value={soldier.contact.address.street} />
                <DetailItem label="المركز" value={soldier.contact.address.district} />
                <DetailItem label="المحافظة" value={soldier.contact.address.governorate} />
              </div>
            ) : (
              <SectionPlaceholder title="بيانات التواصل" />
            )}
          </div>
        )}
        {activeSection === 'leaves' && (
          <div>
            <h2 style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '2rem', marginBottom: 24, textAlign: 'center' }}>سجل الاجازات</h2>
            {soldier.leaves && soldier.leaves.length > 0 ? (
              <>
                {/* Monthly Leaves */}
                {soldier.leaves.filter(l => l.type === 'شهريه').length > 0 && (
                  <div style={{ marginBottom: 32 }}>
                    <h3 style={{ color: 'var(--primary-dark)', fontWeight: 700, fontSize: '1.2rem', marginBottom: 12 }}>الإجازات الشهرية</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--card-bg)', borderRadius: 8, overflow: 'hidden', marginBottom: 12 }}>
                      <thead>
                        <tr style={{ background: 'var(--primary)', color: 'var(--bg)' }}>
                          <th style={{ padding: '12px', fontWeight: 700 }}>الطقم</th>
                          <th style={{ padding: '12px', fontWeight: 700 }}>الفترة</th>
                          <th style={{ padding: '12px', fontWeight: 700 }}>عدد الأيام</th>
                          <th style={{ padding: '12px', fontWeight: 700 }}>ملاحظات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {soldier.leaves.filter(l => l.type === 'شهريه').map((leave, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid var(--input-border)' }}>
                            <td style={{ padding: '10px', textAlign: 'center' }}>{leave.team}</td>
                            <td style={{ padding: '10px', textAlign: 'center' }}>{leave.periodStart} - {leave.periodEnd}</td>
                            <td style={{ padding: '10px', textAlign: 'center' }}>10</td>
                            <td style={{ padding: '10px', textAlign: 'center' }}>{leave.notes || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {/* Individual Leaves */}
                {soldier.leaves.filter(l => l.type === 'فرديه').length > 0 && (
                  <div style={{ marginBottom: 32 }}>
                    <h3 style={{ color: 'var(--primary-dark)', fontWeight: 700, fontSize: '1.2rem', marginBottom: 12 }}>الإجازات الفردية</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--card-bg)', borderRadius: 8, overflow: 'hidden', marginBottom: 12 }}>
                      <thead>
                        <tr style={{ background: 'var(--primary)', color: 'var(--bg)' }}>
                          <th style={{ padding: '12px', fontWeight: 700 }}>تاريخ البداية</th>
                          <th style={{ padding: '12px', fontWeight: 700 }}>المدة (ساعات)</th>
                          <th style={{ padding: '12px', fontWeight: 700 }}>السبب</th>
                          <th style={{ padding: '12px', fontWeight: 700 }}>ملاحظات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {soldier.leaves.filter(l => l.type === 'فرديه').map((leave, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid var(--input-border)' }}>
                            <td style={{ padding: '10px', textAlign: 'center' }}>{leave.startDate}</td>
                            <td style={{ padding: '10px', textAlign: 'center' }}>{leave.durationHours}</td>
                            <td style={{ padding: '10px', textAlign: 'center' }}>{leave.reason || '-'}</td>
                            <td style={{ padding: '10px', textAlign: 'center' }}>{leave.notes || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {/* Daily Leaves */}
                {soldier.leaves.filter(l => l.type === 'يوميه').length > 0 && (
                  <div style={{ marginBottom: 32 }}>
                    <h3 style={{ color: 'var(--primary-dark)', fontWeight: 700, fontSize: '1.2rem', marginBottom: 12 }}>الإجازات اليومية/الفسحة</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--card-bg)', borderRadius: 8, overflow: 'hidden', marginBottom: 12 }}>
                      <thead>
                        <tr style={{ background: 'var(--primary)', color: 'var(--bg)' }}>
                          <th style={{ padding: '12px', fontWeight: 700 }}>التاريخ</th>
                          <th style={{ padding: '12px', fontWeight: 700 }}>مبيت</th>
                          <th style={{ padding: '12px', fontWeight: 700 }}>وقت العودة</th>
                          <th style={{ padding: '12px', fontWeight: 700 }}>ملاحظات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {soldier.leaves.filter(l => l.type === 'يوميه').map((leave, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid var(--input-border)' }}>
                            <td style={{ padding: '10px', textAlign: 'center' }}>{leave.date}</td>
                            <td style={{ padding: '10px', textAlign: 'center' }}>{leave.overnight ? 'نعم' : 'لا'}</td>
                            <td style={{ padding: '10px', textAlign: 'center' }}>{leave.returnTime || '-'}</td>
                            <td style={{ padding: '10px', textAlign: 'center' }}>{leave.notes || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            ) : (
              <SectionPlaceholder title="سجل الاجازات" />
            )}
          </div>
        )}
        {activeSection === 'medical' && (
          <div>
            <h2 style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '2rem', marginBottom: 24, textAlign: 'center' }}>السجل الطبي</h2>
            {soldier.medicalRecords && soldier.medicalRecords.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--card-bg)', borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
                <thead>
                  <tr style={{ background: 'var(--primary)', color: 'var(--bg)' }}>
                    <th style={{ padding: '12px', fontWeight: 700 }}>اسم المستشفي</th>
                    <th style={{ padding: '12px', fontWeight: 700 }}>نوع العياده</th>
                    <th style={{ padding: '12px', fontWeight: 700 }}>تاريخ الكشف</th>
                    <th style={{ padding: '12px', fontWeight: 700 }}>اسم المندوب</th>
                    <th style={{ padding: '12px', fontWeight: 700 }}>القرار</th>
                  </tr>
                </thead>
                <tbody>
                  {soldier.medicalRecords.map((rec, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--input-border)' }}>
                      <td style={{ padding: '10px', textAlign: 'center' }}>{rec.hospitalName}</td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>{rec.clinicType}</td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>{rec.visitDate}</td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>{rec.representativeName && rec.representativeName !== '' && rec.representativeName !== 'بدون مندوب' ? rec.representativeName : 'بدون مندوب'}</td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>{rec.decision}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <SectionPlaceholder title="السجل الطبي" />
            )}
          </div>
        )}
        {activeSection === 'training' && (
          <div>
            <h2 style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '2rem', marginBottom: 24, textAlign: 'center' }}>سجل تدريب السلاح</h2>
            {soldier.weaponTraining && soldier.weaponTraining.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--card-bg)', borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
                <thead>
                  <tr style={{ background: 'var(--primary)', color: 'var(--bg)' }}>
                    <th style={{ padding: '12px', fontWeight: 700 }}>اسم السلاح</th>
                    <th style={{ padding: '12px', fontWeight: 700 }}>نوع التدريب</th>
                    <th style={{ padding: '12px', fontWeight: 700 }}>تاريخ التدريب</th>
                    <th style={{ padding: '12px', fontWeight: 700 }}>النتيجة</th>
                    <th style={{ padding: '12px', fontWeight: 700 }}>اسم المدرب</th>
                  </tr>
                </thead>
                <tbody>
                  {soldier.weaponTraining.map((rec, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--input-border)' }}>
                      <td style={{ padding: '10px', textAlign: 'center' }}>{rec.weaponName}</td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>{rec.trainingType}</td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>{rec.trainingDate}</td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>{rec.result}</td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>{rec.trainerName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <SectionPlaceholder title="سجل تدريب السلاح" />
            )}
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 900px) {
          .soldier-responsive-root {
            flex-direction: column-reverse !important;
            align-items: stretch !important;
            height: auto !important;
          }
          .soldier-sidebar {
            flex-direction: row !important;
            width: 100% !important;
            min-width: 0 !important;
            margin: 0 0 18px 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            padding: 0 !important;
            position: static !important;
            height: auto !important;
            overflow-x: auto;
          }
          .soldier-sidebar > div {
            display: none !important;
          }
          .soldier-sidebar button {
            flex: 1 1 0;
            font-size: 1rem !important;
            padding: 12px 0 !important;
            border-bottom: none !important;
            border-left: 1px solid var(--input-border);
            border-radius: 0 !important;
          }
          .soldier-sidebar button:last-child {
            border-left: none;
          }
          .soldier-content {
            min-width: 0 !important;
            max-width: 100vw !important;
            padding: 18px 6vw !important;
            margin: 0 !important;
            height: auto !important;
          }
        }
        @media (max-width: 600px) {
          .soldier-content {
            padding: 10px 2vw !important;
          }
        }
      `}</style>
    </div>
  );
};

const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--input-border)', fontSize: '1.13rem', fontWeight: 500, padding: '10px 0', background: 'none', borderRadius: 0, boxShadow: 'none' }}>
    <span style={{ color: 'var(--primary-dark)', fontWeight: 600, fontSize: '1.1rem' }}>{label}</span>
    <span style={{ color: 'var(--text)', fontWeight: 500 }}>{value}</span>
  </div>
);

const SectionPlaceholder: React.FC<{ title: string }> = ({ title }) => (
  <div style={{ textAlign: 'center', color: 'var(--primary-dark)', fontSize: '1.2rem', padding: '48px 0' }}>
    <span>{title}</span>
    <div style={{ color: 'var(--primary-dark)', opacity: 0.7, fontSize: '1rem', marginTop: 16 }}>لا توجد بيانات متوفرة حالياً</div>
  </div>
);

export default SoldierPage;

// Example mock data for demonstration
const mockSoldiers: Soldier[] = [
  {
    id: "12345",
    fullName: "أحمد محمد علي حسن إبراهيم",
    birthDate: "1995-03-12",
    enlistDate: "2020-01-01",
    reserveDate: "2023-01-01",
    education: "بكالوريوس هندسة",
    tripleNumber: "67890",
    nationalId: "29503121234567",
    hasrNumber: "54321",
    moves: [],
    promotions: [
      {
        id: "p1",
        fromRank: "جندي",
        toRank: "عريف",
        date: "2021-06-15",
        courseNumber: "1"
      },
      {
        id: "p2",
        fromRank: "عريف",
        toRank: "رقيب",
        date: "2022-08-10",
        courseNumber: "2"
      }
    ],
    contact: {
      phones: [
        { label: "رقم الجندي", value: "0123456789" },
        { label: "رقم الأب", value: "0123456789" },
        { label: "رقم الأم", value: "0123456789" }
      ],
      address: {
        street: "الشارع الرئيسي",
        district: "المركز الرئيسي",
        governorate: "المحافظة"
      }
    },
    medicalRecords: [
      {
        hospitalName: "مستشفى المحافظة",
        clinicType: "عيادة طبية",
        visitDate: "2023-04-15",
        representativeName: "د/ علي علي",
        decision: "تم التشخيص والعلاج"
      },
      {
        hospitalName: "مستشفى المركز",
        clinicType: "عيادة طبية",
        visitDate: "2023-05-20",
        representativeName: "د/ محمد محمد",
        decision: "تم التشخيص والعلاج"
      }
    ],
    weaponTraining: [
      {
        weaponName: "آلة جرافيك",
        trainingType: "تدريب عملي",
        trainingDate: "2023-06-01",
        result: "متوفر",
        trainerName: "د/ علي علي"
      },
      {
        weaponName: "آلة جرافيك",
        trainingType: "تدريب نظري",
        trainingDate: "2023-06-05",
        result: "متوفر",
        trainerName: "د/ محمد محمد"
      }
    ],
    leaves: [
      {
        type: 'شهريه',
        team: 'الأول',
        periodStart: '2023-01-01',
        periodEnd: '2023-01-31',
        notes: 'موجب الإجازات الشهرية'
      },
      {
        type: 'فرديه',
        startDate: '2023-02-15',
        durationHours: 48,
        reason: 'إجازة عيد الأضحى',
        notes: 'موجب الإجازات الفردية'
      },
      {
        type: 'يوميه',
        date: '2023-03-10',
        overnight: true,
        returnTime: '10:00',
        notes: 'موجب الإجازات اليومية'
      }
    ]
  }
];
