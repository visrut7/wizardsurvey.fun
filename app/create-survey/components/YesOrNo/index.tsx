import React, { useState } from 'react'
import { Answer } from '@/app/models/types'

type YesOrNoProps = {
  choices: string[]
  setAnswer?: (answer: Answer) => void
}

const YesOrNo = ({ choices, setAnswer }: YesOrNoProps) => {
  const [disableAllRadios, setDisableAllRadios] = useState(false)

  const handleChoiceChange = (choice: string) => {
    setAnswer && setDisableAllRadios(true)
    setAnswer && setAnswer(choice)
  }

  return (
    <div className='flex flex-row justify-center items-center mt-5 gap-x-12'>
      {choices.map((choice, idx) => (
        <div key={idx} className='flex justify-between'>
          <label className='flex items-center gap-x-2 capitalize'>
            <input
              type='radio'
              value={choice}
              name='choice'
              id={`${choice}-${idx}`}
              className='radio radio-info w-8 h-8'
              onChange={() => handleChoiceChange(choice)}
              disabled={disableAllRadios}
            />
            <span>{choice}</span>
          </label>
        </div>
      ))}
    </div>
  )
}

export default YesOrNo
