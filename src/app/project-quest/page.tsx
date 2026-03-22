'use client'

import { useState } from 'react'
import Footer from '@/components/layout/Footer'

const TYPES     = ['Web', 'Mobile', 'Admin', 'Design', 'Brand', 'Other']
const BUDGETS   = ['~500만원', '500~1000만원', '1000~3000만원', '3000만원+', '미정']
const TIMELINES = ['1개월 이내', '1~3개월', '3~6개월', '6개월+', '미정']

const STEPS = [
  { q: '어떤 프로젝트를 원하시나요?',           hint: '여러 개 선택 가능합니다' },
  { q: '예산 범위는 어떻게 되나요?',            hint: '대략적인 예산을 선택해 주세요' },
  { q: '원하시는 타임라인이 있나요?',           hint: '예상 일정을 선택해 주세요' },
  { q: '연락처와 프로젝트 설명을 입력해 주세요', hint: '자세한 내용일수록 더 빠르게 답변드릴 수 있습니다' },
]

export default function ProjectQuestPage() {
  const [step,      setStep]      = useState(0)
  const [types,     setTypes]     = useState<string[]>([])
  const [budget,    setBudget]    = useState('')
  const [timeline,  setTimeline]  = useState('')
  const [name,      setName]      = useState('')
  const [email,     setEmail]     = useState('')
  const [desc,      setDesc]      = useState('')
  const [done,      setDone]      = useState(false)

  if (done) {
    return (
      <>
        <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%', margin: '0 auto 24px',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12L10 17L19 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.04em', color: '#fff', marginBottom: 12 }}>감사합니다!</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', letterSpacing: '-0.02em' }}>빠른 시일 내에 연락드리겠습니다.</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const toggleType = (t: string) =>
    setTypes(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t])

  const progress = ((step + 1) / STEPS.length) * 100

  return (
    <>
    <div className="quest-root page-enter">
      {/* top progress bar */}
      <div className="quest-progress-bar">
        <div className="quest-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="quest-inner">
        {/* step indicators */}
        <div className="quest-steps">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className="quest-step-bar"
              style={{ background: i <= step ? '#fff' : 'rgba(255,255,255,0.15)' }}
            />
          ))}
        </div>

        <p className="quest-eyebrow">Project Quest — {step + 1} / {STEPS.length}</p>
        <h1 className="quest-q">{STEPS[step].q}</h1>
        <p className="quest-hint">{STEPS[step].hint}</p>

        {/* Step 0 — chips */}
        {step === 0 && (
          <div className="quest-chips">
            {TYPES.map(t => (
              <button
                key={t}
                className={`quest-chip${types.includes(t) ? ' selected' : ''}`}
                onClick={() => toggleType(t)}
              >{t}</button>
            ))}
          </div>
        )}

        {/* Step 1 — budget */}
        {step === 1 && (
          <div className="quest-options">
            {BUDGETS.map(b => (
              <button
                key={b}
                className={`quest-option${budget === b ? ' selected' : ''}`}
                onClick={() => setBudget(b)}
              >
                {b}
                {budget === b && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7L6 11L12 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Step 2 — timeline */}
        {step === 2 && (
          <div className="quest-options">
            {TIMELINES.map(t => (
              <button
                key={t}
                className={`quest-option${timeline === t ? ' selected' : ''}`}
                onClick={() => setTimeline(t)}
              >
                {t}
                {timeline === t && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7L6 11L12 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Step 3 — contact */}
        {step === 3 && (
          <div className="quest-fields">
            {[
              { label: '이름', val: name, set: setName, ph: '홍길동',            type: 'text'  },
              { label: '이메일', val: email, set: setEmail, ph: 'hello@example.com', type: 'email' },
            ].map(f => (
              <div key={f.label}>
                <p className="quest-field-label">{f.label}</p>
                <input
                  className="quest-field-input"
                  type={f.type}
                  value={f.val}
                  onChange={e => f.set(e.target.value)}
                  placeholder={f.ph}
                />
              </div>
            ))}
            <div>
              <p className="quest-field-label">프로젝트 설명</p>
              <textarea
                className="quest-field-textarea"
                rows={4}
                value={desc}
                onChange={e => setDesc(e.target.value)}
                placeholder="프로젝트에 대해 자세히 알려주세요..."
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="quest-nav">
          {step > 0 ? (
            <button className="quest-btn-prev" onClick={() => setStep(s => s - 1)}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M13 7H1M1 7L7 1M1 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              이전
            </button>
          ) : <div />}

          {step < STEPS.length - 1 ? (
            <button className="quest-btn-next" onClick={() => setStep(s => s + 1)}>
              다음
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <button className="quest-btn-submit" onClick={() => setDone(true)}>
              제출하기
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}
