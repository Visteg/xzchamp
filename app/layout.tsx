import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PRO2XZ CHAMP',
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
        {children}
      </body>
    </html>
  )
}
