"use client"
// cung cấp trạng thái phiên cho các component con 
import React from 'react'
import { SessionProvider } from 'next-auth/react'

type Props = {
    children: React.ReactNode;
}

// Sử dụng AuthProvider cho Coponent children 
const AuthProvider = ({ children }: Props) => {
    return (
        <SessionProvider>{children}</SessionProvider>
    )
}

export default AuthProvider