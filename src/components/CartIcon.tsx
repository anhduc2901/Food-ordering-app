"use client"
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const CartIcon = () => {
  // Giỏ hàng
  const { totalItems } = useCartStore()

  // tải lại dữ liệu giỏ hàng từ localStorage 
  // dữ liệu giỏ hàng sẽ được sao chép từ localStorage vào trạng thái của store (ngay khi bật lên)
  // useEffect(() => {
  //   useCartStore.persist.rehydrate()
  // }, []);

  const { data: session, status } = useSession();



  return (
    // Nếu là admin thì chuyển đến "/add" sau khi click
    <Link href={session?.user.isAdmin ? "/add" : "/cart"} className="flex items-center gap-4">

      <div className='relative w-8 h-8 md:w-5 md:h-5'>
        <Image src="/cart.png" fill alt='' />
      </div>

      <div>
        {/* Admin thì hiện chức năng add , user thì xem đc giỏ hàng */}
        {session?.user.isAdmin ?
          (
            <button className="p-1 bg-red-500 text-white rounded-md">Add product</button>
          ) : (
            // totalItems : biến hiển thị số lượng sp
            <span>Cart ({totalItems})</span>
          )
        }
      </div>

    </Link>
  )
}

export default CartIcon