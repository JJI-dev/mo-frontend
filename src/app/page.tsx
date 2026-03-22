'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'

const SLIDES = [
  { label: 'WORKSPACE', accent: 'UI MOTION',    sub: 'Creative Studio', desc: '디지털 경험을 설계하고\n브랜드를 구현합니다.',    showImage: true  },
  { label: 'WEB',       accent: 'FRONTEND',      sub: 'Development',     desc: '사용자 중심의 웹 경험.\n퍼포먼스와 미학의 균형.', showImage: false },
  { label: 'MOBILE',    accent: 'iOS & ANDROID', sub: 'Application',     desc: '손끝에서 시작되는\n완벽한 모바일 여정.',        showImage: false },
  { label: 'DESIGN',    accent: 'BRANDING',      sub: 'Visual Identity', desc: '브랜드의 본질을\n시각적 언어로 번역합니다.',    showImage: false },
]

export default function HomePage() {
  const [cur,  setCur]  = useState(0)
  const [anim, setAnim] = useState<'in'|'out'|null>(null)
  const lock = useRef(false)
  const ref  = useRef<HTMLDivElement>(null)

  const go = (next: number) => {
    if (lock.current || next === cur || next < 0 || next >= SLIDES.length) return
    lock.current = true
    setAnim('out')
    setTimeout(() => {
      setCur(next)
      setAnim('in')
      setTimeout(() => { setAnim(null); lock.current = false }, 560)
    }, 260)
  }

  useEffect(() => {
    let acc = 0
    const onWheel = (e: WheelEvent) => {
      if (cur === SLIDES.length - 1 && e.deltaY > 0) return
      e.preventDefault()
      acc += e.deltaY
      if (acc >  80) { acc = 0; go(cur + 1) }
      if (acc < -80) { acc = 0; go(cur - 1) }
    }
    const el = ref.current
    el?.addEventListener('wheel', onWheel, { passive: false })
    return () => el?.removeEventListener('wheel', onWheel)
  }, [cur])

  useEffect(() => {
    let sy = 0
    const ts = (e: TouchEvent) => { sy = e.touches[0].clientY }
    const te = (e: TouchEvent) => {
      const d = sy - e.changedTouches[0].clientY
      if (Math.abs(d) < 50) return
      d > 0 ? go(cur + 1) : go(cur - 1)
    }
    const el = ref.current
    el?.addEventListener('touchstart', ts, { passive: true })
    el?.addEventListener('touchend',   te, { passive: true })
    return () => { el?.removeEventListener('touchstart', ts); el?.removeEventListener('touchend', te) }
  }, [cur])

  const s   = SLIDES[cur]
  const cls = anim === 'in' ? 'slide-in' : anim === 'out' ? 'slide-out' : ''

  return (
    <>
      <div className="home-root" ref={ref}>
        <div className="home-vline" />

        {s.showImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/mouse.png"
            alt="mo mascot"
            className={'home-mascot-img ' + cls}
          />
        )}

        <div className={'home-bgnumber ' + cls}>{String(cur + 1).padStart(2, '0')}</div>
        <div className={'home-accent ' + cls}>{s.accent}</div>

        <div className="home-slide-label">
          <h1 className={cls}>{s.label}</h1>
        </div>

        <div className={'home-bottom ' + cls}>
          <div>
            <p className="home-desc-sub">{s.sub}</p>
            <p className="home-desc-text">{s.desc}</p>
          </div>
          <Link href="/work" className="home-view-btn">
            View Work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {cur === 0 && (
          <div style={{
            position: 'absolute', bottom: 48, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            color: 'rgba(255,255,255,0.2)', animation: 'bounce 2s ease-in-out infinite', zIndex: 2,
          }}>
            <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Scroll</span>
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
              <rect x="1" y="1" width="10" height="18" rx="5" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="6" cy="6" r="2" fill="currentColor">
                <animate attributeName="cy" values="6;13;6" dur="2s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>
        )}

        <div className="home-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={'home-dot' + (i === cur ? ' on' : '')}
              style={{ height: i === cur ? 28 : 8 }}
              onClick={() => go(i)}
              aria-label={'Slide ' + (i + 1)}
            />
          ))}
        </div>

        <style>{`
          @keyframes bounce {
            0%,100% { transform: translateX(-50%) translateY(0); }
            50%      { transform: translateX(-50%) translateY(6px); }
          }
        `}</style>
      </div>

      <Footer />
    </>
  )
}
