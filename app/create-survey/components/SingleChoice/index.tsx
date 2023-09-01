import React from 'react'
import './style.css'
import { IoRemoveCircleSharp } from 'react-icons/io5'
import { Answer } from '@/app/models/types'

type SingleChoiceProps = {
  choices: string[]
  setChoices: (choices: string[]) => void
  setAnswer?: (answer: Answer) => void
}

const SingleChoice = ({ choices, setChoices, setAnswer }: SingleChoiceProps) => {
  const handleChoiceChange = (index: number, newValue: string) => {
    const updatedChoices = [...choices]
    updatedChoices[index] = newValue
    setChoices(updatedChoices)
  }

  const handleAddChoice = () => {
    if (choices.length < 6) {
      const updatedChoices = [...choices, 'New Choice']
      setChoices(updatedChoices)
    }
  }

  const handleRemoveChoice = (index: number) => {
    if (choices.length > 2) {
      const updatedChoices = choices.filter((_, i) => i !== index)
      setChoices(updatedChoices)
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      {choices.map((choice, idx) => (
        <div key={idx} className='flex w-full justify-between'>
          <label className='flex gap-x-3'>
            <input
              onChange={() => {
                console.log('hi')
                setAnswer && setAnswer(choice)
              }}
              type='radio'
              value={choice}
              name='choice'
              id={`${choice}-${idx}`}
              className='radio-input'
            />
            <input
              type='text'
              value={choice}
              onChange={(e) => handleChoiceChange(idx, e.target.value)}
              className='bg-transparent outline-none'
            />
          </label>
          {choices.length > 2 && (
            <button type='button' onClick={() => handleRemoveChoice(idx)} className='button'>
              <IoRemoveCircleSharp className='text-red-500 text-2xl' />
            </button>
          )}
        </div>
      ))}
      {choices.length < 6 && (
        <button type='button' onClick={handleAddChoice} className='add-button'>
          Add Choice
        </button>
      )}
    </div>
  )
}

export default SingleChoice
