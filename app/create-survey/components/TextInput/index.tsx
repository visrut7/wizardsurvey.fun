'use client'

import { useState } from 'react'
import { QuestionUiProps } from '../props'

const TextInput = ({ setAnswer }: QuestionUiProps) => {
  const [text, setText] = useState<string>('')

  return (
    <div className='flex flex-col'>
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        className='user-input'
        type='text'
        placeholder='Your Text'
      ></input>
      <button
        onClick={(e) => {
          e.preventDefault()
          setAnswer && setAnswer(text)
        }}
        className='btn-primary'
        style={{ width: '70px' }}
      >
        Next
      </button>
    </div>
  )
}

export default TextInput
