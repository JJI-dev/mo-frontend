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

  },
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    category: 'Web',
    client: '커머스코',
    date: '2024.01',
    type: 'Web / Development',
    intro: '최신 트렌드의 이커머스 플랫폼을 구축했습니다.',

  },
]
