// cấu hình NextAuth để sử dụng Google làm nhà cung cấp xác thực.

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, getServerSession, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./connect";

// session default không có isAdmin => định nghĩa cho nó
declare module "next-auth" {
    interface Session {
        user: User & {
            isAdmin: boolean;
        }

    }
}
// token default không có isAdmin
declare module "next-auth/jwt" {
    interface JWT {
        isAdmin: boolean;
    }
}


export const authOPtions: NextAuthOptions = {
    //  adapter mà NextAuth sẽ sử dụng để lưu trữ dữ liệu người dùng (add user role)
    adapter: PrismaAdapter(prisma),
    // đc gọi mỗi khi phiên đc kiểm tra ( chức năng : để thêm thuộc tính isAdmin vào đối tượng session.user)
    // tồn tại trong token JWT , truy cập thông tin này trong ứng dụng  không cần vào CSDL
    // cho NextAuth biết sử dụng token JWT để quản lý phiên người dùng.
    session: {
        strategy: 'jwt'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            // clientId: process.env.GOOGLE_CLIENT_ID!,
            // clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    // cho phép bạn thực hiện các hành động khác nhau tại các thời điểm khác nhau (vd : thêm dữ liệu vào đối tượng session, 
    // gửi thông báo cho người dùng hoặc cập nhật cơ sở dữ liệu.)
    callbacks: {
        // thêm thuộc tính isAdmin vào đối tượng session.user (default nó k có)
        async session({ token, session }) {
            if (token) {
                session.user.isAdmin = token.isAdmin;
            }
            return session;
        },
        // // token chứa thông tin về người dùng đã đăng nhập, bao gồm email của người dùng.
        async jwt({ token }) {
            // tìm người dùng trong cơ sở dữ liệu có email trùng với email của token.
            const userInDb = await prisma.user.findUnique({
                where: {
                    // email khác null | undefined vì khi đăng nhập = email thì luôn có email
                    email: token.email!,

                },
            });
            // Nếu người dùng được tìm thấy, thì  isAdmin của người dùng  gán  isAdmin của token.
            token.isAdmin = userInDb?.isAdmin!;
            // Trả về token có giá trị isAdmin
            return token;
        },
    },

};

// Hàm trả về một đối tượng Session chứa thông tin phiên của người dùng.
export const getAuthSession = () => getServerSession(authOPtions);