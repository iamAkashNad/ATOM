import React from 'react'

export default function Spinner() {
  return (
    <div className='my-5 text-center'>
        <div className="spinner-grow text-dark my-4" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  )
}
