import React from 'react'
import ChessBoard from '@/components/ChessBoard'

function PassnPlay() {
  return (
    <div className='w-full min-h-screen'>
        <h1>PassnPlay</h1>
        <div className='w-full flex justify-center'><ChessBoard /></div>
    </div>
  )
}

export default PassnPlay