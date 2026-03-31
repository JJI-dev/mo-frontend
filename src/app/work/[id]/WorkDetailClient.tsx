'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { type WorkItem } from '@/lib/data'
import Footer from '@/components/layout/Footer'

export default function WorkDetailClient({ item }: { item: WorkItem }) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeH, setIframeH] = useState(600)

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      // 1. iframe 높이 조정 (제한 없이 측정된 높이 + 40px 여백으로 넉넉하게!)
      if (e.data?.type === 'iframeHeight') {
        setIframeH(Math.max(400, e.data.height + 40))
      }

      // 2. 마우스 이벤트 전달 유지 (커스텀 커서용)
      if (e.data?.type === 'mousemove') {
        const rect = iframeRef.current?.getBoundingClientRect()
        if (!rect) return
        const synth = new MouseEvent('mousemove', {
          bubbles: true,
          clientX: rect.left + e.data.x,
          clientY: rect.top  + e.data.y,
        })
        document.dispatchEvent(synth)
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  const metaRows = [
    { label: 'CLIENT',   value: item.client   },
    { label: 'CATEGORY', value: item.category },
    { label: 'DATE',     value: item.date     },
    { label: 'TYPE',     value: item.type     },
  ].filter(r => r.value)

  const relayScript = `
    document.addEventListener('mousemove', function(e) {
      window.parent.postMessage({ type: 'mousemove', x: e.clientX, y: e.clientY }, '*');
    });
  `

  // ★ 변경됨: document.documentElement.scrollHeight 를 사용하여 훨씬 정확하게 전체 콘텐츠 길이를 측정합니다.
  const iframeDoc = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  *{margin:0;padding:0;box-sizing:border-box;}
  html,body{background:#000;color:#fff;font-family:'Poppins',sans-serif;overflow:hidden;}
</style>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<script>
function sendHeight() {
  var h = document.documentElement.scrollHeight || document.body.scrollHeight;
  window.parent.postMessage({type:'iframeHeight',height:h},'*');
}
window.addEventListener('load', sendHeight);
if(document.body){new ResizeObserver(sendHeight).observe(document.body);}
${relayScript}
</script>
</head>
<body>${item.htmlContent ?? ''}</body>
</html>`

  return (
    <>
      <div className="detail-root page-enter">
        <div style={{ padding: '0 var(--px)' }}>
          <Link href="/work" className="detail-back">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M13 7H1M1 7L7 1M1 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Work
          </Link>
          <h1 className="detail-title">{item.title}</h1>
          <div className="detail-hero">
            {/* Hero image placeholder or actual image can go here */}
          </div>
          <div className="detail-meta">
            {metaRows.map(r => (
              <div key={r.label} className="detail-meta-item">
                <span className="detail-meta-label">{r.label}</span>
                <span className="detail-meta-val">{r.value}</span>
              </div>
            ))}
          </div>
          {item.intro && <p className="detail-intro">{item.intro}</p>}
        </div>

        {item.htmlContent && (
          <div style={{ position: 'relative' }}>
            {/* 오버레이 걷어냄, pointerEvents 허용됨 */}
            <iframe
              ref={iframeRef}
              srcDoc={iframeDoc}
              style={{
                width: '100%',
                height: iframeH,
                border: 'none',
                display: 'block',
              }}
              title={item.title}
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}