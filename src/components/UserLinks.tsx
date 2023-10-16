// tạo component client side để tránh ảnh hưởng đến navbar của server side
"use client"

import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

const UserLinks = () => {
    const { status } = useSession()
    return (
        <div>
            {/* Có user thì hiện orders */}
            {(status === 'authenticated') ?
                (
                    <div>
                        <Link href="/orders">Orders</Link>
                        <span className='ml-4 cursor-pointer' onClick={() => signOut()}>LogOut</span>
                    </div>
                ) : (
                    <Link href="/login">Login</Link>
                )}
        </div>
    )
}

export default UserLinks

