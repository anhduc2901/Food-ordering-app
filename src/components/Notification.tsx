import { useSession } from 'next-auth/react';
import React from 'react'
import Hello from './Hello';


const Notification = () => {

  return (
    <div className='h-12 bg-red-500 text-white px-4 flex items-center justify-around text-center text-sm md:text-base cursor-pointer'>
      <div className='flex-1'>
        <Hello />
      </div>
      <div className='flex-1'>
        Free delivery for all orders over $50. Order your food now !
      </div>




    </div>
  )
}

export default Notification