"use client"
import Image from "next/image";
import React from 'react'
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const DeleteButton = ({ id }: { id: string }) => {
    // Lấy phiên (session hiện tại)
    const { data: session, status } = useSession();
    const router = useRouter();
    // Màn hình loading
    if (status === "loading") {
        return <p>Loading...</p>;
    }
    // Nếu chưa đăng nhập hoặc k phải admin thì k đc dùng chức năng code ở dưới
    if (status === "unauthenticated" || !session?.user.isAdmin) {
        return;
    }

    // xóa một sản phẩm khỏi cơ sở dữ liệu ,nhận tham số id của sản phẩm cần xóa.
    const handleDelete = async () => {
        // gửi yêu cầu DELETE đến API để xóa sản phẩm có ID id
        const res = await fetch(`https://www.italianfastfood.online/api/products/${id}`, {
            method: "DELETE",
        });

        // Kiểm tra trạng thái của phản hồi từ API
        if (res.status === 200) {
            router.push("/menu");
            toast("The product has been deleted!");
        } else {
            const data = await res.json();
            toast.error(data.message);
        }
    };


    return (
        <div>
            <button className="bg-red-400 top-4 right-4 p-2 rounded-full absolute" onClick={handleDelete}>
                <Image src='/delete.png' alt='Delete' width={20} height={20} />
            </button>
        </div>
    )
}

export default DeleteButton