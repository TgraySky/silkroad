import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GenerationProvider } from '@/context/generation-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Photo Studio',
  description: 'Generate professional photos for various scenarios with one click.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3231991570613413"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={inter.className}>
        <GenerationProvider>{children}</GenerationProvider>
      </body>
    </html>
  )
}
