"use client"
import React from 'react'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { OrderType } from '@/type/types'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from 'next/image'
import { toast } from "react-toastify";



const OrdersPage = () => {
    // Phải đăng nhập mới được vào Orders  (client side)
    const { data: session, status } = useSession()
    const router = useRouter()

    // Chuyển hướng về trang chủ nếu chưa đăng nhập
    if (status != "authenticated") {
        router.push('/')
    }

    // truy vấn dữ liệu từ API
    const { isLoading, error, data } = useQuery({
        queryKey: ['orders'],
        queryFn: () =>
            fetch('https://loosely-lasting-zebra.ngrok-free.app/api/orders').then(
                (res) => res.json(),
            ),
    })


    // UPDATE LẠI DATA ĐC FETCH TỪ CSDL KHI ĐƠN HÀNG ĐC CẬP NHẬT 

    // queryClient quản lý tất cả các query và mutation trong ứng dụng (truy cập vào query client.)
    const queryClient = useQueryClient();

    // mutation : được sử dụng để cập nhật dữ liệu trên server.
    const mutation = useMutation({
        // hai tham số: id và status ,  ID của đơn hàng cần cập nhật và status là trạng thái mới của đơn hàng.
        mutationFn: ({ id, status }: { id: string; status: string }) => {
            // gửi một yêu cầu PUT đến URL , chứa một body JSON với thuộc tính status.
            return fetch(`https://loosely-lasting-zebra.ngrok-free.app/api/orders/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(status),
            });
        },
        // PUT thành công
        onSuccess() {
            // xóa tất cả các cache query có key là "orders" , trạng thái của đơn hàng trong ứng dụng luôn được cập nhật
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
    });

    // Chỉnh sửa orders dưới quyền admin
    const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
        e.preventDefault();
        // form là một đối tượng đại diện cho form đã được submit.
        const form = e.target as HTMLFormElement;
        // input là một đối tượng đại diện cho input đầu tiên trong form.
        const input = form.elements[0] as HTMLInputElement;
        // status là trạng thái của đơn hàng cần cập nhật.
        const status = input.value;
        // cập nhật trạng thái của đơn hàng
        mutation.mutate({ id, status });
        toast.success("The order status has been changed!")

    };

    // Chờ load xong mới render data
    if (isLoading || status === "loading") {
        return "Loading ...";
    }

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
                {/* text-sm md:text-base */}
                <tbody>
                    {data && data.map((item: OrderType) => (
                        // status != delivered thì màu đỏ
                        <tr className={` ${item.status !== "delivered" && "bg-red-50"}`} key={item.id}>
                            <td className="hidden md:block py-6 px-1">{item.id}</td>
                            <td className='py-6 px-1 '>{item.createdAt.toString().slice(0, 10)}</td>
                            <td className='py-6 px-1 '>{item.price}</td>
                            {/* item chỉ có 1 phần tử products */}
                            <td className="py-6 px-1 hidden md:block">{item.products[0].title}</td>
                            {/* Nếu là admin thì có button để chỉnh sửa orders*/}
                            {
                                session?.user.isAdmin ? (
                                    <td>
                                        <form className='flex items-center justify-center gap-4' onSubmit={(e) => handleUpdate(e, item.id)}>
                                            <input
                                                placeholder={item.status} className='p-2 ring-1 ring-red-100 rounded-md'
                                            />
                                            <button className='bg-red-400 p-2 rounded-full'>
                                                <Image src='/edit.png' alt='Edit' width={20} height={20}></Image>
                                            </button>
                                        </form>
                                    </td>
                                ) : (
                                    // Nếu là user thì hiện trạng thái của sản phẩm
                                    <td className='py-6 px-1 '>{item.status}</td>
                                )
                            }
                        </tr>
                    ))}

                </tbody>
            </table>
        </div >
    )
}

export default OrdersPage