// API FETCH PRODUCT THEO ID
import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// GET SINGLE PRODUCT
// GET nhận hai tham số: req và params
export const GET = async (
    // req là một đối tượng NextRequest chứa thông tin về yêu cầu.
    req: NextRequest,
    // params là một đối tượng chứa các tham số của yêu cầu ( ID của sản phẩm.)
    { params }: { params: { id: string } }
) => {
    const { id } = params;

    try {
        // Tìm product trùng vs id truyền vào
        const product = await prisma.product.findUnique({
            where: {
                id: id,
            },
        });

        return new NextResponse(JSON.stringify(product), { status: 200 });
    } catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }),
            { status: 500 }
        );
    }
};


// DELETE SINGLE PRODUCT (tương tự cái trên)
export const DELETE = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    const { id } = params;


    // Lấy session  chứa tt của user
    const session = await getAuthSession();
    // xác nhận phải là admin k 
    if (session?.user.isAdmin) {
        try {
            // delete by id
            await prisma.product.delete({
                where: {
                    id: id,
                },
            });

            return new NextResponse(JSON.stringify("Product has been deleted!"), {
                status: 200,
            });
        } catch (err) {
            console.log(err);
            return new NextResponse(
                JSON.stringify({ message: "Something went wrong!" }),
                { status: 500 }
            );
        }
    }
    return new NextResponse(JSON.stringify({ message: "You are not allowed!" }), {
        status: 403,
    });
};

