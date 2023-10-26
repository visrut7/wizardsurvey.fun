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
    title: `Wizard Survey: ${survey.surveyName}`,
    description: `A Survey on ${survey.surveyName} for ${survey.questions.length} question${
      survey.questions.length > 1 ? 's' : ''
    }.`,
    images: [
      { url: `/survey/${id}/og?title=${survey.surveyName}`, width: 1200, height: 630, alt: 'Wizard Survey' },
      ...previousImages
    ]
  }

  return {
    openGraph: { ...openGraphTags },
    twitter: { ...openGraphTags, card: 'summary_large_image' },
    title: `A survey on ${survey.surveyName} | WizardSurvey.fun`
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>
}
