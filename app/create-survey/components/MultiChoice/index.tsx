import React, { useState } from 'react'
import './style.css'
import { IoRemoveCircleSharp } from 'react-icons/io5'
import { Answer } from '@/app/models/types'
import { BsPlusCircleFill } from 'react-icons/bs'

type MultiChoiceProps = {
  choices: string[]
  setChoices: (choices: string[]) => void
  setAnswer?: (answer: Answer) => void
}

const MultiChoice = ({ choices, setChoices, setAnswer }: MultiChoiceProps) => {
  const [disabledNext, setDisableNext] = useState<boolean>(false)
  const [checkboxStates, setCheckboxStates] = useState<boolean[]>(choices.map(() => false))

  const handleChoiceChange = (index: number, newValue: string) => {
    const updatedChoices = [...choices]
    updatedChoices[index] = newValue
    setChoices(updatedChoices)
  }

  const handleAddChoice = () => {
    if (choices.length < 6) {
      const updatedChoices = [...choices, 'New Choice']
      setChoices(updatedChoices)
      setCheckboxStates([...checkboxStates, false])
    }
  }

  const handleRemoveChoice = (index: number) => {
    if (choices.length > 2) {
      const updatedChoices = choices.filter((_, i) => i !== index)
      setChoices(updatedChoices)
      const updatedCheckboxStates = checkboxStates.filter((_, i) => i !== index)
      setCheckboxStates(updatedCheckboxStates)
    }
  }

  const handleCheckboxChange = (index: number) => {
    const updatedCheckboxStates = [...checkboxStates]
    updatedCheckboxStates[index] = !updatedCheckboxStates[index]
    setCheckboxStates(updatedCheckboxStates)
  }

  return (
    <div className='flex flex-col gap-2'>
      {choices.map((choice, idx) => (
        <div key={idx} className='flex justify-between'>
          <label className='flex items-center px-8 gap-x-6'>
            <input
              type='checkbox'
              checked={checkboxStates[idx]}
              onChange={() => handleCheckboxChange(idx)}
              className='checkbox checkbox-primary checkbox-input'
            />
            <input
              type='text'
              value={choice}
              onChange={(e) => handleChoiceChange(idx, e.target.value)}
              className='input'
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
      <button
        onClick={(e) => {
          e.preventDefault()
          setDisableNext(true)
          setAnswer && setAnswer(choices.filter((_, i) => checkboxStates[i]))
        }}
        className='btn btn-primary ml-auto mr-5'
        style={{ width: '70px' }}
        disabled={disabledNext}
      >
        Next
      </button>
    </div>
  )
}

export default MultiChoice
