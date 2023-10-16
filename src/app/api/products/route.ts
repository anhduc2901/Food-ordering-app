import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";


// FETCH PRODUCTS
// NextRequest : đối tượng chứa thông tin về yêu cầu HTTP mà ta sẽ xử lý
export const GET = async (req: NextRequest) => {
    // tạo đối tượng url từ request 
    // searchParams chứa các tham số truy vấn (query parameters) có trong URL.

    const { searchParams } = new URL(req.url)

    // Giá trị của tham số truy vấn có "cat"
    const cat = searchParams.get('cat')


    try {
        // Nếu cat tồn tại thì trả về sp có "catSlug là cat" vd : // localhost:3000/api/products?cat="pizzas" / ?cat=${category}
        //  cat không tồn tại,trả về sản phẩm có isFeatured = true
        const products = await prisma.product.findMany({
            where: {
                ...(cat ? { catSlug: cat } : { isFeatured: true })
            }
        });
        return new NextResponse(JSON.stringify(products), { status: 200 });

    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong" }),
            { status: 500 }
        );

    }
}

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const product = await prisma.product.create({
            data: body,
        });
        return new NextResponse(JSON.stringify(product), { status: 201 });
    } catch (err) {
        console.log(err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }),
            { status: 500 }
        );
    }
};

