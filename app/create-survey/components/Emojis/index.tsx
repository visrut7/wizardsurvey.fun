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
        <span
          key={index}
          className={`emoji ${selectedEmoji === emoji ? 'selected' : ''}`}
          onClick={() => handleEmojiClick(emoji)}
        >
          {emoji}
        </span>
      ))}
    </div>
  )
}

export default FeedbackEmoji
