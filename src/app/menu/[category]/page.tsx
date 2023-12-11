import { ProductType } from '@/type/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const getData = async (category: string) => {
  //  truy vấn dùng api : có cat => trả về sp có Cartslug = giá trị của cat
  const response = await fetch(`http://localhost:3000/api/products?cat=${category}`, {
    cache: "no-store"
  })

  if (!response.ok) {
    throw new Error("Failed !")
  }
  return response.json();
}

type props = {
  params: { category: string }
}

const CategoryPage = async ({ params }: props) => {
  const products: ProductType[] = await getData(params.category)

  return (
    <div className="flex text-red-500 flex-wrap">
      {products.map((item) => (
        <Link href={`/product/${convertSlugUrl(item.title)}-${item.id}.html`} key={item.id}
          className='even:bg-fuchsia-50 w-full h-[60vh] border-r-2 border-b-2 group border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between'
        >
          {/* IMAGE CONTAINER */}
          {item.img && (
            <div className='relative h-[80%] '>
              <Image src={item.img} alt='' fill className='object-contain' />
            </div>
          )}
          {/* TEXT */}
          <div className='flex justify-between items-center font-bold '>
            <h1 className='uppercase text-2xl p-2'>{item.title}</h1>
            <h2 className='group-hover:hidden text-xl'>${item.price}</h2>
            <button className='group-hover:block hidden  uppercase bg-red-500 text-white p-2 rounded-md'>Add to cart</button>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CategoryPage