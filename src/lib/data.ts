export type WorkCategory = 'All' | 'Web' | 'Mobile' | 'Admin' | 'Design'

export interface WorkItem {
  id: string
  title: string
  category: Exclude<WorkCategory, 'All'>
  client?: string
  date?: string
  type?: string
  intro?: string
  htmlContent?: string
}

export const WORK_ITEMS: WorkItem[] = [
  {
    id: 'brand-identity-studio',
    title: 'Brand Identity Studio',
    category: 'Design',
    client: '브랜드스튜디오',
    date: '2024.03',
    type: 'Brand Design / Visual Identity',
    intro: '브랜드의 정체성을 재정의하는 프로젝트입니다.',
    htmlContent: `<div style="padding:60px 40px;color:#fff;font-family:'Poppins',sans-serif;">
      <h2 style="font-size:48px;font-weight:800;letter-spacing:-0.04em;margin-bottom:24px;">Brand Identity</h2>
      <p style="color:rgba(255,255,255,0.5);font-size:16px;line-height:1.8;">Full brand identity system including logo, color palette, typography, and usage guidelines.</p>
    </div>`,
  },
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    category: 'Web',
    client: '커머스코',
    date: '2024.01',
    type: 'Web / Development',
    intro: '최신 트렌드의 이커머스 플랫폼을 구축했습니다.',
    htmlContent: `<div style="padding:60px 40px;color:#fff;font-family:'Poppins',sans-serif;">
      <h2 style="font-size:48px;font-weight:800;letter-spacing:-0.04em;margin-bottom:24px;">E-Commerce</h2>
      <p style="color:rgba(255,255,255,0.5);font-size:16px;line-height:1.8;">Full stack e-commerce solution with Next.js, Stripe, and headless CMS.</p>
    </div>`,
  },
  {
    id: 'fitness-app',
    title: 'Fitness App',
    category: 'Mobile',
    client: '핏라이프',
    date: '2023.11',
    type: 'Mobile / iOS / Android',
    intro: '헬스케어와 피트니스를 위한 모바일 앱입니다.',
    htmlContent: `<div style="padding:60px 40px;color:#fff;font-family:'Poppins',sans-serif;">
      <h2 style="font-size:48px;font-weight:800;letter-spacing:-0.04em;margin-bottom:24px;">Fitness App</h2>
      <p style="color:rgba(255,255,255,0.5);font-size:16px;line-height:1.8;">Cross-platform mobile application built with React Native.</p>
    </div>`,
  },
  {
    id: 'admin-dashboard',
    title: 'Admin Dashboard',
    category: 'Admin',
    client: '어드민코',
    date: '2023.09',
    type: 'Admin / Web Development',
    intro: '데이터 중심의 어드민 대시보드 솔루션입니다.',
    htmlContent: `<div style="padding:60px 40px;color:#fff;font-family:'Poppins',sans-serif;">
      <h2 style="font-size:48px;font-weight:800;letter-spacing:-0.04em;margin-bottom:24px;">Admin Dashboard</h2>
      <p style="color:rgba(255,255,255,0.5);font-size:16px;line-height:1.8;">Comprehensive admin solution with real-time analytics.</p>
    </div>`,
  },
  {
    id: 'travel-mobile',
    title: 'Travel Guide App',
    category: 'Mobile',
    client: '트래블',
    date: '2023.08',
    type: 'Mobile / Development',
    intro: '여행자를 위한 스마트 가이드 앱입니다.',
    htmlContent: `<div style="padding:60px 40px;color:#fff;font-family:'Poppins',sans-serif;">
      <h2 style="font-size:48px;font-weight:800;letter-spacing:-0.04em;margin-bottom:24px;">Travel Guide</h2>
      <p style="color:rgba(255,255,255,0.5);font-size:16px;line-height:1.8;">Travel guide application with offline support and personalized recommendations.</p>
    </div>`,
  },
  {
    id: 'design-system',
    title: 'Design System',
    category: 'Design',
    client: '디자인팀',
    date: '2023.06',
    type: 'Design / System',
    intro: '팀 전체를 위한 통합 디자인 시스템입니다.',
    htmlContent: `<div style="padding:60px 40px;color:#fff;font-family:'Poppins',sans-serif;">
      <h2 style="font-size:48px;font-weight:800;letter-spacing:-0.04em;margin-bottom:24px;">Design System</h2>
      <p style="color:rgba(255,255,255,0.5);font-size:16px;line-height:1.8;">Comprehensive design system with component library and documentation.</p>
    </div>`,
  },
]
