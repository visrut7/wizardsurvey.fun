'use client'

import React, { useEffect, useState } from 'react'

type ToastProps = {
  message: string
  duration: number
  onClose: () => void
}

export default function Toast({ message, duration, onClose }: ToastProps) {
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    setShowToast(true)

    setTimeout(() => {
      setShowToast(false)
      onClose()
    }, duration)
  }, [duration, onClose])

  return (
    showToast && (
      <div className='fixed flex gap-x-5 top-3.5 left-1/2 transform -translate-x-1/2 w-3/4 bg-red-500 bg-opacity-70 text-white py-2 px-4 rounded shadow-lg transition-opacity duration-300 opacity-100 hover:opacity-75'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='stroke-current shrink-0 h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        <span>{message}</span>
      </div>
    )
  )
}
