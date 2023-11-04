'use client'

import { useState } from 'react'
import { QuestionUiProps } from '../props'

const NumberInput = ({ setAnswer }: QuestionUiProps) => {
  const [disabledNext, setDisabledNext] = useState<boolean>(false)
  const [selectedNumber, setSelectedNumber] = useState<number>(0)

  return (
    <div className='flex flex-col'>
      <input
        onChange={(e) => setSelectedNumber(parseInt(e.target.value))}
        value={selectedNumber}
        className='input'
        type='number'
        placeholder='Ex: 37'
      ></input>
      <button
        onClick={(e) => {
          e.preventDefault()
          setDisabledNext(true)
          setAnswer && setAnswer(selectedNumber)
        }}
        className='next-button self-end'
        disabled={disabledNext}
      >
        Next
      </button>
    </div>
  )
}

export default NumberInput
