import { featuredProducts } from '@/data'
import Image from 'next/image'
import React from 'react'

const Featured = () => {
  return (
    <div className='w-screen overflow-x-scroll text-red-500'>

        {/* WRAPPER */}
        <div className='w-max flex'>

            { featuredProducts.map((item) => (
                
                // {/* SINGLE ITEM */}

                <div key={item.id} className='m:h-[75vh] xl:h-[90vh] md:w-[50vw] xl:w-[33vw] w-screen h-[65vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300'>
                    {/* Nếu có thì hiển thị */}
                    {item.img && 
                    // {/* IMAGE CONTAINER */}
                    <div className='relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500'>
                        <Image src={item.img} alt='' fill className='object-contain'/>
                    </div>}

                    {/* TEXT CONTAINER */}
                    <div className='flex-1 flex flex-col gap-2 items-center text-center  justify-center'>
                        <h1 className='2xl:text-3xl lg:text-2xl text-xl font-bold uppercase'>{item.title}</h1>
                        <p className='p-2 2xl:p-8'>{item.desc}</p>
                        <span className='text-xl font-bold'>${item.price}</span>
                        <button className="bg-red-500 text-white p-2 rounded-md">Add to cart</button>
                    </div>
                </div>
                )
            )}

        </div>
    </div>
  )
}

export default Featured