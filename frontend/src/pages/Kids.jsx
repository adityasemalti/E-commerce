import React from 'react';
import { FaArrowRight } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Kids = () => {
  const navigate = useNavigate();

  return (
    <div className='mt-10 px-4'>
      <div className='flex flex-col md:flex-row items-center justify-between w-full gap-8 md:gap-0'>
        {/* Text Content */}
        <div className='md:w-1/2 flex flex-col items-center md:items-end text-center md:text-right space-y-6'>
          <h1 className='text-3xl md:text-5xl text-gray-700 font-sans'>
            All New Kids...
          </h1>
          <button
            onClick={() => navigate('/collection2')}
            className='bg-yellow-400 border-black border-2 px-6 py-2 rounded-full flex items-center gap-2'
          >
            Shop Now <FaArrowRight size={20} />
          </button>
        </div>

        {/* Image with animation */}
        <motion.div
          initial={{ x: -1500 }}
          animate={{ x: 0 }}
          transition={{ duration: 2 }}
          className='md:w-1/2 flex justify-center'
        >
          <img
            src="https://www.shutterstock.com/image-photo/happy-smiling-baby-jeans-sitting-600nw-2149287955.jpg"
            alt="Happy baby in jeans"
            className='rounded-xl max-w-full h-auto'
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Kids;
