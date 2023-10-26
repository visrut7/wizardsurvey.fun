'use client'
import { useCallback, useEffect, useState } from 'react'
import AnswerForm from './components/AnswerForm'
import LoadingSpinner from '@/app/components/LoadingSpinner'
import { useAppContext } from '@/app/context/AppContext'
import { Answer, QuestionType } from '@/app/models/types'
import { StatusCodes } from 'http-status-codes'
import { useRouter, usePathname } from 'next/navigation'

export default function FillSurvey({ params }: { params: { id: string } }) {
  const { setName, setQuestions, questions, name, currentQuestionNumber } = useAppContext()
  const [error, setError] = useState('')
  const router = useRouter()
  const pathname = usePathname()

  const getSurvey = useCallback(async () => {
    const res = await fetch(`/survey/${params.id}/api`)
    const data = await res.json()
    setName(data.surveyName)
    setQuestions([...data.questions])
  }, [params.id, setName, setQuestions])

  const submitSurvey = async (answers: Answer[]) => {
    const res = await fetch(`/survey/${params.id}/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        answers: answers,
        id: params.id
      })
    })
    const data = await res.json()

    if (res.status === StatusCodes.ACCEPTED) {
      router.push(pathname + '/results')
    }

    if (res.status === StatusCodes.UNPROCESSABLE_ENTITY) {
      setError(data.error)
    }
  }

  useEffect(() => {
    getSurvey()
  }, [getSurvey])

  if (questions.length === 0 || questions[0].type == QuestionType.NOT_DECIDED) return <LoadingSpinner />

  return (
    <main className='flex flex-col h-screen text-white'>
      <nav className='flex justify-center p-3'>
        <h1 className='text-2xl'>{name}</h1>
      </nav>
      <section className='flex flex-col justify-center items-center h-full'>
        {!error && <AnswerForm submitSurvey={submitSurvey} />}
        {error && <h1 className='text-3xl text-red-400'>{error}</h1>}
      </section>
      <progress
        className='progress progress-success w-full'
        value={currentQuestionNumber}
        max={questions.length}
      ></progress>
    </main>
  )
}
