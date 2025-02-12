import type { Metadata } from 'next'
import { Geist_Mono } from 'next/font/google'

import './globals.css'

const geistMono = Geist_Mono({
  variable: '--font-text',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Ship BA Hackathon',
  description: 'Primera Hackathon de Buenos Aires enfocada en Shippear',
  openGraph: {
    images: [
      {
        url: '/ship-ba.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ship BA Hackathon',
    description: 'Primera Hackathon de Buenos Aires enfocada en Shippear',
    images: ['/ship-ba.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable}  antialiased dark`}>
        {children}
      </body>
    </html>
  )
}
