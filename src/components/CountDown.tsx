"use client"
import React from 'react'
import Countdown from 'react-countdown'

const Endingdate= new Date("2023-12-31")

const CountDown = () => {
  return (
    <Countdown date={Endingdate} className="font-bold text-5xl text-yellow-300"/>
  )
}

export default CountDown