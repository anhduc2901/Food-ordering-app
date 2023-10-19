"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useState } from 'react'
const data = [
  {
    id: 1,
    title: "always fresh & always crispy & always hot",
    image: "/slide1.png",
  },
  {
    id: 2,
    title: "we deliver your order wherever you are in NY",
    image: "/slide2.png",
  },
  {
    id: 3,
    title: "the best pizza to share with your family",
    image: "/slide3.jpg",
  },
];

const Slider = () => {
  // biến lưu index để chuyển slide
  const [currentSlide, setCurrentSlide] = useState(0)


  // Chỉ cần gọi 1 lần khi mount lần đầu vào website
  useEffect(() => {
    const interVal = setInterval(
      // +1 mỗi 2s , nếu = 2 thì set lại giá trị = 0 
      () => setCurrentSlide((prev) => (prev === (data.length - 1) ? 0 : (prev + 1))),
      2000
    );

    // Clean up : interVal trước khi gọi lần 2
    return () => clearInterval(interVal);
  }, []);



  return (
    <div className=" flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50">

      {/* TEXT CONTAINER */}
      <div className="flex-1 flex items-center justify-center flex-col gap-8 text-red-500 font-bold ">
        <h1 className=" md:text-6xl xl:text-7xl text-5xl text-center uppercase lg:p-4">
          {data[currentSlide].title}
        </h1>
        <button className='bg-red-500 text-white px-8 py-4'>Order now</button>
      </div>


      {/* IMAGE CONTAINER */}
      <div className="flex-1 w-full relative ">
        <Image src={data[currentSlide].image} alt="" fill className="object-cover" />
      </div>

    </div>
  )
}

export default Slider