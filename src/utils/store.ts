import { ActionTypes, CartType } from "@/type/types";
import { skip } from "node:test";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
    products: [],
    totalItems: 0,
    totalPrice: 0,
};

// zustand library
// persist +  name: "cart" : lưu data vào local storage
// CartType & ActionTypes : hành động ActionTypes cho CartType
export const useCartStore = create<CartType & ActionTypes>((set, get) => ({
    // Khởi tạo giá trị

    // products
    products: INITIAL_STATE.products,
    totalItems: INITIAL_STATE.totalItems,
    totalPrice: INITIAL_STATE.totalPrice,
    // Hành động add item to cart
    addToCart(item) {

        const products = get().products
        const productInState = products.find(product => product.id === item.id)
        // export type CartItemType = {
        //     id: string;
        //     title: string;
        //     img?: string;
        //     price: number;
        //     optionTitle?: string;
        //     quantity: number;
        // };

        // Nếu item mới thêm có từ trc thì gộp nó vào 1 item 
        if (productInState) {
            const updatedProducts = products.map(product => product.id === productInState.id ? {
                ...item,
                quantity: item.quantity + product.quantity,
                price: item.price + product.price,

            } : item)

            set((state) => ({
                products: updatedProducts,
                totalItems: state.totalItems + item.quantity,
                totalPrice: state.totalPrice + item.price,
            }));
            // item mới thì tạo 1 item mới
        } else {
            set((state) => ({
                products: [...state.products, item],
                totalItems: state.totalItems + item.quantity,
                totalPrice: state.totalPrice + item.price,
            }));
        }
    },
    // Xóa item theo id
    removeFromCart(item) {
        set((state) => ({
            products: state.products.filter((product) => product.id !== item.id),
            totalItems: state.totalItems - item.quantity,
            totalPrice: state.totalPrice - item.price,
        }));
    },
}))