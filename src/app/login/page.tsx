import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LoginPage = () => {
  return (
    <div className="p-4 flex items-center justify-center h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)]">
          {/* BOX */}
          <div className="h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70vh] md:w-full lg:w-[80%] 2xl:w-1/2">
                  {/* IMAGE CONTAINER */}
                  <div className="relative h-1/3 w-full md:h-full md:w-1/2">
                      <Image src='/loginBg.png' alt='' fill className='object-cover'/>
                  </div>

                  {/* FORM CONTAINER */}
                  <div className='p-10 flex flex-col gap-8 md:w-1/2 xl:text-2xl'>
                        <h1 className='font-bold text-xl'> Welcome </h1>

                        <p>Log in to  your accont or create a new one using social button</p>

                        <button className="flex gap-4 p-4 ring-1 ring-orange-100 rounded-md">
                              <Image src='/google.png' alt='' width={20} height={20} className="object-contain"/>
                              <span>Sign in with Google</span>
                        </button>

                        <button className="flex gap-4 p-4 ring-1 ring-blue-100 rounded-md">
                              <Image src='/facebook.png' alt='' width={20} height={20} className="object-contain"/>
                              <span>Sign in with Facebook</span>
                        </button>
                        <p className='text-sm '>
                          Have a problem? <Link className="underline" href='/'>Contact us</Link>
                        </p>
                  </div>

           </div>
    </div>
  )
}

export default LoginPage