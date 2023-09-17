'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useAppContext } from '@/app/context/AppContext'

const GenerateWithAi = () => {
  const router = useRouter()

  const { setQuestions } = useAppContext()

  const [surveyDescription, setSurveyDescription] = useState('')

  const generateUsingAi = async (event: React.FormEvent) => {
    event.preventDefault()
    const response = await fetch('ai/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: surveyDescription })
    })
    const { survey }: { survey: string } = await response.json()

    const surveyQuestions: any[] = survey
      .trim()
      .split('\n')
      .map((question_and_type) => {
        const [question, type] = question_and_type.split(',')
        return { question: question.trim(), type: type.trim() }
      })

    setQuestions([...surveyQuestions])
    router.push('/create-survey')
  }

  return (
    <form className='h-screen flex flex-col items-center justify-center gap-y-4' onSubmit={generateUsingAi}>
      <label htmlFor='survey-description' className='text-2xl'>
        Enter survey topic or description
      </label>
      <textarea
        className='textarea w-96 h-64'
        autoFocus
        name='survey-description'
        id='survey-description'
        placeholder="Conducting a market research survey for a new fitness app. We want to understand people's fitness goals, preferred workout routines, and pain points in existing fitness apps. Our target audience is health-conscious individuals aged 18-45, both beginners and experienced fitness enthusiasts. The survey should help us design features that cater to their specific needs and preferences."
        onChange={(e) => setSurveyDescription(e.target.value)}
      />
      <button type='submit' className='btn btn-primary'>
        Let&apos;s Go
      </button>
    </form>
  )
}

export default GenerateWithAi
