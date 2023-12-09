"use client"
import { ProductType } from '@/type/types';
import { useCartStore } from '@/utils/store';
import { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import React from 'react'

// export type ProductType = {
//     id: string;
//     title: string;
//     desc?: string;
//     img?: string;
//     price: number;
//     options?: { title: string; additionalPrice: number }[];
// };


const Price = ({ product }: { product: ProductType }) => {
    // tổng giá tiền
    const [total, setTotal] = useState(product.price)
    // số lượng
    const [quantity, setQuantity] = useState(1)
    // Chọn size bánh
    const [selected, setSelected] = useState(0)

    // from '@/utils/store';   addToCart func
    const { addToCart } = useCartStore()

    // tải lại dữ liệu giỏ hàng từ localStorage 
    useEffect(() => {
        useCartStore.persist.rehydrate()
    }, [])


    // Set lại giá trị khi thay đổi size
    useEffect(() => {
        if (product.options?.length) {
            // Tính toán giá dựa theo options
            setTotal(quantity * (+product.price + +product.options[selected].additionalPrice));
        }

    }, [quantity, selected, product]);


    // Thêm sp vào giỏ hàng
    const handleAddToCart = () => {
        addToCart(
            {
                id: product.id,
                title: product.title,
                img: product.img,
                price: total,
                // spread ... để kiểm tra xem product.options có tồn tại và có độ dài lớn hơn 0 hay không
                ...(product.options?.length && { optionTitle: product.options[selected].title }),
                quantity: quantity,
            }
        )
        toast.success("The product added to the cart!")
    }

    return (

        <div className='flex flex-col gap-4' >
            {/* PRICE */}
            <h2 className='text-2xl font-bold'>${total}</h2>

            {/* OPTIONS CONTAINER : Small ,medium, large */}
            <div className="flex gap-4">
                {/* Nếu có options thì mới show sản phẩm (options default là small) */}
                {product.options?.length && product.options?.map((option, index) => (
                    <button key={option.title} className='min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md'
                        // Nếu đc select thì ... , k thì ...
                        style={{
                            background: selected === index ? "rgb(248 113 113)" : "white",
                            color: selected === index ? "white" : "rgb(248 113 113)"
                        }}
                        onClick={() => setSelected(index)}
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
                        {/* Giới hạn số lượng 1->9 */}
                        <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>{'<'}</button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(quantity < 9 ? quantity + 1 : 9)}>{'>'}</button>

                    </div>
                </div>

                {/* CART BUTTON */}
                <div>
                    {/* addToCart: (item: CartItemType) */}
                    {/* export type CartItemType = {
                        id: string;
                        title: string;
                        img?: string;
                        price: number;
                        optionTitle?: string;
                        quantity: number;

                    }; */}
                    {/* Thêm 1 sp vào giỏ hàng */}
                    <button className='uppercase w-40 bg-red-500 text-white p-3 ring-1 ring-red-500' onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Price

