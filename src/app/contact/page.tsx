import Link from 'next/link'
import Footer from '@/components/layout/Footer'

export default function ContactPage() {
  return (
    <>
      <div className="contact-root page-enter">
        <div className="contact-inner">
          <p style={{
            fontSize: 10, fontWeight: 500, textTransform: 'uppercase',
            letterSpacing: '0.18em', color: 'rgba(255,255,255,0.28)', marginBottom: 20,
          }}>Contact</p>

          <h1 className="contact-h1">
            Let&apos;s work<br />
            <span>together.</span>
          </h1>

          <div className="contact-2col">
            <div>
              <div style={{ marginBottom: 28 }}>
                <p className="contact-label">Email</p>
                <a href="mailto:hello@mo.jji.kr" className="contact-val">hello@mo.jji.kr</a>
              </div>
              <div style={{ marginBottom: 28 }}>
                <p className="contact-label">Website</p>
                <a href="https://mo.jji.kr" target="_blank" rel="noopener noreferrer" className="contact-val">mo.jji.kr</a>
              </div>
              <Link href="/project-quest" className="contact-start-btn">
                Start a Project
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
            <div className="contact-card">
              <p>
                프로젝트 문의, 협업 제안, 또는 단순한 인사도 환영합니다.
                메일로 연락주시거나 Project Quest를 통해 프로젝트를 시작해 보세요.
              </p>
              <p style={{ marginTop: 16, color: 'rgba(255,255,255,0.3)' }}>
                일반적으로 24시간 이내에 회신드립니다.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
