import Link from 'next/link'
import Footer from '@/components/layout/Footer'

export default function AboutPage() {
  return (
    <>
      <div className="about-root page-enter">
        <div className="about-inner">
          <p className="about-eyebrow">About</p>
          <h1 className="about-h1">
            We make<br />
            <span>digital things.</span>
          </h1>

          <div className="about-2col">
            <p className="about-p">
              mo.jji.kr은 웹, 모바일, 디자인 전반에 걸쳐 디지털 경험을 구축하는 크리에이티브 스튜디오입니다.
              퍼포먼스와 미학의 균형을 통해 브랜드의 본질을 시각화합니다.
            </p>
            <p className="about-p" style={{ color: 'rgba(255,255,255,0.38)' }}>
              사용자 중심의 사고방식과 세밀한 디테일로 프로젝트에 접근합니다.
              각 프로젝트는 단순한 결과물이 아닌, 고객과의 협업을 통해 만들어지는 고유한 경험입니다.
            </p>
          </div>

          <div className="about-stats">
            {[
              { num: '50+', label: 'Projects'  },
              { num: '3+',  label: 'Years'     },
              { num: '30+', label: 'Clients'   },
              { num: '100%',label: 'Passion'   },
            ].map(s => (
              <div key={s.label}>
                <p className="about-stat-num">{s.num}</p>
                <p className="about-stat-label">{s.label}</p>
              </div>
            ))}
          </div>

          <p className="about-eyebrow" style={{ marginBottom: 24 }}>Expertise</p>
          <div className="about-skills">
            {[
              { area: 'Web',    items: ['React / Next.js', 'TypeScript', 'Performance', 'Animation'] },
              { area: 'Mobile', items: ['React Native', 'iOS / Android', 'UX Design', 'App Store']   },
              { area: 'Design', items: ['Brand Identity', 'UI / UX', 'Motion', 'Illustration']        },
            ].map(sk => (
              <div key={sk.area} className="about-skill-card">
                <p className="about-skill-head">{sk.area}</p>
                {sk.items.map(it => <p key={it} className="about-skill-item">{it}</p>)}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/project-quest" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 28px', borderRadius: 100,
              border: '1px solid rgba(255,255,255,0.18)',
              fontSize: 13, fontWeight: 500, color: '#fff',
              letterSpacing: '-0.02em',
            }}>
              프로젝트 시작하기
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
