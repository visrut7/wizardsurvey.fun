'use client'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import QuestionsSlide from './components/QuestionSlide'

import './style.css'
import { Question, QuestionType } from '../models/types'
import { useAppContext } from '../context/AppContext'

export default function CreateSurvey() {
  const emptyQuestion = { question: '', type: QuestionType.NOT_DECIDED }
  const {
    addNewQuestion,
    isQuestionDecided,
    questions,
    currentQuestionNumber,
    setCurrentQuestionNumber,
    name,
    setName
  } = useAppContext()

  const goLeft = () => {
    if (currentQuestionNumber > 0) {
      setCurrentQuestionNumber(currentQuestionNumber - 1)
    }
  }

  const goRight = () => {
    if (!isQuestionDecided(questions[currentQuestionNumber])) {
      return
    }

    if (currentQuestionNumber === questions.length - 1) {
      addNewQuestion(emptyQuestion)
    }
    setCurrentQuestionNumber(currentQuestionNumber + 1)
  }

  const getValidQuestions = (questions: Question[]) => questions.filter((question) => isQuestionDecided(question))

  const submitSurvey = async () => {
    if (!isQuestionDecided(questions[currentQuestionNumber])) {
      return
    }

    const validQuestions = getValidQuestions(questions)

    const res = await fetch('create-survey/api', {
      method: 'POST',
      body: JSON.stringify({
        surveyName: name,
        questions: [...validQuestions]
      })
    })
    const data = await res.json()
    console.log(data)
  }

  const editSurveyName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  return (
    <main className='flex flex-col h-screen'>
      <nav className='flex justify-center p-3'>
        <input type='text' className='text-2xl bg-transparent outline-none text-center' value={name} onChange={editSurveyName} data-testid="survey-name-input" />
      </nav>
      <section className='flex justify-between items-center h-full'>
        <button
          className={`text-6xl w-1/12 flex justify-center ${currentQuestionNumber === 0 && 'btn-hide'}`}
          onClick={goLeft}
        >
          <BsChevronCompactLeft />
        </button>
        <QuestionsSlide />
        <button className='text-6xl w-1/12 flex justify-center' onClick={goRight}>
          <BsChevronCompactRight />
        </button>
      </section>
      <footer className='flex justify-end p-4'>
        <button className='btn-primary' onClick={submitSurvey}>
          Finish
        </button>
      </footer>
    </main>
  )
}