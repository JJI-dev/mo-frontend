import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { WORK_ITEMS } from '@/lib/data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import WorkDetailClient from './WorkDetailClient'

export function generateStaticParams() {
  return WORK_ITEMS.map((item) => ({ id: item.id }))
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const item = WORK_ITEMS.find((w) => w.id === id)
  if (!item) notFound()

  const filePath = path.join(process.cwd(), 'content/work', `${id}.mdx`)
  
  let fileContent = ''
  let mdxSource = ''

  try {
    fileContent = fs.readFileSync(filePath, 'utf8')
    const { content } = matter(fileContent)
    mdxSource = content
  } catch (err) {
    // ✨ 파일이 없을 때 보여줄 예쁜 에러 화면
    return (
      <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', padding: '0 var(--px)', background: '#000', color: '#fff' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '12px' }}>프로젝트 상세 내용이 없습니다.</h2>
        <p style={{ color: '#666', fontSize: '15px', marginBottom: '32px' }}>
          현재 준비 중이거나 경로가 잘못되었습니다.<br />
          <code style={{ fontSize: '12px', background: '#111', padding: '4px 8px', borderRadius: '6px', marginTop: '12px', display: 'inline-block' }}>
            content/work/{id}.mdx
          </code>
        </p>
        
        {/* ✨ styles.backBtn 대신 일반 클래스 "detail-back-btn" 사용 */}
        <Link href="/work" className="detail-back-btn">
          목록으로 돌아가기
        </Link>
      </div>
    )
  }

  // ✨ MDX 태그 커스텀 (스타일은 인라인이나 global 클래스로)
  const components = {
    h2: (props: any) => <h2 style={{ fontSize: '32px', fontWeight: '700', marginTop: '60px', marginBottom: '24px' }} {...props} />,
    p: (props: any) => <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }} {...props} />,
  }

  return (
    <WorkDetailClient item={item}>
      <MDXRemote source={mdxSource} components={components} />
    </WorkDetailClient>
  )
}