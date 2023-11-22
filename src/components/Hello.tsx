"use client"
import { useSession } from 'next-auth/react';
import React from 'react'

const Hello = () => {
    const { data: session, status } = useSession();
    if (status == "authenticated") {
        return (
            <div>Hello {session?.user.email}</div>
        )
    }
    else {
        return (
            <div>Dive into a world of culinary delights by letting the feast begin!</div>
        )
    }

}

export default Hello