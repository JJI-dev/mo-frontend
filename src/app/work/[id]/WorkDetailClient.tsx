'use client'

import Link from 'next/link'
import { type WorkItem } from '@/lib/data'
import Footer from '@/components/layout/Footer'

// ✨ children 추가
export default function WorkDetailClient({ 
  item, 
  children 
}: { 
  item: WorkItem, 
  children: React.ReactNode 
}) {
  const metaRows = [
    { label: 'CLIENT',   value: item.client   },
    { label: 'CATEGORY', value: item.category },
    { label: 'DATE',     value: item.date     },
    { label: 'TYPE',     value: item.type     },
  ].filter(r => r.value)

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
            {/* 여기에 프로젝트 대표 이미지를 넣으세요 */}
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

        {/* ✨ iframe 대신 직접 children 렌더링! */}
        <article className="work-content" style={{ padding: '60px var(--px)', color: '#fff' }}>
          {children}
        </article>
      </div>
      <Footer />
    </>
  )
}