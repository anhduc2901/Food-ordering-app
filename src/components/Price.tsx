"use client"
import {useEffect, useState} from 'react'
import React from 'react'

type Props = {
    price:number;
    id:number;
    options?: { title: string; additionalPrice: number }[];

}

const Price = ({price,id,options}:Props ) => {
    const [total,setTotal]=useState(price)
    const [quantity,setQuantity]=useState(1)
    const [selected,setSelected]=useState(0)

    // Set lại giá trị khi thay đổi size
    useEffect(() => {
        setTotal( quantity * (options ? price + options[selected].additionalPrice : price) );
    },[quantity,selected,options,price]);

  return (

    <div className='flex flex-col gap-4' >
        {/* PRICE */}
        <h2 className='text-2xl font-bold'>${total.toFixed(2)}</h2>

        {/* OPTIONS CONTAINER : Small ,medium, large */}
        <div className="flex gap-4">
            {options?.map((option,index)=>(
                <button key={option.title} className='min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md'
                    // Nếu đc select thì ... , k thì ...
                    style={{
                        background: selected===index ? "rgb(248 113 113)" : "white",
                        color : selected===index ? "white" : "rgb(248 113 113)"
                    }}
                    onClick={()=>setSelected(index)}
                >
                    {option.title}
                </button>
            ))}
        </div>

        {/* QUANTITY AND ADD BUTTON CONTAINER */}
        <div className='flex justify-center items-center'>

            <div className="flex justify-between w-full p-3 ring-1 ring-red-500">
                {/* QUANTITY */}
                <span>Quantity</span>

                {/* ADD BUTTON */}
                <div className='gap-1 flex items-center'>
                    <button onClick={()=>setQuantity(quantity > 1 ? quantity-1 : 1)}>{'<'}</button>
                    <span>{quantity}</span>
                    <button onClick={()=>setQuantity(quantity < 9 ? quantity+1 : 9)}>{'>'}</button>

                </div>
            </div>

            {/* CART BUTTON */}
            <div>
                <button className='uppercase w-40 bg-red-500 text-white p-3 ring-1 ring-red-500'>Add to Cart</button>
            </div>
        </div>
        
    </div>
  )
}

export default Price