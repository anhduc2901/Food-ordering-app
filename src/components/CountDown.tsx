"use client"
import React, { useState, useEffect } from "react";
import Countdown from 'react-countdown'

// With library
// const Endingdate = new Date("2023-12-31")
// const CountDown = () => {
//   return (
//     <Countdown date={Endingdate} className="font-bold text-5xl text-yellow-300" />
//   )
// }

// without it
const CountDown = () => {
  // tính toán ngày , giữa ngày mà bạn muốn đếm ngược đến và ngày hiện tại (milisecond)
  let difference = +new Date(`12/30/2023`) - +new Date();

  // tạo một trạng thái cho thời gian còn lại cho đến ngày muốn đếm ngược đến
  const [delay, setDelay] = useState(difference);

  // tính toán số ngày, giờ, phút và giây còn lại cho đến ngày muốn đếm ngược đến
  const d = Math.floor(difference / (1000 * 60 * 60 * 24));
  const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const m = Math.floor((difference / 1000 / 60) % 60);
  const s = Math.floor((difference / 1000) % 60);
  const [mounted, setMounted] = useState(false);
  // cập nhật trạng thái delay mỗi giây. Hook useEffect() sẽ được chạy mỗi khi trạng thái delay thay đổi.
  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
    }

    // Nếu thời gian còn lại bằng 0, thì hàm clearInterval() sẽ được sử dụng để dừng bộ đếm.
    return () => {
      clearInterval(timer);
    };
  });
  return (mounted &&
    <span className="font-bold text-5xl text-yellow-300">
      {d}:{h}:{m}:{s}
    </span>
  );
};
export default CountDown