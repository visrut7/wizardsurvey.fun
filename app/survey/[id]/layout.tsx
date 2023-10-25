import { server } from '@/app/config'
import { AppProvider } from '@/app/context/AppContext'
import { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id

  const survey = await fetch(`${server}/survey/${id}/api`).then((res) => res.json())

  const previousImages = (await parent).openGraph?.images || []

  const openGraphTags = {
    title: `WizardSurvey.fun: ${survey.surveyName}`,
    description: `A Survey on ${survey.surveyName} for ${survey.questions.length} questions.`,
    images: [
      { url: `/survey/${id}/og?title=${survey.surveyName}`, width: 1200, height: 630, alt: 'Wizard Survey' },
      ...previousImages
    ]
  }

  return {
    openGraph: { ...openGraphTags },
    twitter: { ...openGraphTags, card: 'summary_large_image' }
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>
}
