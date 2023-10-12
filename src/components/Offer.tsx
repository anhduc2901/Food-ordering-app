import Image from 'next/image'
import React from 'react'
import CountDown from './CountDown'

const Offer = () => {
  return (
    <div className="md:h-[70vh] bg-black w-full h-screen flex flex-col md:flex-row md:justify-between md:bg-[url('/offerBg.png')]">

        {/* TEXT CONTAINER */}
        <div className="flex-1 flex text-white  text-center justify-center items-center flex-col gap-8 p-6">

            <h1 className="text-5xl font-bold xl:text-6xl">Delicious Burger & French Fry</h1>
            <p className="xl:text-xl">Progressively simplify effective e-toilers and process-centric methods of empowerment. Quickly potificate parallel.</p>
            <CountDown/>
            <button className="bg-red-500 text-white rounded-md py-3 px-6">Order now</button>
        </div>
        
         {/* IMAGE CONTAINER */}
        <div className="flex-1 relative w-full md:h-full">
            <Image src="/offerProduct.png" alt='Error' fill className="object-contain"/>
        </div>

    </div>
  )
}

export default Offer