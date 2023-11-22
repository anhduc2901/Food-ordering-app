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
    const [file, setFile] = useState<File | undefined>();

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
        // Lưu giá trị nhập vào biến inputs
        setInputs((prev) => {
            // [e.target.name] để lưu trữ giá trị mới được nhập vào trong mảng inputs 
            // sử dụng thuộc tính value của đối tượng e để lấy giá trị mới được nhập vào.
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    // khi thay đổi giá trị ở "Options"
    const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Lưu vào biến option
        setOption((prev) => {
            // [e.target.name]: Câp nhật giá trị với input tương ứng (thay đổi giá trị của title thì additionalPrice sẽ 0 thay đổi)
            return { ...prev, [e.target.name]: e.target.value };
        });
    };


    ///////////////////////////
    const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        // chuyển đổi đối tượng ChangeEvent thành đối tượng HTMLInputElement (files của đối tượng HTMLInputElement)
        const target = e.target as HTMLInputElement;

        // lấy tệp đầu tiên trong danh sách các tệp được chọn. 
        const item = (target.files as FileList)[0];

        // cập nhật biến File
        setFile(item);

    };
    // tải tệp lên Cloudinary và lấy url đến tệp đó trên coudinary
    const upload = async () => {

        // FormData được sử dụng để gửi dữ liệu lên máy chủ theo định dạng multipart/form-data.
        const data = new FormData();

        // thêm tệp cần tải lên vào đối tượng FormData.
        data.append("file", file!);
        // api key của cloudinary
        data.append("api_key", process.env.CLOUDINARY_API_KEY!);
        // xác định preset tải lên trên Cloudinary.
        data.append("upload_preset", "restaurant");
        try {
            // sử dụng hàm fetch() để gửi yêu cầu POST đến Cloudinary để tải tệp lên.
            const res = await fetch("https://api.cloudinary.com/v1_1/ducquadeptrai/image/upload", {
                method: "POST",
                body: data,
            });
            // k gửi đc thì báo lỗi
            if (!res.ok) {
                throw new Error(`Failed to upload file: ${res.statusText}`);
            }
            //  lấy dữ liệu phản hồi từ Cloudinary.
            const resData = await res.json();

            // URL của tệp đã tải lên.
            return resData.url;
        } catch (error) {
            console.log("Lỗi !!");
            console.log(error);
        }
    };
    ///////////////////////////
    // Event submit form
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // url của tệp đó trên coudinary
            const url = await upload();
            // gửi yêu cầu POST  để tạo một sản phẩm mới.
            const res = await fetch("http://localhost:3000/api/products", {
                method: "POST",
                // data là body , send inputs và options 
                body: JSON.stringify({
                    img: url,
                    ...inputs,
                    options,
                }),
            });


            //  lấy dữ liệu phản hồi từ API
            const data = await res.json();

            toast.success("The product has been added to CSDL")
            // chuyển hướng người dùng đến trang sản phẩm mới được tạo.
            router.push(`/product/${data.id}`);

        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div>
            <form className="shadow-lg flex flex-wrap gap-4 p-8" onSubmit={handleSubmit}>
                <h1 className="text-4xl mb-2 text-gray-300 font-bold">
                    Add New Product
                </h1>
                {/* it is working  */}
                <div className=" w-full flex flex-col gap-2">
                    <label htmlFor="file">Image</label>
                    <input onChange={handleChangeImg} className="ring-1 ring-red-200 p-2 rounded-sm" type="file" name="title" id="file" />
                </div>
                <div className=" w-full flex flex-col gap-2">
                    <label className="text-sm">Title</label>
                    <input
                        onChange={handleChange} className="ring-1 ring-red-200 p-2 rounded-sm" type="text"
                        name="title" id="" />
                </div>
                <div className=" w-full flex flex-col gap-2">
                    <label className="text-sm">Desc</label>
                    <textarea
                        onChange={handleChange} className="ring-1 ring-red-200 p-2 rounded-sm"
                        name="desc" ></textarea>
                </div>
                <div className=" w-full flex flex-col gap-2">
                    <label className="text-sm">Price</label>
                    <input
                        onChange={handleChange} className="ring-1 ring-red-200 p-2 rounded-sm" type="number"
                        name="price" id="" />
                </div>
                <div className=" w-full flex flex-col gap-2">
                    <label className="text-sm">Category</label>
                    <input
                        onChange={handleChange} className="ring-1 ring-red-200 p-2 rounded-sm" type="text"
                        name="catSlug" id=""
                        placeholder="Must be 'pizzas' 'burgers' or 'pastas' "
                    />

                </div>


                {/* SELECT OPTIONS */}
                <div className="w-full flex flex-col gap-2">
                    <div className="">
                        <div className=" flex flex-col">
                            <label className="text-sm w-full">Options</label>
                            <div className="w-full">
                                <input
                                    onChange={changeOption} className="ring-1 ring-red-200 p-2 rounded-sm w-1/2"
                                    type="text" placeholder='Title'
                                    name='title' />
                                <input
                                    onChange={changeOption} className="ring-1 ring-red-200 p-2 rounded-sm w-1/2"
                                    type="number"
                                    placeholder='Additional Price'
                                    name='additionalPrice' />
                            </div>
                            {/* Thêm option vào options */}
                            <div className="w-52 bg-gray-500 p-2 text-white rounded-md w-full text-center mt-2"
                                onClick={() => setOptions((prev) => [...prev, option])}
                            >
                                Add Option
                            </div>
                        </div>
                    </div>

                    {/* render sau khi  nhấn add option */}
                    <div className="">
                        <div className="flex flex-wrap gap-4 mt-2">
                            {options.map((opt) => (
                                <div
                                    key={opt.title}
                                    className="p-2  rounded-md cursor-pointer bg-gray-200 text-gray-400"
                                    // Click vào để xóa option
                                    onClick={() =>
                                        setOptions((prev) =>
                                            prev.filter((item) => item.title !== opt.title)
                                        )
                                    }
                                >
                                    <span>{opt.title}</span>
                                    <span className="text-xs"> (+ ${opt.additionalPrice})</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                <button type="submit" className="p-2 w-full bg-red-500 text-white rounded-md" >Submit</button>
            </form>
        </div>
    )
}

export default AddPage