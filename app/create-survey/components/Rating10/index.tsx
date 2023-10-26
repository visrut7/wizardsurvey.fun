import React, { useState } from 'react'
import './style.css'
import { Answer } from '@/app/models/types'

type Rating10Props = {
  setAnswer?: (answer: Answer) => void
}

export const Rating10: React.FC<Rating10Props> = ({ setAnswer }) => {
  const [disableAllRadios, setDisableAllRadios] = useState(false)
  const [selectedRating, setSelectedRating] = useState<string | null>(null)

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRating = event.target.value
    setSelectedRating(newRating)
    setAnswer && setDisableAllRadios(true)
    setAnswer && setAnswer(newRating) // Set the answer when a rating is selected
  }

  return (
    <div className='rating-scale-container'>
      {Array.from({ length: 10 }, (_, i) => i + 1).map((ratingValue) => (
        <div key={ratingValue} className='flex flex-col items-center gap-y-3'>
          <input
            type='radio'
            name={`rating`}
            id={`rating-${ratingValue}`}
            value={ratingValue.toString()}
            className='rating-input'
            checked={selectedRating === ratingValue.toString()}
            onChange={handleRatingChange}
            disabled={disableAllRadios}
          />
          <label htmlFor={`rating-${ratingValue}`} className='rating-circle'>
            {/* Empty circle */}
          </label>
          <span className='text-xl'>{ratingValue}</span>
        </div>
      ))}
    </div>
  )
}

export default Rating10
