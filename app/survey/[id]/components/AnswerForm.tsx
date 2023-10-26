'use client'
import { Answer, QuestionType } from '@/app/models/types'
import Rating10 from '@/app/create-survey/components/Rating10'
import FeedbackEmoji from '@/app/create-survey/components/Emojis'
import { useAppContext } from '@/app/context/AppContext'
import SingleChoice from '@/app/create-survey/components/SingleChoice'
import MultiChoice from '@/app/create-survey/components/MultiChoice'
import FiveStarRating from '@/app/create-survey/components/FiveStartRating'

import './style.css'
import NumberInput from '@/app/create-survey/components/NumberInput'
import TextInput from '@/app/create-survey/components/TextInput'
import YesOrNo from '@/app/create-survey/components/YesOrNo'

const AnswerForm = ({ submitSurvey }: { submitSurvey: Function }) => {
  const { questions, answers, setAnswers, currentQuestionNumber, setCurrentQuestionNumber } = useAppContext()

  const moveToNextQuestion = () => {
    setTimeout(() => {
      setCurrentQuestionNumber(currentQuestionNumber + 1)
    }, 500)
  }

  const setAnswer = (answer: Answer) => {
    const updated_answers = [...answers, answer]
    setAnswers([...updated_answers])
    if (currentQuestionNumber === questions.length - 1) {
      submitSurvey(updated_answers)
    }
    moveToNextQuestion()
  }

  return (
    <form className='flex flex-col justify-center items-center gap-y-10 fixed'>
      {questions.map((question, index) => (
        <main
          key={index}
          className={`absolute transform h-1/2 flex flex-col justify-center gap-y-10 ${
            index === currentQuestionNumber
              ? 'enter-center'
              : index < currentQuestionNumber
              ? 'exit-left'
              : 'start-right'
          }`}
        >
          <h1 className='text-center sm:text-xl md:text-3xl'>{question.question}</h1>
          {question.type === QuestionType.RATE_10 && <Rating10 setAnswer={setAnswer} />}
          {question.type === QuestionType.STAR_5 && <FiveStarRating setAnswer={setAnswer} />}
          {question.type === QuestionType.SINGLECHOICE && (
            <SingleChoice choices={question.choices!} setChoices={() => {}} setAnswer={setAnswer} />
          )}
          {question.type === QuestionType.MULTICHOICE && (
            <MultiChoice choices={question.choices!} setChoices={() => {}} setAnswer={setAnswer} />
          )}
          {question.type === QuestionType.EMOJIS && <FeedbackEmoji setAnswer={setAnswer} />}
          {question.type === QuestionType.NUMBER && <NumberInput setAnswer={setAnswer} />}
          {question.type === QuestionType.TEXT && <TextInput setAnswer={setAnswer} />}
          {question.type === QuestionType.YES_OR_NO && <YesOrNo choices={['yes', 'no']} setAnswer={setAnswer} />}
        </main>
      ))}
    </form>
  )
}

export default AnswerForm
