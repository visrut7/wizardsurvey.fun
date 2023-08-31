'use client'

import { Dispatch, createContext, useContext, useState } from 'react'
import { Answer, Question, QuestionType } from '../models/types'

type SurveyContext = {
  name: string
  setName: Dispatch<React.SetStateAction<string>>
  currentQuestionNumber: number
  setCurrentQuestionNumber: Dispatch<React.SetStateAction<number>>
  questions: Question[]
  setQuestions: Dispatch<React.SetStateAction<Question[]>>
  answers: Answer[]
  setAnswers: Dispatch<React.SetStateAction<Answer[]>>
  setCurrentQuestion: Function
  addNewQuestion: Function
  isQuestionDecided: Function
}

const AppContext = createContext<SurveyContext>({
  name: 'Survey App',
  setName: () => {},
  currentQuestionNumber: 0,
  setCurrentQuestionNumber: () => {},
  questions: [{ question: '', type: QuestionType.NOT_DECIDED }],
  setQuestions: () => {},
  answers: [],
  setAnswers: () => {},
  setCurrentQuestion: () => {},
  addNewQuestion: () => {},
  isQuestionDecided: () => {}
})

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState('Survey App')
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([{ question: '', type: QuestionType.NOT_DECIDED }])
  const [answers, setAnswers] = useState<Answer[]>([])

  const setCurrentQuestion = (question: Question) => {
    questions[currentQuestionNumber] = question
    setQuestions([...questions])
  }

  const addNewQuestion = (question: Question) => {
    setQuestions([...questions, question])
  }

  const isQuestionDecided = (question: Question) => {
    return question.question !== '' && question.type !== QuestionType.NOT_DECIDED
  }

  const value = {
    name,
    setName,
    currentQuestionNumber,
    setCurrentQuestionNumber,
    questions,
    setQuestions,
    answers,
    setAnswers,
    setCurrentQuestion,
    addNewQuestion,
    isQuestionDecided
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext<SurveyContext>(AppContext)
