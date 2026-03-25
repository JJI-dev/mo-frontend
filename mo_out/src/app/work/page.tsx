'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { WORK_ITEMS, type WorkCategory } from '@/lib/data'
import Footer from '@/components/layout/Footer'

const CATS: WorkCategory[] = ['All', 'Web', 'Mobile', 'Admin', 'Design']

const SEARCH_ICON = (
  <svg width="18" height="18" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.7">
      <rect x="16.3662" y="13.6699" width="16.4033" height="4.94253" rx="2.47127" transform="rotate(39.6266 16.3662 13.6699)" fill="#ECECEC"/>
      <circle cx="13.2138" cy="13.2138" r="11.7138" fill="black" stroke="#ECECEC" strokeWidth="3"/>
    </g>
  </svg>
)

/* ─── Spotlight ─────────────────────────────────── */
function Spotlight({ open, onClose, query, setQuery }: {
  open: boolean; onClose: () => void; query: string; setQuery: (q: string) => void
}) {
  const router = useRouter()
  const results = WORK_ITEMS.filter(
    w => w.title.toLowerCase().includes(query.toLowerCase()) ||
         w.category.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  if (!open) return null

  return (
    <div className="spotlight-overlay" onClick={onClose}>
      <div className="spotlight-box" onClick={e => e.stopPropagation()}>
        <div className="spotlight-input-row">
          {SEARCH_ICON}
          <input
            autoFocus
            className="spotlight-input"
            placeholder="프로젝트 검색..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <div className="spotlight-results">
          {query === '' ? (
            <p className="spotlight-empty">검색어를 입력하세요</p>
          ) : results.length === 0 ? (
            <p className="spotlight-empty">결과가 없습니다</p>
          ) : results.map(item => (
            <button
              key={item.id}
              className="spotlight-result-item"
              onClick={() => { router.push(`/work/${item.id}`); onClose() }}
            >
              <div className="spotlight-result-thumb" />
              <div>
                <p className="spotlight-result-title">{item.title}</p>
                <p className="spotlight-result-cat">{item.category}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Main ──────────────────────────────────────── */
function WorkContent() {
  const params   = useSearchParams()
  const router   = useRouter()
  const raw      = (params.get('category') ?? 'All') as WorkCategory
  const initCat  = CATS.includes(raw) ? raw : 'All'

  const [cat,         setCat]         = useState<WorkCategory>(initCat)
  const [searchOpen,  setSearchOpen]  = useState(false)
  const [query,       setQuery]       = useState('')

  useEffect(() => {
    const c = (params.get('category') ?? 'All') as WorkCategory
    if (CATS.includes(c)) setCat(c)
  }, [params])

  const openSearch = useCallback(() => { setQuery(''); setSearchOpen(true) }, [])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openSearch() }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [openSearch])

  const filtered = cat === 'All' ? WORK_ITEMS : WORK_ITEMS.filter(w => w.category === cat)

  const handleCat = (c: WorkCategory) => {
    setCat(c)
    router.push(`/work?category=${c}`, { scroll: false })
  }

  return (
    <div className="work-root">
      <Spotlight open={searchOpen} onClose={() => setSearchOpen(false)} query={query} setQuery={setQuery} />

      {/* Mobile category strip — vertical left aligned */}
      <div className="work-mob-cats" id="work-mob-strip">
        {CATS.map(c => (
          <button key={c} className={`work-mob-cat${c === cat ? ' active' : ''}`} onClick={() => handleCat(c)}>{c}</button>
        ))}
        <button className="work-mob-cat" onClick={openSearch} style={{ marginTop: 4, display: 'flex', alignItems: 'center' }}>
          {SEARCH_ICON}
        </button>
      </div>

      {/* Sidebar */}
      <aside className="work-sidebar">
        {CATS.map(c => (
          <button key={c} className={`work-cat-btn${c === cat ? ' active' : ''}`} onClick={() => handleCat(c)}>
            {c}
          </button>
        ))}
        <button className="work-search-btn" onClick={openSearch} title="⌘K">
          {SEARCH_ICON}
        </button>
      </aside>

      {/* Grid */}
      <div className="work-grid">
        {filtered.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13, letterSpacing: '-0.02em', gridColumn: '1/-1', textAlign: 'center', paddingTop: 80 }}>
            프로젝트가 없습니다
          </p>
        ) : filtered.map(item => (
          <Link key={item.id} href={`/work/${item.id}`} className="work-item">
            <div className="work-thumb">
              <div className="work-thumb-inner" />
            </div>
            <div>
              <p className="work-title">{item.title}</p>
              <p className="work-cat-label">{item.category}</p>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .work-root    { flex-direction: row; padding-top: 80px; }
          .work-sidebar { display: none; }
          .work-mob-cats { display: flex !important; }
          .work-grid    { padding: 0 var(--px); flex: 1; }
        }
      `}</style>
    </div>
  )
}

export default function WorkPage() {
  return (
    <>
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#000' }} />}>
        <WorkContent />
      </Suspense>
      <Footer />
    </>
  )
}
