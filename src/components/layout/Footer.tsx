import Link from 'next/link'

const NAV_LINKS = ['Home', 'About', 'Work', 'Project Quest']
const hrefs: Record<string, string> = {
  'Home': '/', 'About': '/about', 'Work': '/work', 'Project Quest': '/project-quest'
}

export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="footer-top">
        <div>
          <p className="footer-tagline">Creative Studio</p>
          <p className="footer-desc">
            디지털 경험을 만드는 크리에이티브 스튜디오.<br />
            웹, 모바일, 디자인을 통해 브랜드를 구현합니다.
          </p>
        </div>

        <div className="footer-nav-group">
          <div className="footer-nav-col">
            <p className="footer-nav-head">Pages</p>
            {NAV_LINKS.map(name => (
              <Link key={name} href={hrefs[name]} className="footer-nav-link">{name}</Link>
            ))}
          </div>
          <div className="footer-nav-col">
            <p className="footer-nav-head">Contact</p>
            <a href="mailto:hello@mo.jji.kr" className="footer-nav-link">contact@jji.kr</a>
            <a href="https://mo.jji.kr" target="_blank" rel="noopener noreferrer" className="footer-nav-link">mo@jji.kr</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">© 2026 JJI All rights reserved.</p>
        <p className="footer-copy">Creative Studio</p>
      </div>

      {/* 워드마크 — 아래가 더 많이 잘리도록 height 수치 축소 */}
      <div 
        className="footer-logo-clip" 
        style={{ height: 'clamp(40px, 7vw, 110px)' }} /* 수치를 줄여서 밑동이 더 과감하게 잘리게 함 */
      >
        <svg
          width="100%"
          viewBox="0 0 1920 280" 
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMin slice" /* 위를 천장에 붙이고 아래를 자름 */
          style={{ 
            display: 'block', 
            width: '100%', 
            height: '100%', 
            transform: 'none'
          }}
        >
          <path
            d="M52.92 225.54C131.88 225.54 147.42 206.22 147.42 164.22V5.8803H232.68V164.64C232.68 246.96 191.1 298.62 55.86 298.62C13.02 298.62 -28.14 292.74 -60.06 282.24L-40.74 212.94C-12.6 221.34 25.2 225.54 52.92 225.54ZM349.463 225.54C428.423 225.54 443.963 206.22 443.963 164.22V5.8803H529.223V164.64C529.223 246.96 487.643 298.62 352.403 298.62C309.563 298.62 268.403 292.74 236.483 282.24L255.803 212.94C283.943 221.34 321.743 225.54 349.463 225.54ZM655.663 292.32H570.403V5.8803H655.663V292.32ZM998.612 357.42H694.112V307.02H998.612V357.42ZM1122.42 292.32H1037.16V5.8803H1140.9L1312.26 222.18L1483.2 5.8803H1585.26V292.32H1500V107.1L1354.26 292.32H1268.16L1122.42 107.1V292.32ZM1857.46 298.2C1693.24 298.2 1622.26 251.58 1622.26 149.1C1622.26 46.6203 1693.24 0.000295877 1857.46 0.000295877C2021.68 0.000295877 2092.66 46.6203 2092.66 149.1C2092.66 251.58 2021.68 298.2 1857.46 298.2ZM1857.46 225.12C1972.12 225.12 2005.72 204.54 2005.72 149.1C2005.72 93.6603 1972.12 73.0803 1857.46 73.0803C1742.38 73.0803 1707.52 93.6603 1707.52 149.1C1707.52 204.54 1742.38 225.12 1857.46 225.12Z"
            fill="white"
            fillOpacity="0.06"
          />
        </svg>
      </div>
    </footer>
  )
}