import Link from 'next/link'
import React from 'react'
import Menu from './Menu'
import CartIcon from './CartIcon';
import Image from 'next/image';
import UserLinks from './UserLinks';

const Navbar = () => {

  const user = false;

  return (
    <div className="lg:px-20 xl:px-40 md:h-24 h-12 text-red-500 p-4 flex justify-between items-center border-b-2 border-b-red-500 uppercase">

      {/* Chỉ hiện khi screen size = medium (ipad) */}
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/">Home Page</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/">Contact</Link>
      </div>

      {/* LOGO */}
      <div className="text-xl md:font-bold flex-1 md:text-center">
        <Link href='/'>Massimo</Link>
      </div>

      {/* MOBILE MENU : ẩn khi screen là medium */}
      <div className=" md:hidden">
        <Menu />
      </div>

      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center flex-1 justify-end">
        {/* Icone phone + 113 115 */}
        <div className="md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md pr-6">
          <Image src="/phone.png" alt="" width={20} height={20} />
          <span>113 </span>
        </div>

        {/* Có user thì hiện orders */}
        <UserLinks />

        <Link href="/"><CartIcon /></Link>
      </div>



    </div>
  )
}

export default Navbar