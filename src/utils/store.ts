
// const INITIAL_STATE = {
//     products: [],
//     totalItems: 0,
//     totalPrice: 0,
// };

// // zustand library
// // persist +  name: "cart" : lưu data vào local storage
// // CartType & ActionTypes : hành động ActionTypes cho CartType
// export const useCartStore = create<CartType & ActionTypes>((set, get) => ({
//     // Khởi tạo giá trị

//     // products
//     products: INITIAL_STATE.products,
//     totalItems: INITIAL_STATE.totalItems,
//     totalPrice: INITIAL_STATE.totalPrice,
//     // Hành động add item to cart
//     addToCart(item) {
//         // Tìm item trong "products" và kiểm tra nó có exist hay k

//         // lấy mảng products từ trạng thái của store.
//         const products = get().products;
//         // Kiểm tra xem item mới thêm đã thêm trc đó chưa
//         const productInState = products.find(
//             (product) => product.id === item.id
//         );
//         // nếu thêm sp đã thêm trc (trùng id) đó thì sẽ cập nhật lại sp đó mà k thêm mới nó nữa
//         if (productInState) {
//             // Duyệt các sp trong giỏ hàng để tìm sp có id trùng vs sp vừa mới thêm .
//             // tạo một mảng mới có chứa tất cả các sản phẩm trong giỏ hàng , bao gồm cả sản phẩm mới được thêm vào.
//             const updatedProducts = products.map((product) =>
//                 product.id === productInState.id
//                     ? {
//                         // sao chép các thuộc tính của item vào updatedProducts
//                         ...item,
//                         //  số lượng mới của sp là : sl cũ + sl mới
//                         quantity: item.quantity + product.quantity,
//                         // giá mới của sp là : giá cũ + giá mới
//                         price: item.price + product.price,
//                     }
//                     : item
//             );
//             // Set  giá trị mới cho giỏ hàng
//             set((state) => ({
//                 products: updatedProducts,
//                 totalItems: state.totalItems + item.quantity,
//                 totalPrice: state.totalPrice + item.price,
//             }));
//             // Nếu sp mới thêm chưa thêm vào lần nào trc đó thì sẽ thêm nó vào cuối mảng products
//         } else {
//             set((state) => ({
//                 products: [...state.products, item],
//                 totalItems: state.totalItems + item.quantity,
//                 totalPrice: state.totalPrice + item.price,
//             }));
//         }
//     },
//     // Hành động remove item 
//     removeFromCart(item) {
//         set((state) => ({
//             // Trả về products có product.id !== item.id
//             products: state.products.filter((product) => product.id !== item.id),
//             totalItems: state.totalItems - item.quantity,
//             totalPrice: state.totalPrice - item.price,

//         }));
//     },
//     //  đang dùng client side , skipHydration để tránh nextjs chuyển nó sang server side
// }));

import { ActionTypes, CartType } from "@/type/types";
import { skip } from "node:test";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
    products: [],
    totalItems: 0,
    totalPrice: 0,
};


export const useCartStore = create<CartType & ActionTypes>((set, get) => ({
    products: INITIAL_STATE.products,
    totalItems: INITIAL_STATE.totalItems,
    totalPrice: INITIAL_STATE.totalPrice,
    // Hành động add item to cart
    addToCart(item) {
        set((state) => ({
            products: [...state.products, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
        }));
    },
    removeFromCart(item) {
        set((state) => ({
            products: state.products.filter((product) => product.id !== item.id),
            totalItems: state.totalItems - item.quantity,
            totalPrice: state.totalPrice - item.price,
        }));
    },

}));