import React from 'react'

const OrdersPage = () => {
  return (
    <div className="p-4 lg:px-20 xl:p-40">
        <table className='w-full border-separate border-spacing-3'>
            <thead>
                <tr className="text-left">
                    <th className="hidden md:block">Order ID</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th className="hidden md:block">Products</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr className='text-sm md:text-base  bg-red-50'>
                    <td className="hidden md:block py-6 px-1">3215215131</td>
                    <td className='py-6 px-1 '>10.11.2023</td>
                    <td className='py-6 px-1 '>7.90</td>
                    <td className="py-6 px-1 hidden md:block">Big Burger Menu (2), Veggies (3)</td>
                    <td className='py-6 px-1 '>Coming in hot (approx. 10mins)...</td>
                </tr>
                <tr className='text-sm md:text-base odd:bg-gray-200'>
                    <td className="hidden md:block py-6 px-1">3215215131</td>
                    <td className='py-6 px-1 '>10.11.2023</td>
                    <td className='py-6 px-1 '>7.90</td>
                    <td className="py-6 px-1 hidden md:block">Big Burger Menu (2), Veggies (3)</td>
                    <td className='py-6 px-1 '>Coming in hot (approx. 10mins)...</td>
                </tr>
                <tr className='text-sm md:text-base odd:bg-gray-200'>
                    <td className="hidden md:block py-6 px-1">3215215131</td>
                    <td className='py-6 px-1 '>10.11.2023</td>
                    <td className='py-6 px-1 '>7.90</td>
                    <td className="py-6 px-1 hidden md:block">Big Burger Menu (2), Veggies (3)</td>
                    <td className='py-6 px-1 '>Coming in hot (approx. 10mins)...</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default OrdersPage