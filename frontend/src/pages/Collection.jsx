import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Collection = () => {
  const ref = useRef(null);
  const navigate = useNavigate()
  return (
    <div className="mt-10">
      <div className="w-[90%] h-auto md:h-[500px] mx-auto my-10 flex flex-col md:flex-row">
        
        {/* Image side with animation */}
        <div className="h-full w-full md:w-1/2 flex items-center justify-center">
          
            <motion.img
              src="https://mir-s3-cdn-cf.behance.net/projects/404/fdc459209994743.Y3JvcCw0MDAyLDMxMzAsMCw0MzU.jpg"
              alt="img"
              className="w-full h-full object-contain drop-shadow-md"
              initial={{x:700}}
              whileInView={{x:0,rotateX:360
              }}
              transition={{delay:1,duration:2}}
              
            />
          
        </div>

        {/* Right Side Content */}
        <div className="h-full w-full md:w-1/2 flex items-center justify-center flex-col">
          <p className=" md:text-6xl font-bold text-gray-800 text-center">
            <span className="text-black newFont text-8xl ">Top Collections</span>
          </p>
          <motion.button 
            onClick={()=>{navigate('/collection2')}}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="mt-10 text-white bg-black px-6 py-3 rounded-full border-2 border-black transition-all duration-300"
          >
            Take a Look
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Collection;
