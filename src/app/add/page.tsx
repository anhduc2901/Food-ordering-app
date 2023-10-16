"use client";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Inputs = {
    title: string;
    desc: string;
    price: number;
    catSlug: string;
};

type Option = {
    title: string;
    additionalPrice: number;
};

const AddPage = () => {
    // Phiên hiện tại
    const { data: session, status } = useSession();

    // Initial state : inputs
    const [inputs, setInputs] = useState<Inputs>({
        title: "",
        desc: "",
        price: 0,
        catSlug: "",
    });

    // Initial state : option
    const [option, setOption] = useState<Option>({
        title: "",
        additionalPrice: 0,
    });

    // Initial state : option array
    const [options, setOptions] = useState<Option[]>([]);

    // Initial state : for img
    const [file, setFile] = useState<File>();

    const router = useRouter();

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    // Chưa đăng nhập hoặc k phải admin thì k làm được hành động này
    if (status === "unauthenticated" || !session?.user.isAdmin) {
        router.push("/");
    }

    // Event thay đổi các input : chỉ cập nhật giá trị của input có tên name 
    // => chỉ sử dụng e.target.value thì cập nhật tất cả các input
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        // Inputs array lưu giá trị nhập vào 
        setInputs((prev) => {
            // [e.target.name] để lưu trữ giá trị mới được nhập vào trong mảng inputs 
            // sử dụng thuộc tính value của đối tượng e để lấy giá trị mới được nhập vào.
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    // setOption
    const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOption((prev) => {
            // [e.target.name]: Câp nhật giá trị input tương ứng (thay đổi giá trị của title thì additionalPrice sẽ 0 thay đổi)
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const item = (target.files as FileList)[0];
        setFile(item);
    };

    // tải tệp lên Cloudinary và lấy url đến tệp đó trên coudinary
    const upload = async () => {
        // FormData được sử dụng để gửi dữ liệu lên máy chủ theo định dạng multipart/form-data.
        const data = new FormData();
        // thêm tệp cần tải lên vào đối tượng FormData.
        data.append("file", file!);
        // xác định preset tải lên trên Cloudinary.
        data.append("upload_preset", "restaurant");
        // sử dụng hàm fetch() để gửi yêu cầu POST đến Cloudinary để tải tệp lên.
        const res = await fetch("https://api.cloudinary.com/v1_1/ducquadeptrai/image", {
            method: "POST",
            headers: { "Content-Type": "multipart/form-data" },
            body: data,
        });
        //  lấy dữ liệu phản hồi từ Cloudinary.
        const resData = await res.json();
        // URL của tệp đã tải lên.
        return resData.url;
    };


    // Event submit form
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // url của tệp đó trên coudinary
            // const url = await upload();
            // gửi yêu cầu POST đến API để tạo một sản phẩm mới.
            const res = await fetch("http://localhost:3000/api/products", {
                method: "POST",
                // data là body , send inputs và options 
                body: JSON.stringify({
                    // img: url,
                    ...inputs,
                    options,
                }),
            });
            //  lấy dữ liệu phản hồi từ API
            const data = await res.json();
            // chuyển hướng người dùng đến trang sản phẩm mới được tạo.
            // router.push(`/product/${data.id}`);
            // router.push(`/product/${data.id}`);

        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div>
            <form className="shadow-lg flex flex-wrap gap-4 p-8" onSubmit={handleSubmit}>
                <h1>Add new product</h1>
                {/* Lỗi ác */}
                {/* <div className=" w-full flex flex-col gap-2">
                    <label htmlFor="">Image</label>
                    <input onChange={handleChangeImg} className="ring-1 ring-red-200 p-2 rounded-sm" type="file" name="title" id="" />
                </div> */}
                <div className=" w-full flex flex-col gap-2">
                    <label htmlFor="">Title</label>
                    <input onChange={handleChange} className="ring-1 ring-red-200 p-2 rounded-sm" type="text" name="title" id="" />
                </div>
                <div className=" w-full flex flex-col gap-2">
                    <label htmlFor="">Desc</label>
                    <textarea onChange={handleChange} className="ring-1 ring-red-200 p-2 rounded-sm" name="desc" ></textarea>
                </div>
                <div className=" w-full flex flex-col gap-2">
                    <label htmlFor="">Price</label>
                    <input onChange={handleChange} className="ring-1 ring-red-200 p-2 rounded-sm" type="number" name="price" id="" />
                </div>
                <div className=" w-full flex flex-col gap-2">
                    <label htmlFor="">Category</label>
                    <input onChange={handleChange} className="ring-1 ring-red-200 p-2 rounded-sm" type="text" name="catSlug" id="" />
                </div>
                <div className=" w-full flex flex-col gap-2">
                    <label htmlFor="">Options</label>
                    <div>
                        <input onChange={changeOption} className="ring-1 ring-red-200 p-2 rounded-sm"
                            type="text" placeholder='Title' name='title' />
                        <input onChange={changeOption} className="ring-1 ring-red-200 p-2 rounded-sm"
                            type="number"
                            placeholder='Additional Price'
                            name='additionalPrice' />
                    </div>
                    {/* Thêm option vào options */}
                    <div className="w-52 bg-red-500 text-white p-2 rounded-md"
                        onClick={() => setOptions(prev => [...prev, option])}
                    >
                        Add Option
                    </div>
                </div>
                {/* render options */}
                <div >
                    {options.map(item => (
                        <div className="ring-1 p-2 ring-red-500 rounded-md cursor-pointer" key={item.title}
                            // Click vào thì xóa option đc click
                            // options lưu các opt khác opt đc click vào
                            onClick={() => setOptions(options.filter(opt => opt.title !== item.title))}>

                            <span>{item.title}</span>
                            <span>${item.additionalPrice}</span>
                        </div>
                    ))}
                </div>
                <button type="submit" className="p-2 w-full bg-red-500 text-white " >Submit</button>
            </form>
        </div>
    )
}

export default AddPage