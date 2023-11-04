'use client'

import { useState } from 'react'
import { QuestionUiProps } from '../props'

const TextInput = ({ setAnswer }: QuestionUiProps) => {
  const [disabledNext, setDisabledNext] = useState<boolean>(false)
  const [text, setText] = useState<string>('')

  return (
    <div className='flex flex-col mx-2'>
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        className='input'
        type='text'
        placeholder='Your Text'
      ></input>
      <button
        onClick={(e) => {
          e.preventDefault()
          setDisabledNext(true)
          setAnswer && setAnswer(text)
        }}
        className='next-button self-end'
        disabled={disabledNext}
      >
        Next
      </button>
    </div>
  )
}

export default TextInput
