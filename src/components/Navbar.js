import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <nav className='h-[8vh] flex gap-2 mb-4'>
      <Link href="/" className='flex items-center gap-2 hover:scale-105 ml-2 mt-2'>
        <Image src="/logo.png" alt="Chess" width={50} height={50} className='rounded-full'/>
        <div className='text-2xl font-serif font-bold'>ChessVerse</div>
      </Link>
    </nav>
  )
}

export default Navbar