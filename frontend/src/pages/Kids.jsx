import React from 'react';
import { FaArrowRight } from "react-icons/fa6";
import { motion } from 'framer-motion';
import {useNavigate} from 'react-router-dom'
const Kids = () => {
    const navigate = useNavigate()
    return (
        <div className='mt-10 px-4 '>
            <div className='flex flex-col md:flex-row items-center justify-between w-full'>
                <div className='md:w-1/2 flex flex-col items-end text-right space-y-6'>
                    <h1 className='text-3xl md:text-5xl text-gray-700 font-sans'>All New Kids...</h1>
                    <button onClick={()=>{navigate('/collection2')}} className='bg-yellow-400 border-black border-2 px-4 py-2 rounded-full flex items-center gap-2'>
                        Shop Now <FaArrowRight size={20} />
                    </button>
                </div>
                <motion.div
                    initial={{ x: -1500 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 2 }}
                    className='mt-10 md:mt-0 md:w-1/2 flex justify-center z-10'
                >
                    <img
                        src="https://www.shutterstock.com/image-photo/happy-smiling-baby-jeans-sitting-600nw-2149287955.jpg"
                        alt="Happy baby in jeans"
                        className='rounded-xl max-w-full h-auto z-10'
                    />
                </motion.div>
                </div>
            </div>
    );
}

export default Kids;
