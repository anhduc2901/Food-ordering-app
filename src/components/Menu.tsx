// Set Client component or không tạo đc html event
"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import CartIcon from './CartIcon'
import UserLinks from './UserLinks'
import { signOut, useSession } from 'next-auth/react'

// Các thành phần trong menu
const links = [
    { id: 1, title: 'Home Page', url: "/" },
    { id: 2, title: 'Menu', url: "/menu" },
    { id: 3, title: 'Working Hours', url: "/" },
    { id: 4, title: 'Contact', url: "/" },
]

// Menu trên Mobile
const Menu = () => {
    // biến open để đóng mở menu , default là đóng (mobile)
    const [open, setOpen] = useState(false)
    // Thể hiện có user đăng nhập hay không
    const [user, setUser] = useState(false)

    const handleBothEvent = () => {
        setOpen(false)
        setUser(true)
    }

    return (
        <div>
            {/* Nếu đang đóng thì show img open , mở thì show img close */}
            {!open ?
                (  // true
                    // Click zô thì set open thành true
                    <Image src='/open.png' alt='Open img' width={20} height={20} onClick={() => setOpen(true)} />
                ) : (       // false
                    <Image src='/close.png' alt='Close img' width={20} height={20} onClick={() => setOpen(false)} />
                )
            }

            {/*  Noti : 12 + nav : 12 => h : 24 (6rem)
             h-[calc(100vh-6rem)] tránh overflow  */}
            {/* Chỉ hiện các links khi open = true */}
            {open &&
                <div className="bg-red-500 text-white absolute left-0 top-24 h-[calc(100vh-6rem)] flex items-center justify-center text-3xl flex-col gap-8 w-full z-10">
                    {/* Các thành phần trong menu */}
                    {links.map(item => (
                        // Đóng menu khi click vào 
                        <Link href={item.url} key={item.id} onClick={() => setOpen(false)}>
                            {item.title}

                        </Link>
                    ))}
                    {/* Không có user show Login , có user thì show orders  */}
                    {!user ? (
                        //  Click vào thì đóng menu và  Login -> Orders
                        <Link href="/login" onClick={handleBothEvent}>Login</Link>

                    ) : (
                        <Link href="/orders" onClick={() => setOpen(false)}>Orders</Link>
                        // <div className='flex flex-col'>
                        //     <UserLinks />
                        // </div>
                    )
                    }
                    {/* Set open = false để đóng menu */}
                    <Link href="/cart" onClick={() => setOpen(false)}>
                        <CartIcon />
                    </Link>
                </div>
            }

        </div >
    )
}

export default Menu