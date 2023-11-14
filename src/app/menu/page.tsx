import { menu } from '@/data';
import { MenuType } from '@/type/types';
import Link from 'next/link';
import React from 'react';


const getData = async () => {
    const response = await fetch("http://localhost:3000/api/categories", {
        cache: "no-store"
    })

    if (!response.ok) {
        throw new Error("Failed !")
    }
    return response.json();
}

const MenuPage = async () => {
    const menu: MenuType = await getData()
    return (
        <div>

            <div className="md:flex-row items-center  flex flex-col p-4 lg:px-20 xl:px-30 h-[calc(100vh-6rem) md:h-[calc(100vh-9rem)] ">
                {menu.map((item) => (
                    <Link
                        // pizza , burger , pasta
                        href={`/menu/${item.slug}`}                       // link
                        key={item.id}                           // unique key
                        className="w-full h-1/3 bg-cover p-8 md:h-2/3 md:w-1/3" //css
                        style={{ backgroundImage: `url(${item.img})` }}
                    >
                        <div className={`text-${item.color} w-1/2`}>
                            <h1 className="uppercase font-bold text-3xl">{item.title}</h1>
                            <p className='text-sm my-8'>{item.desc}</p>
                            <button className={`hidden 2xl:block xl:block 
                            bg-${item.color}
                            text-${item.color === "black" ? "white" : "red-500"}
                          text-red-500 py-2 px-4 rounded-md`}>
                                Explore
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default MenuPage