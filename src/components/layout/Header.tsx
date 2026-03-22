'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const LOGO = `<svg width="28" height="24" viewBox="0 0 65 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M27.0156 13.774C27.1898 13.656 27.7732 13.2852 28.7148 13.0792C29.2878 12.9538 30.0881 13.2006 30.9797 13.6919C31.319 13.8822 31.59 14.0532 31.8119 14.2102C31.9179 14.2764 32.0106 14.3154 32.2461 14.4734" stroke="white" stroke-width="4" stroke-linecap="round"/><path d="M44.0098 27.8458C44.595 28.2018 45.8033 28.6205 49.9396 28.5158C52.1735 28.4592 53.809 27.2852 54.8277 26.4109C55.2697 26.0315 55.6295 25.5522 56.1108 25.2217C56.8632 24.705 57.9484 25.2141 60.6593 26.2431C61.2209 26.4466 61.3827 26.4909 61.5633 26.5653C61.7438 26.6398 61.9381 26.7431 62.2854 27.1179" stroke="white" stroke-width="4" stroke-linecap="round"/><path d="M18.0659 20.6614C18.0155 20.7279 17.8213 20.9785 17.411 21.4974C16.8648 22.1882 16.3486 22.8797 15.9365 23.6254C15.3936 24.608 15.0749 25.7991 14.8712 26.9471C14.6669 28.0984 14.759 28.903 14.8258 29.3966C14.9226 30.1123 15.2278 31.0337 15.6464 32.027C16.0617 33.0122 16.9137 33.9072 17.7773 34.7628C18.4682 35.4475 18.9922 35.7176 19.2726 35.8851C19.6354 36.1018 20.3744 36.3968 21.2888 36.7325C21.9413 36.9721 22.6438 37.0786 23.4069 37.2086C24.4377 37.3843 25.5966 37.473 26.5468 37.5913C27.9014 37.76 28.6322 37.8682 29.5487 37.9277C30.8705 38.0135 31.8381 38.0035 32.0099 37.9907C32.6508 37.9432 33.7425 37.7831 35.0433 37.5499C35.7347 37.426 36.6954 37.1557 37.4283 36.9296C37.8689 36.7936 38.189 36.6283 38.6297 36.3059C39.0127 36.0258 39.5485 35.5346 39.9866 35.0832C40.4378 34.6184 40.7174 34.2091 41.0284 33.8053C41.6191 33.0382 41.7765 32.7134 42.1291 32.1454C42.4327 31.6563 42.5583 31.38 42.6761 31.0953C42.8277 30.7291 42.9364 30.3694 43.1672 29.2771C43.2839 28.7254 43.2562 27.717 43.273 26.4236C43.2907 25.0521 43.3401 24.5443 43.3947 24.1564C43.4406 23.8301 43.4662 23.4563 43.5249 23.0779C43.59 22.6581 43.6174 22.2668 43.6301 21.8761C43.6426 21.7062 43.6512 21.2751 43.6553 20.7022C43.6595 20.4824 43.6678 20.4067 43.6764 20.1504" stroke="white" stroke-width="4" stroke-linecap="round"/><path d="M32.4453 13.4866C32.6381 13.1054 32.9302 12.5789 33.3393 11.9206C33.7528 11.2554 34.8876 10.0379 36.739 8.20526C37.6996 7.25439 38.8409 6.38116 39.9168 5.56981C41.9667 4.02397 43.28 3.12431 43.6966 2.70194C44.023 2.37114 44.1997 2.09704 44.3935 2.01835C44.7211 1.88532 45.1298 2.49816 46.3139 3.1242C47.2409 3.61431 48.8673 4.39438 49.9276 4.96733C51.4827 5.80768 52.4836 6.50886 53.6456 7.07687C55.9541 8.20535 57.691 8.28941 58.3029 8.79604C58.4527 8.92002 58.4429 9.10001 58.3872 9.25943C58.2646 9.61063 57.9236 9.86377 57.3521 10.2803C56.1879 11.1288 54.5096 12.019 53.1509 12.7359C52.1116 13.2844 50.4465 14.2555 48.435 15.2632C47.2735 15.8451 46.6615 16.5456 45.7136 17.7874C44.5219 19.1248 44.3105 19.5439 44.2194 19.8099C44.17 19.9377 44.1144 20.0509 43.9726 20.1674" stroke="white" stroke-width="4" stroke-linecap="round"/><path d="M21.2988 3.06641C21.508 3.74621 21.7172 4.42601 22.3152 5.76976C22.9132 7.11352 23.8936 9.10063 24.4249 10.2158C25.1778 11.7964 25.1407 12.426 25.3584 12.9158C25.5226 13.1137 25.6954 13.3125 25.8665 13.4972C25.9592 13.5772 26.0638 13.6295 26.2508 13.6833" stroke="white" stroke-width="4" stroke-linecap="round"/><path d="M20.8922 2.46398C20.614 2.44663 20.3358 2.42928 18.2658 2.67579C16.1958 2.92229 12.3425 3.43319 10.024 3.80793C5.60128 4.52279 4.12783 5.74336 3.09053 6.26316C2.61117 6.50337 2.21673 6.61133 2.02862 6.77515C1.80509 6.96981 2.83494 8.24847 4.2164 10.1208C5.41848 11.75 7.35887 13.1087 9.22889 14.3301C10.7065 15.2951 11.7371 16.1438 12.8308 17.1072C15.2853 19.2693 15.9285 19.598 16.5125 19.9883C16.6706 20.0843 16.8357 20.1701 16.9941 20.2658C17.1526 20.3614 17.2993 20.4644 17.7841 20.6225" stroke="white" stroke-width="4" stroke-linecap="round"/></svg>`

const CATS = ['All', 'Web', 'Mobile', 'Admin', 'Design']
const NAV_LEFT  = [{ label: 'HOME', href: '/' }, { label: 'ABOUT', href: '/about' }]
const NAV_RIGHT = [{ label: 'PROJECT QUEST', href: '/project-quest' }]

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

        {/* Single pill: logo + all nav */}
        <nav className="nav-pill-wrap">
          <div className="nav-pill">
            <Link href="/" aria-label="Home" className="nav-logo-inner">
              <div dangerouslySetInnerHTML={{ __html: LOGO }} style={{ display: 'flex', alignItems: 'center' }} />
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
          <Link href="/contact" className="nav-contact nav-contact-desktop">CONTACT</Link>
          <button onClick={() => setMobOpen(p => !p)} aria-label="Menu" className="nav-ham"
            style={{ display: 'none', flexDirection: 'column', gap: 5, padding: 6 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: 22, height: 1.5, background: '#fff', borderRadius: 2,
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: mobOpen
                  ? (i === 0 ? 'rotate(45deg) translate(4.5px, 4.5px)' : i === 2 ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none')
                  : 'none',
                opacity: mobOpen && i === 1 ? 0 : 1,
              }} />
            ))}
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
