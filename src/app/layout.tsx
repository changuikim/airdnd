import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './reset.css'
import './index.css'
import './App.css'
import Layout from '@/components/common/layout/Layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airdnd',
  description: 'Airbnb clone project',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}