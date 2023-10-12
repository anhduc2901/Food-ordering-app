import { pizzas } from '@/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CartPage = () => {
  return (
    <div className="flex flex-col text-red-500 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row">

        {/* PRODUCTS CONTAINER */}
        <div className='xl:px-40 lg:px-20 h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-1/2  2xl:w-1/2  lg:text-xl lg:gap-6 '>

              {/* SINGLE IMTEM */}
              <div className='flex items-center justify-between mb-4 '>
                    <Image className='' src='/temporary/p1.png' alt='' width={70} height={70}/>
                    <div className=''>
                      <h1 className='uppercase text-xl font-bold  '>Silician</h1>
                      <span>Large</span>
                    </div>
                    <h2 className='font-bold'>$79.90</h2>
                    <span className='cursor-pointer'>X</span>
              </div>
              {/* SINGLE IMTEM */}
              <div className='flex items-center justify-between mb-4 '>
                    <Image className='' src='/temporary/p1.png' alt='' width={70} height={70}/>
                    <div className=''>
                      <h1 className='uppercase text-xl font-bold  '>Silician</h1>
                      <span>Large</span>
                    </div>
                    <h2 className='font-bold'>$79.90</h2>
                    <span className='cursor-pointer'>X</span>
              </div>
              {/* SINGLE IMTEM */}
              <div className='flex items-center justify-between mb-4 '>
                    <Image className='' src='/temporary/p1.png' alt='' width={70} height={70}/>
                    <div className=''>
                      <h1 className='uppercase text-xl font-bold  '>Silician</h1>
                      <span>Large</span>
                    </div>
                    <h2 className='font-bold'>$79.90</h2>
                    <span className='cursor-pointer'>X</span>
              </div>
          
        </div>

        {/* PAYMENT CONTAINER */}
        <div className='xl:px-40 lg:px-20 h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/2 2xl:w-1/2 lg:text-xl lg:gap-6 '>

          <div className='flex justify-between'>
            <span className=''>Subtotal (3 items)</span>
            <span className=''>$81.70</span>
          </div>
          <div className='flex justify-between'>
            <span className=''>Service Cost (3 items)</span>
            <span className=''>$0.70</span>
          </div>
          <div className='flex justify-between'>
            <span className=''>Delivery Cost (3 items)</span>
            <span className=' text-green-500'>FREE</span>
          </div>
          <hr className='my-2'/>
          <div className='flex justify-between'>
            <span className=''>Total (INCL,VAT)</span>
            <span className='font-bold'>$81.70</span>
          </div>
          <button className='bg-red-500 text-white p-3 rounded-md w-1/2 self-end'>CHECKOUT</button>

        </div>
    </div>
  )
}

export default CartPage