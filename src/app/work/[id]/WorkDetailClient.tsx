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
      if (e.data?.type === 'iframeHeight') setIframeH(e.data.height)
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
window.addEventListener('load',()=>{window.parent.postMessage({type:'iframeHeight',height:document.body.scrollHeight},'*')});
new ResizeObserver(()=>{window.parent.postMessage({type:'iframeHeight',height:document.body.scrollHeight},'*')}).observe(document.body);
</script>
</head>
<body>${item.htmlContent ?? ''}</body>
</html>`

  return (
    <>
      <div className="detail-root page-enter">
        <div style={{ padding: '0 48px' }}>
          <Link href="/work" className="detail-back">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M13 7H1M1 7L7 1M1 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Work
          </Link>
          <h1 className="detail-title">{item.title}</h1>
          <div className="detail-hero" />
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
            {/*
              iframe 위에 항상 투명 오버레이를 올려서
              마우스 이벤트가 iframe 내부로 빠지지 않게 막음.
              → 커서 애니메이션이 끊기는 현상 방지.
              pointer-events: none 이 아닌 auto 로 두어야
              오버레이가 실제로 이벤트를 막음.
            */}
            <div style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              cursor: 'none',
            }} />
            <iframe
              ref={iframeRef}
              srcDoc={iframeDoc}
              style={{
                width: '100%',
                height: iframeH,
                border: 'none',
                display: 'block',
                pointerEvents: 'none',
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