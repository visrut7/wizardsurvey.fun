'use client'

import { useState } from 'react'
import { QuestionUiProps } from '../props'

const TextInput = ({ setAnswer }: QuestionUiProps) => {
  const [disabledNext, setDisabledNext] = useState<boolean>(false)
  const [text, setText] = useState<string>('')

  return (
    <div className='flex flex-col'>
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
        className='btn btn-primary self-end my-5'
        style={{ width: '70px' }}
        disabled={disabledNext}
      >
        Next
      </button>
    </div>
  )
}

export default TextInput
