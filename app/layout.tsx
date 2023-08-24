import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wizard Survey',
  description: 'A survey taker powered by OpenAI',
  openGraph: {
    type: 'website',
    siteName: 'Wizard Survey',
    title: 'Create Survey using OpenAI',
    description: 'A survey taker powered by OpenAI',
    locale: 'en_US',
    url: 'https://wizardsurvey.fun/',
    images: [
      {
        url: 'https://wizardsurvey.fun/og',
        width: 1200,
        height: 630,
        alt: 'Wizard Survey',
      },
    ],
  },
  twitter: {
    site: '@wizard_survey',
    card: 'summary_large_image',
    description: 'A survey taker powered by OpenAI',
    title: 'Create Survey using OpenAI',
    siteId: 'wizard_survey',
    images: [
      {
        url: 'https://wizardsurvey.fun/og',
        width: 1200,
        height: 630,
        alt: 'Wizard Survey',
      },
    ],
    creatorId: 'visrut06815925',
    creator: '@visrut06815925',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden`}>{children}</body>
    </html>
  )
}
