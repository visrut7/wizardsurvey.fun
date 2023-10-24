import { AppProvider } from '@/app/context/AppContext'
import { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id

  const survey = await fetch(`http://localhost:3000/survey/${id}/api`).then((res) => res.json())

  const previousImages = (await parent).openGraph?.images || []

  return {
    openGraph: {
      title: `WizardSurvey.fun: ${survey.surveyName}`,
      description: `A Survey on ${survey.surveyName} for ${survey.questions.length} questions.`,
      images: [`/survey/${id}/og?title=${survey.surveyName}`, ...previousImages]
    },
    twitter: {
      title: `WizardSurvey.fun: ${survey.surveyName}`,
      description: `A Survey on ${survey.surveyName} for ${survey.questions.length} questions.`,
      images: [`/survey/${id}/og?title=${survey.surveyName}`, ...previousImages]
    }
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>
}
