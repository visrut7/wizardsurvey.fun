import React, { useState } from 'react'
import './style.css'
import { QuestionUiProps } from '../props'

const FeedbackEmoji = ({ setAnswer }: QuestionUiProps) => {
  const emojis = ['😢', '😐', '😊']
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)

  const handleEmojiClick = (emoji: string) => {
    setSelectedEmoji(emoji)
    setAnswer && setAnswer(emoji)
  }

  return (
    <div className='feedback-emoji'>
      {emojis.map((emoji, index) => (
        <button
          key={index}
          className={`emoji ${selectedEmoji === emoji ? 'selected' : ''}`}
          onClick={() => handleEmojiClick(emoji)}
        >
          {emoji}
        </button>
      ))}
    </div>
  )
}

export default FeedbackEmoji
