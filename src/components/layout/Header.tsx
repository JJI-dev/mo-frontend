'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

/* MO 전용 로고 — JSX SVG (dangerouslySetInnerHTML 대신 사용, baseline 잘림 방지) */
const LogoMO = () => (
  <svg
    style={{ height: 'var(--logo-h, 20px)', width: 'auto', display: 'block' }}
    viewBox="0 0 107 67"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M44.6943 22.9519C44.9846 22.7519 45.957 22.1236 47.5263 21.7745C48.4813 21.562 49.8153 21.9802 51.3012 22.8128C51.8668 23.1352 52.3185 23.4249 52.6883 23.691C52.865 23.8032 53.0194 23.8692 53.412 24.1369" stroke="white" strokeWidth="6" strokeLinecap="round"/>
    <path d="M73.0171 46.7973C73.9925 47.4006 76.0064 48.11 82.9004 47.9326C86.6236 47.8367 89.3496 45.8474 91.0474 44.3658C91.7842 43.7229 92.3838 42.9108 93.1859 42.3508C94.44 41.4753 96.2488 42.3379 100.767 44.0816C101.703 44.4263 101.973 44.5014 102.274 44.6276C102.575 44.7537 102.898 44.9288 103.477 45.5639" stroke="white" strokeWidth="6" strokeLinecap="round"/>
    <path d="M29.7793 34.6227C29.6952 34.7355 29.3716 35.16 28.6877 36.0393C27.7773 37.21 26.9171 38.3816 26.2302 39.6453C25.3253 41.3102 24.7941 43.3286 24.4546 45.2739C24.1141 47.2246 24.2676 48.588 24.3789 49.4245C24.5403 50.6373 25.0489 52.1986 25.7467 53.8817C26.4388 55.5512 27.8588 57.0677 29.2982 58.5176C30.4498 59.6777 31.3232 60.1354 31.7905 60.4192C32.3952 60.7864 33.6269 61.2864 35.1509 61.8552C36.2384 62.2612 37.4092 62.4416 38.6812 62.662C40.3992 62.9596 42.3308 63.11 43.9145 63.3105C46.1721 63.5963 47.3902 63.7796 48.9178 63.8804C51.1207 64.0258 52.7335 64.0088 53.0198 63.9872C54.088 63.9067 55.9076 63.6354 58.0756 63.2403C59.228 63.0303 60.8292 62.5723 62.0508 62.1891C62.7851 61.9588 63.3185 61.6786 64.053 61.1324C64.6914 60.6577 65.5844 59.8254 66.3147 59.0605C67.0667 58.2729 67.5327 57.5793 68.0511 56.895C69.0356 55.5952 69.2979 55.0448 69.8856 54.0824C70.3916 53.2536 70.601 52.7854 70.7973 52.3029C71.0499 51.6824 71.2311 51.073 71.6159 49.222C71.8102 48.2871 71.7641 46.5784 71.7921 44.3868C71.8217 42.0628 71.904 41.2023 71.995 40.5449C72.0715 39.9921 72.1141 39.3586 72.2119 38.7175C72.3205 38.0061 72.3661 37.3431 72.3873 36.681C72.4081 36.3932 72.4224 35.6627 72.4293 34.6918C72.4363 34.3194 72.4501 34.1912 72.4644 33.7568" stroke="white" strokeWidth="6" strokeLinecap="round"/>
    <path d="M53.7446 22.465C54.0659 21.819 54.5528 20.927 55.2347 19.8114C55.9238 18.6842 57.8152 16.6212 60.9009 13.5158C62.502 11.9045 64.4041 10.4248 66.1974 9.05001C69.614 6.43059 71.8029 4.90611 72.4973 4.19042C73.0412 3.62988 73.3357 3.16541 73.6587 3.03207C74.2049 2.80665 74.8859 3.84511 76.8595 4.90594C78.4045 5.73641 81.1152 7.05825 82.8824 8.02912C85.4744 9.45309 87.1426 10.6412 89.0793 11.6037C92.9269 13.5159 95.8219 13.6584 96.8418 14.5168C97.0914 14.7269 97.075 15.0319 96.9822 15.3021C96.7779 15.8972 96.2096 16.3261 95.257 17.0319C93.3167 18.4696 90.5193 19.9782 88.2549 21.193C86.5225 22.1223 83.7474 23.7679 80.3947 25.4755C78.4589 26.4614 77.4389 27.6485 75.859 29.7527C73.8727 32.019 73.5205 32.729 73.3686 33.1799C73.2863 33.3964 73.1935 33.5881 72.9573 33.7857" stroke="white" strokeWidth="6" strokeLinecap="round"/>
    <path d="M35.1665 4.80762C35.5151 5.95954 35.8638 7.11146 36.8604 9.38845C37.8571 11.6654 39.4913 15.0326 40.3767 16.9223C41.6317 19.6005 41.5698 20.6673 41.9327 21.4974C42.2063 21.8327 42.4942 22.1697 42.7795 22.4825C42.934 22.6181 43.1083 22.7067 43.4199 22.798" stroke="white" strokeWidth="6" strokeLinecap="round"/>
    <path d="M34.4886 3.78754C34.0249 3.75814 33.5612 3.72874 30.1112 4.14645C26.6611 4.56416 20.2387 5.42987 16.3745 6.06487C9.0031 7.27619 6.54729 9.34445 4.81842 10.2252C4.01945 10.6323 3.36203 10.8152 3.04851 11.0928C2.67596 11.4227 4.39241 13.5894 6.6949 16.762C8.69843 19.5227 11.9325 21.8251 15.0493 23.8946C17.5119 25.5299 19.2297 26.9679 21.0526 28.6004C25.1436 32.2641 26.2156 32.8211 27.1889 33.4825C27.4524 33.6451 27.7276 33.7905 27.9917 33.9526C28.2557 34.1148 28.5003 34.2892 29.3082 34.5571" stroke="white" strokeWidth="6" strokeLinecap="round"/>
  </svg>
)

const CATS = ['All', 'Web', 'Mobile', 'Admin', 'Design']
const NAV_LEFT  = [{ label: 'HOME', href: '/' }, { label: 'ABOUT', href: '/about' }]
const NAV_RIGHT = [{ label: 'PROJECT QUEST', href: 'https://req.jji.kr' }]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [workOpen, setWorkOpen] = useState(false)
  const [mobOpen,  setMobOpen]  = useState(false)
  const pathname = usePathname()
  const router   = useRouter()
  const timer    = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMobOpen(false); setWorkOpen(false) }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const openWork  = () => { if (timer.current) clearTimeout(timer.current); setWorkOpen(true) }
  const closeWork = () => { timer.current = setTimeout(() => setWorkOpen(false), 160) }

  return (
    <>
      <header className={'nav-root' + (scrolled ? ' scrolled' : '')}>

        {/* Nav pill: 로고 + 네비게이션 통합 */}
        <nav className="nav-pill-wrap">
          <div className="nav-pill">
            <Link href="/" aria-label="Home" className="nav-logo-inner">
              <LogoMO />
            </Link>

            {NAV_LEFT.map(n => (
              <Link key={n.href} href={n.href} className={'nav-link' + (isActive(n.href) ? ' active' : '')}>
                {n.label}
              </Link>
            ))}

            <div style={{ position: 'relative' }} onMouseEnter={openWork} onMouseLeave={closeWork}>
              <button
                className={'nav-work-btn' + (pathname.startsWith('/work') ? ' active' : '')}
                onClick={() => router.push('/work')}
              >
                WORK
                <svg width="9" height="6" viewBox="0 0 9 6" fill="none"
                  style={{ transition: 'transform 0.25s ease', transform: workOpen ? 'rotate(180deg)' : 'none' }}>
                  <path d="M1 1L4.5 5L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={'nav-dropdown' + (workOpen ? ' visible' : ' hidden')}>
                {CATS.map((cat, i) => (
                  <button key={cat} className="nav-dropdown-item"
                    onClick={() => { setWorkOpen(false); router.push('/work?category=' + cat) }}
                    style={{ borderBottom: i < CATS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {NAV_RIGHT.map(n => (
              <Link key={n.href} href={n.href} className={'nav-link' + (isActive(n.href) ? ' active' : '')}>
                {n.label}
              </Link>
            ))}
          </div>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="mailto:contact@jji.kr" className="nav-contact nav-contact-desktop">CONTACT</Link>
          <button onClick={() => setMobOpen(p => !p)} aria-label="Menu" className="nav-ham"
            style={{ display: 'none', alignItems: 'center', justifyContent: 'center', padding: '10px 6px' }}>
            <svg
              width="22" height="20" viewBox="0 0 22 20" fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1" y1="2" x2="21" y2="2"
                stroke="white" strokeWidth="1.5" strokeLinecap="round"
                style={{
                  transformOrigin: '11px 2px',
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                  transform: mobOpen ? 'translateY(8px) rotate(45deg)' : 'none',
                }}
              />
              <line
                x1="1" y1="10" x2="21" y2="10"
                stroke="white" strokeWidth="1.5" strokeLinecap="round"
                style={{
                  transition: 'opacity 0.2s ease',
                  opacity: mobOpen ? 0 : 1,
                }}
              />
              <line
                x1="1" y1="18" x2="21" y2="18"
                stroke="white" strokeWidth="1.5" strokeLinecap="round"
                style={{
                  transformOrigin: '11px 18px',
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                  transform: mobOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
                }}
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Backdrop */}
      {mobOpen && (
        <div onClick={() => setMobOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 48, background: 'rgba(0,0,0,0.4)' }} />
      )}

      {/* Mobile menu */}
      <div className={'mob-menu' + (mobOpen ? ' open' : '')}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 49 }}>
        <div className="mob-menu-inner">
          {[...NAV_LEFT, { label: 'WORK', href: '/work' }, ...NAV_RIGHT].map(n => (
            <Link key={n.href} href={n.href} className="mob-link">{n.label}</Link>
          ))}
          <Link href="/contact" className="mob-link-cta">CONTACT →</Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-pill-wrap       { display: none !important; }
          .nav-contact-desktop { display: none !important; }
          .nav-ham             { display: flex !important; }
        }
      `}</style>
    </>
  )
}
