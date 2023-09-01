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
          <span
            key={index}
            className={`star ${rating && rating > index ? 'filled' : ''}`}
            onClick={() => handleStarClick(index)}
          >
            <BsStarFill
              className={`text-5xl cursor-pointer ${rating && rating > index ? 'text-yellow-500' : 'text-white'}`}
            />
          </span>
        ))}
      </div>
    </div>
  )
}

export default FiveStarRating
