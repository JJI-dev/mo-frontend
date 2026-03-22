import { WORK_ITEMS } from '@/lib/data'
import { notFound } from 'next/navigation'
import WorkDetailClient from './WorkDetailClient'

export function generateStaticParams() {
  return WORK_ITEMS.map(item => ({ id: item.id }))
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const item = WORK_ITEMS.find(w => w.id === id)
  if (!item) notFound()
  return <WorkDetailClient item={item} />
}
