'use client'

import React from 'react'
import KikiAndJiji from '../icons/KikiAndJiji'

import './Spinner.css'

export default function LoadingSpinner() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='spinner'>
        <div className='border'></div>
        <div className='border'></div>
        <div className='border'></div>
        <div className='border'></div>
      </div>
      <div className='image-container'>
        <KikiAndJiji color='white' />
      </div>
    </div>
  )
}
