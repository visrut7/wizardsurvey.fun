import React, { useState } from 'react'
import './style.css'
import { Answer } from '@/app/models/types'

type YesOrNoProps = {
  choices: string[]
  setAnswer?: (answer: Answer) => void
}

const YesOrNo = ({ choices, setAnswer }: YesOrNoProps) => {
  const [selectedChoice, setSelectedChoice] = useState<string>('')

  const handleChoiceChange = (choice: string) => {
    setSelectedChoice(choice)
    setAnswer && setAnswer(choice)
  }

  return (
    <div className='single-choice-container'>
      {choices.map((choice, idx) => (
        <div key={idx} className='flex justify-between'>
          <label className='flex items-center gap-x-2 capitalize'>
            <input
              type='radio'
              value={choice}
              name='choice'
              id={`${choice}-${idx}`}
              className='radio-input'
              checked={selectedChoice === choice}
              onChange={() => handleChoiceChange(choice)}
            />
            <span>{choice}</span>
          </label>
        </div>
      ))}
    </div>
  )
}

export default YesOrNo
