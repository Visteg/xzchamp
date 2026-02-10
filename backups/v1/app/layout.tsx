import type { Metadata } from 'next'
import './globals.css'
import LoadingScreen from '@/components/LoadingScreen'

export const metadata: Metadata = {
  title: 'EX-DANCE Championship',
  description: 'Танцевальный чемпионат с заботой о танце',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        <LoadingScreen />
        {children}
      </body>
    </html>
  )
}
