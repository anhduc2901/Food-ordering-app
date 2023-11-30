"use client"
import { pizzas } from '@/data'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useCartStore } from '@/utils/store'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


const CartPage = () => {
  // from '@/utils/store'
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore()

  // tải lại dữ liệu giỏ hàng từ localStorage 

  // dữ liệu giỏ hàng sẽ được sao chép từ localStorage vào trạng thái của store (ngay khi bật lên)
  useEffect(() => {
    useCartStore.persist.rehydrate()
  }, [])


  // Xử lý phiên
  const { data: session, status } = useSession();
  // Chuyển hướng
  const router = useRouter();
  if (!session || status != "authenticated") {
    router.push("/login");
  }

  const handleCheckout = async () => {
    if (!session) {
      router.push("/login");
    } else {
      // Lấy orders của user trên CSDL
      try {

        const res = await fetch("http://localhost:3000/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // useCartStore
            price: totalPrice,
            products,
            // default
            status: "Not Paid!",
            // session
            userMail: session.user.email,

          }),
        });
        const data = await res.json()
        // router.push(`/pay/${data.id}`)
        toast.success("The order has been submitted !")
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="flex flex-col text-red-500 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row">

      {/* PRODUCTS CONTAINER */}
      <div className='xl:px-40 lg:px-20 h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:h-full lg:w-1/2  2xl:w-1/2  lg:text-xl lg:gap-6 '>

        {/* SINGLE ITEM */}
        {/* Duyệt mảng và in ra thông tin các sp trong cart */}
        {products.map((item) => (

          <div className='flex items-center justify-between mb-4 ' key={item.id}>
            {/* Nếu có img thì hiển thị */}
            {item.img && <Image className='' src={item.img} alt='' width={70} height={70} />}
            <div className=''>
              <h1 className='uppercase text-xl font-bold  '>{item.title} x {item.quantity}</h1>
              <span>{item.optionTitle}</span>
            </div>
            <h2 className='font-bold'>${item.price}</h2>
            {/* Xóa product khỏi cart */}
            <span className='cursor-pointer' onClick={() => removeFromCart(item)} >X</span>
          </div>
        ))
        }

      </div>

      {/* PAYMENT CONTAINER */}
      <div className='xl:px-40 lg:px-20 h-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/2 2xl:w-1/2 lg:text-xl lg:gap-6 '>

        <div className='flex justify-between'>
          <span className=''>Subtotal ({totalItems} items)</span>
          <span className=''>${totalPrice}</span>
        </div>
        <div className='flex justify-between'>
          <span className=''>Service Cost ({totalItems} items)</span>
          <span className=''>$0.00</span>
        </div>
        <div className='flex justify-between'>
          <span className=''>Delivery Cost ({totalItems} items)</span>
          <span className=' text-green-500'>FREE</span>
        </div>
        <hr className='my-2' />
        <div className='flex justify-between'>
          <span className=''>Total (INCL,VAT)</span>
          <span className='font-bold'>${totalPrice}</span>
        </div>
        <button className='bg-red-500 text-white p-3 rounded-md w-1/2 self-end'
          onClick={handleCheckout}
        >CHECKOUT</button>

      </div>
    </div>
  )
}

export default CartPage