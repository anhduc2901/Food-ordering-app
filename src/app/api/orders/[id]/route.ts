import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";


// CHANGE THE STATUS OF AN ORDER

//  xử lý các yêu cầu HTTP PUT (thay đổi trạng thái) : (UPDATE LẠI DATA ĐC FETCH TỪ CSDL KHI ĐƠN HÀNG ĐC CẬP NHẬT)
export const PUT = async (
  req: NextRequest,
  // đối tượng params để lấy id của đơn hàng cần thay đổi trạng thái.
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    //  lấy dữ liệu JSON từ yêu cầu của người dùng , chứa trạng thái mới của đơn hàng.
    const body = await req.json();
    // sử dụng Prisma để cập nhật trạng thái của đơn hàng.
    await prisma.order.update({
      //  Id của đơn hàng được lấy từ đối tượng params và trạng thái mới của đơn hàng được lấy từ đối tượng body.
      where: {
        id: id,
      },
      data: { status: body },
    });
    return new NextResponse(
      JSON.stringify({ message: "Order has been updated!" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
