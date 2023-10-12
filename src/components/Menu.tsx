// Set Client component or không tạo đc html event
"use client"
import Image from 'next/image'
import Link from 'next/link'
import React,{useState} from 'react'
import CartIcon from './CartIcon'

// Các thành phần trong menu
const links = [
    {id: 1, title: 'Home Page', url: "/"},
    {id: 2, title: 'Menu', url: "/menu"},
    {id: 3, title: 'Working Hours', url: "/"},
    {id: 4, title: 'Contact', url: "/"},
]


const Menu = () => {
    // biến open để đóng mở menu , default là đóng
    const [open,setOpen] = useState(false)
    // Thể hiện có user đăng nhập hay không
    const user = false;

  return (
    <div>
        {/* Nếu đang đóng thì show img open , mở thì show img close */}
        { !open ? (  // true
        // Click zô thì set open thành true
        <Image src='/open.png' alt='Image have some errors' width={20} height={20} onClick={()=>setOpen(true)}/> 
        ) : (       // false
        <Image src='/close.png' alt='Image have some errors' width={20} height={20} onClick={()=>setOpen(false)} /> 
        )
        }

        {/*  Noti : 12 + nav : 12 => h : 24 (6rem)
             h-[calc(100vh-6rem)] tránh overflow  */}
        {/* Chỉ hiện khi open = true */}
        { open && 
        <div className="bg-red-500 text-white absolute left-0 top-24 h-[calc(100vh-6rem)] flex items-center justify-center text-3xl flex-col gap-8 w-full z-10">
            {links.map(item=>(
                <Link href={item.url} key={item.id} onClick={() =>setOpen(false)}>
                    {item.title}
                </Link>
            ))}
        {/* Có user show Login và ngược lại */}
        {!user ? (
        <Link href="/login" onClick={() =>setOpen(false)}>Login</Link> 
        ):(
        <Link href="/orders" onClick={() =>setOpen(false)}>Orders</Link>)
        }
        <Link href="/cart">
            <CartIcon/>
        </Link>
        </div>}

    </div>
  )
}

export default Menu