import React, { useState } from 'react'
import { BsStarFill } from 'react-icons/bs'
import { QuestionUiProps } from '../props'

const FiveStarRating = ({ setAnswer }: QuestionUiProps) => {
  const [rating, setRating] = useState<number>(0)

  const handleStarClick = (starIndex: number) => {
    if (rating === starIndex + 1) {
      setRating(0)
    } else {
      setRating(starIndex + 1)
    }
    setAnswer && setAnswer(starIndex + 1)
  }

  return (
    <div className='container flex justify-center w-full'>
      <div className='star-rating flex gap-x-5'>
        {Array.from({ length: 5 }).map((_, index) => (
          <button
            key={index}
            className={`star ${rating && rating > index ? 'filled' : ''}`}
            onClick={(event) => {
              event.preventDefault()
              handleStarClick(index)
            }}
          >
            <BsStarFill
              className={`text-5xl cursor-pointer ${rating && rating > index ? 'text-orange-400' : 'text-white'}`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default FiveStarRating
