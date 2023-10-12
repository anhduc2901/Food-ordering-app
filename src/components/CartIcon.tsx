import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CartIcon = () => {
  return (
    <div>
        <Link href="/cart" className="flex items-center gap-4">
            <div className='relative w-8 h-8 md:w-5 md:h-5'>
                <Image src="/cart.png" fill alt=''/>
            </div>
            <span>Cart (3)</span>
        </Link>
    </div>
  )
}

export default CartIcon