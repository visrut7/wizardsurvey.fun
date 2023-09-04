'use client'
import { useEffect } from 'react'
import AnswerForm from './components/AnswerForm'
import LoadingSpinner from '@/app/components/LoadingSpinner'
import { useAppContext } from '@/app/context/AppContext'

export default function FillSurvey({ params }: { params: { id: string } }) {
  const { setName, setQuestions, questions, name, currentQuestionNumber } = useAppContext()

  const getSurvey = async () => {
    const res = await fetch(`/survey/${params.id}/api`)
    const data = await res.json()
    setName(data.surveyName)
    setQuestions([...data.questions])
  }

  useEffect(() => {
    getSurvey()
  }, [])

  if (questions.length === 0) return <LoadingSpinner />

  return (
    <main className='flex flex-col h-screen text-white'>
      <nav className='flex justify-center p-3'>
        <h1 className='text-2xl'>{name}</h1>
      </nav>
      <section className='flex flex-col justify-between items-center h-full'>
        <AnswerForm />
      </section>
    </main>
  )
}
