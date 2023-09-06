'use client'

import { QuestionType } from '@/app/models/types'

import Rating10 from './Rating10'
import SingleChoice from './SingleChoice'
import MultiChoice from './MultiChoice'
import FiveStarRating from './FiveStartRating'
import FeedbackEmoji from './Emojis'
import YesOrNo from './YesOrNo'
import { useAppContext } from '@/app/context/AppContext'
import NumberInput from './NumberInput'
import TextInput from './TextInput'

const QuestionsSlide = () => {
  const { questions, currentQuestionNumber, setCurrentQuestion } = useAppContext()

  const handleQuestionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === QuestionType.SINGLECHOICE || event.target.value === QuestionType.MULTICHOICE) {
      setCurrentQuestion({ ...questions[currentQuestionNumber], choices: ['choice 1', 'choice 2'] })
    } else {
      setCurrentQuestion({ ...questions[currentQuestionNumber], choices: undefined })
    }

    setCurrentQuestion({ ...questions[currentQuestionNumber], type: event.target.value as QuestionType })
  }

  const handleQuestionTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuestion({ ...questions[currentQuestionNumber], question: event.target.value })
  }

  const setChoices = (choices: string[]) => {
    setCurrentQuestion({ ...questions[currentQuestionNumber], choices })
  }

  return (
    <section className='w-full xl:w-1/2 h-1/4 md:h-1/2 2xl:h-1/2 flex flex-col space-y-5 justify-between'>
      <section className='flex flex-col gap-y-6'>
        <span className='flex'>
          <p className='flex items-end sm:text-sm md:text-3xl lg:text-4xl'>{currentQuestionNumber + 1}.</p>
          <input
            value={questions[currentQuestionNumber].question}
            onChange={handleQuestionTextChange}
            className='text-input sm:text-sm md:text-xl lg:text-2xl'
            type='text'
            name='question'
            id='question'
            placeholder='How would you rate this survey from 1 to 10?'
            autoFocus
            autoComplete='off'
          />
        </span>

        {questions[currentQuestionNumber].type === QuestionType.RATE_10 && <Rating10 />}
        {questions[currentQuestionNumber].type === QuestionType.SINGLECHOICE && (
          <SingleChoice choices={questions[currentQuestionNumber].choices!} setChoices={setChoices} />
        )}
        {questions[currentQuestionNumber].type === QuestionType.MULTICHOICE && (
          <MultiChoice choices={questions[currentQuestionNumber].choices!} setChoices={setChoices} />
        )}
        {questions[currentQuestionNumber].type === QuestionType.STAR_5 && <FiveStarRating />}
        {questions[currentQuestionNumber].type === QuestionType.EMOJIS && <FeedbackEmoji />}
        {questions[currentQuestionNumber].type === QuestionType.NUMBER && <NumberInput />}
        {questions[currentQuestionNumber].type === QuestionType.TEXT && <TextInput />}
        {questions[currentQuestionNumber].type === QuestionType.YES_OR_NO && <YesOrNo choices={['yes', 'no']} />}
      </section>

      <select
        id='question-types'
        value={questions[currentQuestionNumber].type}
        onChange={handleQuestionTypeChange}
        className='select'
      >
        <option disabled value=''>
          Choose a question type
        </option>
        <option value={QuestionType.RATE_10}>Rate from 1 to 10</option>
        <option value={QuestionType.SINGLECHOICE}>Single Choice</option>
        <option value={QuestionType.MULTICHOICE}>Multi Choice</option>
        <option value={QuestionType.STAR_5}>Five ⭐</option>
        <option value={QuestionType.EMOJIS}>Emojis</option>
        <option value={QuestionType.NUMBER}>Number</option>
        <option value={QuestionType.TEXT}>Text</option>
        <option value={QuestionType.YES_OR_NO}>Yes or No</option>
      </select>
    </section>
  )
}

export default QuestionsSlide
