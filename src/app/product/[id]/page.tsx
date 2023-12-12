import DeleteButton from '@/components/DeleteButton'
import Price from '@/components/Price'
import { ProductType } from '@/type/types'
import Image from 'next/image'
import React from 'react'


const getData = async (id: string) => {
  // lấy id sản phẩm từ url
  const temp = id?.split('.html') ?? [];
  const temp1 = temp[0]?.split('-') ?? []; 
  id = temp1[temp1.length-1]
  // fetch data dùng api (api fetch data từ csdl theo id)
  const response = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store"
  })

  if (!response.ok) {
    throw new Error("Failed !")
  }
  return response.json();
}

type TypeHaveID = {
  params: { id: string }
}

const SingleProduct = async ({ params }: TypeHaveID) => {
  // get data by id
  const singleProduct: ProductType = await getData(params.id)


  return (
    <div className="p-4 lg:px-20 xl:px-40 flex h-screen flex-col justify-around text-red-500 md:flex-row md:gap-8 items-center relative">

      {/* IMAGE COINTANER */}
      {singleProduct.img && (
        <div className="relative w-full h-1/2 md:h-[70%] ">
          <Image
            src={singleProduct.img}
            alt=''
            fill
            className="object-contain"
          />
        </div>
      )}

      {/* TEXT CONTAINER */}
      <div className="h-1/2 flex flex-col gap-4 md:h-[70%]  justify-center md:gap-6 xl:gap-8">
        <h1 className='text-3xl font-bold uppercase xl:text-5xl'>{singleProduct.title}</h1>
        <p>{singleProduct.desc}</p>
        {/* Truyền tham số cho component Price để nó xử lí */}
        <Price product={singleProduct} />
      </div>

      <DeleteButton id={singleProduct.id} />
    </div>
  )
}

export default SingleProduct