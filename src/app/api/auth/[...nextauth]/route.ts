// docs : phải viết vào folder any/[...nextauth]

// Google and Facebook provider
import { authOPtions } from "@/utils/auth";

import NextAuth from "next-auth/next";

// Xử lý cả các yêu cầu GET và POST đến NextAuth.
const handler = NextAuth(authOPtions)

export { handler as GET, handler as POST } 
