import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";


// FETCH ORDERS
// NextRequest : đối tượng chứa thông tin về yêu cầu HTTP mà ta sẽ xử lý
export const GET = async (req: NextRequest) => {

    const session = await getAuthSession();

    // Kiểm tra đăng nhập hay chưa
    if (session) {
        // Nếu là user bthg thì lấy data theo email , admin thì lấy hết data luôn
        try {
            // user là admin : lấy tất cả data
            if (session.user.isAdmin) {
                const orders = await prisma.order.findMany()
                return new NextResponse(JSON.stringify(orders), { status: 200 });

            }
            // k thì fetch data theo email của user
            const orders = await prisma.order.findMany({
                where: {
                    userMail: session.user.email!
                }
            })
            return new NextResponse(JSON.stringify(orders), { status: 200 });


        } catch (error) {
            console.log(error);
            return new NextResponse(
                JSON.stringify({ message: "Something went wrong" }),
                { status: 500 }
            );

        }
    }
    else {
        return new NextResponse(
            JSON.stringify({ message: "You are not authenticated !!" }),
            { status: 401 }
        );
    }
}

// xử lý các yêu cầu HTTP POST.
// CREATE ORDER
export const POST = async (req: NextRequest) => {
    // lấy thông tin phiên đăng nhập của người dùng
    const session = await getAuthSession();

    // kiểm tra xem người dùng đã đăng nhập hay chưa
    if (session) {
        try {

            // lấy dữ liệu JSON từ yêu cầu của người dùng. Dữ liệu JSON này chứa thông tin của đơn hàng mới.
            const body = await req.json();

            // tạo một đơn hàng mới trong CSDL ,  Dữ liệu của đơn hàng mới được lấy từ đối tượng body.
            const order = await prisma.order.create({
                data: body,
            });
            return new NextResponse(JSON.stringify(order), { status: 201 });
        } catch (err) {
            console.log(err);
            return new NextResponse(
                JSON.stringify({ message: "Something went wrong!" }),
                { status: 500 }
            );
        }
        // chưa đăng nhập
    } else {
        return new NextResponse(
            JSON.stringify({ message: "You are not authenticated!" }),
            { status: 401 }
        );
    }
};
