import { useSession } from 'next-auth/react';
import React from 'react'
import Hello from './Hello';
import Link from 'next/link';


const Notification = () => {

  return (
    <div className='h-12 bg-red-500 text-white px-4 flex items-center justify-around text-center text-sm md:text-base cursor-pointer'>
      <div className='flex-1'>
        <Hello />
      </div>
      <Link href={`/menu/`} className='flex-1'>
        Order your food now !
      </Link>





    </div>
  )
}

export default Notification