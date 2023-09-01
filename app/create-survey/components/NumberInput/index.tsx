'use client'

import { useState } from 'react'
import { QuestionUiProps } from '../props'

const NumberInput = ({ setAnswer }: QuestionUiProps) => {
  const [selectedNumber, setSelectedNumber] = useState<number>(0)

  return (
    <div className='flex flex-col'>
      <input
        onChange={(e) => setSelectedNumber(parseInt(e.target.value))}
        value={selectedNumber}
        className='user-input'
        type='number'
        placeholder='Ex: 37'
      ></input>
      <button
        onClick={(e) => {
          e.preventDefault()
          setAnswer && setAnswer(selectedNumber)
        }}
        className='btn-primary'
        style={{ width: '70px' }}
      >
        Next
      </button>
    </div>
  )
}

export default NumberInput
