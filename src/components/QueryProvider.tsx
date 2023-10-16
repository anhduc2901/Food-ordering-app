"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

const queryClient = new QueryClient()

// Query provider của tanstack wrap children để children có thể dùng
type Props = {
    children: React.ReactNode;
}

const QueryProvider = ({ children }: Props) => {
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}

export default QueryProvider