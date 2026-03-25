'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import Footer from '@/components/layout/Footer' // 경로 확인 필수

const SLIDES = [
  { label: 'WORKSPACE', accent: 'UI MOTION',    sub: 'Creative Studio', desc: '디지털 경험을 설계하고\n브랜드를 구현합니다.',    showImage: true  },
  { label: 'WEB',       accent: 'FRONTEND',      sub: 'Development',     desc: '사용자 중심의 웹 경험.\n퍼포먼스와 미학의 균형.', showImage: false },
  { label: 'MOBILE',    accent: 'iOS & ANDROID', sub: 'Application',     desc: '손끝에서 시작되는\n완벽한 모바일 여정.',        showImage: false },
  { label: 'DESIGN',    accent: 'BRANDING',      sub: 'Visual Identity', desc: '브랜드의 본질을\n시각적 언어로 번역합니다.',    showImage: false },
]

export default function HomePage() {
  const [slideIdx, setSlideIdx] = useState(0)
  const [showFooter, setShowFooter] = useState(false)
  const [anim, setAnim] = useState<'in'|'out'|null>(null)
  const [footerHeight, setFooterHeight] = useState(0)

  const isAnimating = useRef(false)
  const footerRef = useRef<HTMLElement>(null)

  // 1. 푸터 높이 동적 계산 (화면 사이즈가 변해도 정확한 높이만큼만 올라오도록)
  useEffect(() => {
    const updateHeight = () => {
      if (footerRef.current) setFooterHeight(footerRef.current.offsetHeight)
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  // 2. 슬라이드 내부 변경 로직
  const changeSlide = useCallback((next: number) => {
    if (isAnimating.current || next === slideIdx || next < 0 || next >= SLIDES.length) return;
    
    isAnimating.current = true;
    setAnim('out');
    
    setTimeout(() => {
      setSlideIdx(next);
      setAnim('in');
      setTimeout(() => { 
        setAnim(null); 
        isAnimating.current = false; 
      }, 500); 
    }, 300); 
  }, [slideIdx]);

  // 3. 휠 & 스와이프 방향 컨트롤러
  const handleScroll = useCallback((dir: 'up' | 'down') => {
    if (isAnimating.current) return;

    if (dir === 'down') {
      if (!showFooter) {
        if (slideIdx < SLIDES.length - 1) {
          changeSlide(slideIdx + 1);
        } else if (slideIdx === SLIDES.length - 1) {
          // 마지막 슬라이드에서 아래로 스크롤 -> 푸터 보이기
          isAnimating.current = true;
          setShowFooter(true);
          setTimeout(() => { isAnimating.current = false; }, 650);
        }
      }
    } else { // dir === 'up'
      if (showFooter) {
        // ★ 핵심: 푸터가 보일 때 살짝이라도 위로 스크롤하면, 무조건 슬라이드로 원상복귀!
        isAnimating.current = true;
        setShowFooter(false);
        setTimeout(() => { isAnimating.current = false; }, 650);
      } else {
        if (slideIdx > 0) {
          changeSlide(slideIdx - 1);
        }
      }
    }
  }, [slideIdx, showFooter, changeSlide]);

  // 4. 브라우저 기본 휠 스크롤 완벽 차단
  useEffect(() => {
    let wheelAcc = 0;
    let lastTime = Date.now();

    const onWheel = (e: WheelEvent) => {
      e.preventDefault(); // ★ 네이티브 스크롤을 100% 차단해서 어중간하게 멈추는 현상 방지

      const now = Date.now();
      if (now - lastTime > 50) wheelAcc = 0;
      lastTime = now;
      wheelAcc += e.deltaY;

      if (Math.abs(wheelAcc) > 50) {
        handleScroll(wheelAcc > 0 ? 'down' : 'up');
        wheelAcc = 0;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [handleScroll]);

  // 5. 모바일 터치 스크롤 완벽 차단
  useEffect(() => {
    let sy = 0;
    const onTouchStart = (e: TouchEvent) => { sy = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); }; // ★ 모바일에서도 찔끔찔끔 스크롤 방지
    const onTouchEnd = (e: TouchEvent) => {
      const dy = sy - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) {
        handleScroll(dy > 0 ? 'down' : 'up');
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: false });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [handleScroll]);

  const handleDotClick = (i: number) => {
    if (i === slideIdx && !showFooter) return;
    if (isAnimating.current) return;

    if (showFooter) {
      isAnimating.current = true;
      setSlideIdx(i);
      setShowFooter(false);
      setTimeout(() => { isAnimating.current = false; }, 650);
    } else {
      changeSlide(i);
    }
  };

  const s = SLIDES[slideIdx];
  const cls = anim === 'in' ? 'slide-in' : anim === 'out' ? 'slide-out' : '';

  return (
    // ★ 1. 화면 전체를 fixed로 고정해서 스크롤바 자체를 아예 없앱니다.
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: 'var(--bg)' }}>
      
      {/* ★ 2. 전체 래퍼: showFooter가 true면 딱 '푸터 높이(footerHeight)' 만큼만 전체를 끌어올립니다. */}
      <div 
        style={{
          width: '100%',
          transform: showFooter ? `translateY(-${footerHeight}px)` : 'translateY(0)',
          transition: 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'transform'
        }}
      >
        
        {/* 슬라이드 영역 (항상 100vh 유지) */}
        <section className="home-root" style={{ height: '100dvh' }}>
          <div className="home-vline" />
          
          {s.showImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/mouse.png" alt="mo mascot" className={'home-mascot-img ' + cls} />
          )}
          
          <div className={'home-bgnumber ' + cls}>{String(slideIdx + 1).padStart(2, '0')}</div>
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

          {slideIdx === 0 && !showFooter && (
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
                className={'home-dot' + (i === slideIdx ? ' on' : '')}
                style={{ height: i === slideIdx ? 28 : 8 }}
                onClick={() => handleDotClick(i)}
                aria-label={'Slide ' + (i + 1)}
              />
            ))}
          </div>
        </section>

        {/* 푸터 영역 (슬라이드 바로 밑에 붙어있음) */}
        <section ref={footerRef}>
          <Footer />
        </section>

      </div>
    </div>
  )
}