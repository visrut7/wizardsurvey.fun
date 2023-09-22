import React from 'react'
import { IoRemoveCircleSharp } from 'react-icons/io5'
import { Answer } from '@/app/models/types'
import { BsPlusCircleFill } from 'react-icons/bs'

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
          <label className='flex items-center gap-x-6 px-8'>
            <input
              onChange={() => {
                setAnswer && setAnswer(choice)
              }}
              type='radio'
              value={choice}
              name='choice'
              id={`${choice}-${idx}`}
              className='radio radio-info w-8 h-8'
            />
            <input
              type='text'
              value={choice}
              onChange={(e) => handleChoiceChange(idx, e.target.value)}
              className='input w-full'
            />
          </label>
          {choices.length > 2 && !setAnswer && (
            <button type='button' onClick={() => handleRemoveChoice(idx)} className='button'>
              <IoRemoveCircleSharp className='text-red-500 text-2xl' />
            </button>
          )}
        </div>
      ))}
      {choices.length < 6 && !setAnswer && (
        <button type='button' onClick={handleAddChoice} className='btn btn-success w-36 m-auto'>
          <BsPlusCircleFill className='text-xl' />
          Add
        </button>
      )}
    </div>
  )
}

export default SingleChoice
