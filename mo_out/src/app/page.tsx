'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
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

  const lock     = useRef(false)
  const curRef   = useRef(0)
  // 현재 보이는 섹션 인덱스: 0~3 = 슬라이드, 4 = 푸터
  const sectionRef  = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => { curRef.current = cur }, [cur])

  const go = useCallback((next: number) => {
    if (lock.current || next === curRef.current || next < 0 || next >= SLIDES.length) return
    lock.current = true
    setAnim('out')
    setTimeout(() => {
      setCur(next); curRef.current = next
      setAnim('in')
      setTimeout(() => { setAnim(null); lock.current = false }, 560)
    }, 260)
  }, [])

  // 섹션 이동 (0~4, 4=footer)
  const goSection = useCallback((idx: number) => {
    const container = containerRef.current
    if (!container) return
    const sections = container.querySelectorAll<HTMLElement>('.snap-section')
    if (idx < 0 || idx >= sections.length) return
    sectionRef.current = idx
    sections[idx].scrollIntoView({ behavior: 'smooth' })
    // 슬라이드 섹션이면 cur 동기화 (0~3)
    if (idx < SLIDES.length) {
      const target = idx
      setTimeout(() => {
        if (curRef.current !== target) {
          setCur(target)
          curRef.current = target
        }
      }, 100)
    }
  }, [])

  // wheel 핸들러 — snap 컨테이너가 자체 스크롤하지만, 슬라이드 내부에서 가로/콘텐츠 변경
  useEffect(() => {
    let acc = 0
    let lastTime = 0
    const onWheel = (e: WheelEvent) => {
      const now = Date.now()
      // 400ms 이내 연속 이벤트는 누적 (trackpad 대응)
      if (now - lastTime > 400) acc = 0
      lastTime = now

      const sec = sectionRef.current
      if (sec < SLIDES.length) {
        // 슬라이드 섹션: 기본 scroll snap 동작을 막고 직접 제어
        e.preventDefault()
        acc += e.deltaY
        if (acc > 60) {
          acc = 0
          if (sec < SLIDES.length - 1) {
            // 다음 슬라이드
            go(sec + 1)
            sectionRef.current = sec + 1
          } else {
            // 마지막 슬라이드 → 푸터
            goSection(SLIDES.length)
          }
        } else if (acc < -60) {
          acc = 0
          if (sec > 0) {
            go(sec - 1)
            sectionRef.current = sec - 1
          }
        }
      } else {
        // 푸터 섹션: 내부 스크롤 허용, 맨위에서 위로 → DESIGN으로
        const footer = containerRef.current?.querySelector<HTMLElement>('.footer-section')
        if (!footer) return
        if (footer.scrollTop <= 2 && e.deltaY < 0) {
          e.preventDefault()
          acc += e.deltaY
          if (acc < -60) {
            acc = 0
            goSection(SLIDES.length - 1) // DESIGN
          }
        } else {
          acc = 0
        }
      }
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [go, goSection])

  // touch
  useEffect(() => {
    let sy = 0
    const ts = (e: TouchEvent) => { sy = e.touches[0].clientY }
    const te = (e: TouchEvent) => {
      const d = sy - e.changedTouches[0].clientY
      if (Math.abs(d) < 40) return
      const sec = sectionRef.current
      if (sec < SLIDES.length) {
        if (d > 0) {
          if (sec < SLIDES.length - 1) { go(sec + 1); sectionRef.current = sec + 1 }
          else goSection(SLIDES.length)
        } else {
          if (sec > 0) { go(sec - 1); sectionRef.current = sec - 1 }
        }
      } else {
        const footer = containerRef.current?.querySelector<HTMLElement>('.footer-section')
        if (footer && footer.scrollTop <= 2 && d < 0) goSection(SLIDES.length - 1)
      }
    }
    window.addEventListener('touchstart', ts, { passive: true })
    window.addEventListener('touchend',   te, { passive: true })
    return () => { window.removeEventListener('touchstart', ts); window.removeEventListener('touchend', te) }
  }, [go, goSection])

  const s   = SLIDES[cur]
  const cls = anim === 'in' ? 'slide-in' : anim === 'out' ? 'slide-out' : ''

  return (
    <>
      <style>{`
        @keyframes bounce {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%      { transform: translateX(-50%) translateY(6px); }
        }
        .snap-container { scrollbar-width: none; }
        .snap-container::-webkit-scrollbar { display: none; }
        .footer-section { scrollbar-width: none; }
        .footer-section::-webkit-scrollbar { display: none; }
      `}</style>

      {/*
        scroll-snap 컨테이너
        - SLIDES(4개) + footer(1개) = 5개 섹션
        - 각 섹션 height: 100vh, snap-align: start
        - 슬라이드 섹션은 overflow:hidden (내부 콘텐츠 전환은 JS로)
        - 푸터 섹션은 overflow:auto (긴 footer 스크롤 가능)
      */}
      <div
        ref={containerRef}
        className="snap-container"
        style={{
          height: '100vh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
        }}
      >
        {/* 슬라이드 섹션 — 단 1개, 내부 콘텐츠만 교체 */}
        <section
          className="snap-section home-root"
          style={{ height: '100vh', scrollSnapAlign: 'start', flexShrink: 0, position: 'relative', overflow: 'hidden' }}
        >
          <div className="home-vline" />
          {s.showImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/mouse.png" alt="mo mascot" className={'home-mascot-img ' + cls} />
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
                onClick={() => { go(i); sectionRef.current = i }}
                aria-label={'Slide ' + (i + 1)}
              />
            ))}
          </div>
        </section>

        {/* 푸터 섹션 */}
        <section
          className="snap-section footer-section"
          style={{ height: '100vh', scrollSnapAlign: 'start', flexShrink: 0, overflowY: 'auto', overflowX: 'hidden' }}
        >
          <Footer />
        </section>
      </div>
    </>
  )
}
