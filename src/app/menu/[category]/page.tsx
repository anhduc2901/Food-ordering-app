import { pizzas } from '@/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CategoryPage = () => {
  return (
    <div className="flex text-red-500 flex-wrap">
      {pizzas.map(pizza=>(
        <Link href={`/product/${pizza.id}`}key={pizza.id}
        className='even:bg-fuchsia-50 w-full h-[60vh] border-r-2 border-b-2 group border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between'
        >
          {/* IMAGE CONTAINER */}
          {pizza.img && (
            <div className='relative h-[80%] '>
              <Image src={pizza.img} alt='' fill className='object-contain'/>
            </div>
          ) }
          {/* TEXT */}
          <div className='flex justify-between items-center font-bold '>
            <h1 className='uppercase text-2xl p-2'>{pizza.title}</h1>
            <h2 className='group-hover:hidden text-xl'>${pizza.price}</h2>
            <button className='group-hover:block hidden  uppercase bg-red-500 text-white p-2 rounded-md'>Add to cart</button>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CategoryPage