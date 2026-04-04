import type { Metadata } from 'next'
import './globals.css'
import CursorAnimation from '@/components/ui/CursorAnimation'
import Header from '@/components/layout/Header'
import LoadingScreen from '@/components/LoadingScreen'

export const metadata: Metadata = {
  title: 'Studio | JJI-MO',
  description: '웹, 모바일, 디자인 — 디지털 경험을 만드는 크리에이티브 스튜디오',
  alternates: {
    canonical: 'https://mo.jji.kr', 
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <LoadingScreen />
        <CursorAnimation />
        <Header />
        <main style={{ minHeight: '100vh' }}>{children}</main>
      </body>
    </html>
  )
}
