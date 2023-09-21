'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useAppContext } from '@/app/context/AppContext'

const GenerateWithAi = () => {
  const router = useRouter()

  const { setQuestions } = useAppContext()

  const [surveyDescription, setSurveyDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const generateUsingAi = async (event: React.FormEvent) => {
    event.preventDefault()

    setLoading(true)

    const response = await fetch('https://13.53.158.170/', {
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
        let [question, type] = question_and_type.split(',')

        question = question.trim().replaceAll('"', '')
        type = type.trim()

        if (type === 'multichoice' || type === 'singlechoice') {
          const choices_string = question_and_type.split(',')[2]
          const choices = choices_string.split('|')
          return {
            question: question,
            type: type,
            choices: choices.slice(1).map((choice) => choice.trim())
          }
        }
        return { question: question, type: type }
      })

    setQuestions([...surveyQuestions])

    setLoading(true)

    router.push('/create-survey')
  }

  return (
    <form className='h-screen flex flex-col items-center justify-center gap-y-4' onSubmit={generateUsingAi}>
      <label htmlFor='survey-description' className='text-2xl'>
        Enter survey topic or description
      </label>
      <textarea
        required
        autoFocus
        className='textarea w-96 h-64'
        name='survey-description'
        id='survey-description'
        placeholder="Conducting a market research survey for a new fitness app. We want to understand people's fitness goals, preferred workout routines, and pain points in existing fitness apps. Our target audience is health-conscious individuals aged 18-45, both beginners and experienced fitness enthusiasts. The survey should help us design features that cater to their specific needs and preferences."
        onChange={(e) => setSurveyDescription(e.target.value)}
      />
      <button type='submit' className='btn btn-primary' disabled={loading}>
        {loading && <span className='loading loading-spinner'></span>} Let&apos;s Go
      </button>
    </form>
  )
}

export default GenerateWithAi
