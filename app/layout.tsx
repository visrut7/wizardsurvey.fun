import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const openGraphTags = {
  title: 'Create Survey using OpenAI',
  images: [
    {
      url: '/og',
      width: 1200,
      height: 630,
      alt: 'Wizard Survey'
    }
  ],
  description: 'A survey taker powered by OpenAI'
}

export const metadata: Metadata = {
  title: 'Wizard Survey',
  description: 'A survey taker powered by OpenAI',
  openGraph: {
    ...openGraphTags,
    type: 'website',
    siteName: 'Wizard Survey',
    locale: 'en_US',
    url: 'https://wizardsurvey.fun/'
  },
  twitter: {
    ...openGraphTags,
    site: '@wizard_survey',
    card: 'summary_large_image',
    siteId: 'wizard_survey',
    creatorId: 'visrut06815925',
    creator: '@visrut06815925'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} overflow-hidden`}>{children}</body>
    </html>
  )
}
