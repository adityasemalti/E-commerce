import React from 'react'
import { useState } from 'react';
import Navbar from './Navbar';
import '../App.css'
import image1 from '../assets/image1.webp'
import image2 from '../assets/image2.jpg'
import image3 from '../assets/image3.webp'
import {  useNavigate } from 'react-router-dom';
const Corousel = () => {
const navigate = useNavigate()
  const images = [
    image1,
    image2,
    image3
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (

    <div className="flex flex-col gap-10 items-center justify-center h-screen bg-gradient-to-br from-white to-yellow-400 corousel">
      <h1 className='font-semibold text-8xl hero-heading newFont'>Wear Your Confidence </h1>
      <div className="w-2/3">
        <div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-md shadow-black">
          <img onClick={()=>{navigate('/collection2')}}
            src={images[current]}
            alt={`Slide ${current + 1}`}
            className="w-full h-full object-cover "
          />

          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 z-10"
          >
            &#10094;
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 z-10"
          >
            &#10095;
          </button>

          <div className="absolute bottom-6 w-full flex justify-center gap-3 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-4 h-4 rounded-full ${idx === current ? 'bg-white' : 'bg-gray-400'} opacity-80`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}

export default Corousel
