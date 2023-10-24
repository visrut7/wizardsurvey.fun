import { AppProvider } from '@/app/context/AppContext'
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
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
