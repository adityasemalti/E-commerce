import React from 'react';

const OurApp = () => {
  return (
    <div>
      <div className="h-1 w-full bg-black"></div>

      <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-20 py-10 gap-10">
        <div className="flex flex-col items-center md:items-start">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNlNOFEgROO2uXZgvj5_4UphB4kqcMyXR_AA&s"
            alt=""
            className=""
          />
          <img
            className="w-40 md:w-56 ml-8"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png"
            alt=""
          />
        </div>

        <p className="text-3xl md:text-6xl font-semibold newFont shadow-lg shadow-black text-center md:text-left max-w-xl">
          get your stuff At your door
        </p>

        <div className="flex flex-col items-center md:items-end">
          <img
            src="https://www.shutterstock.com/image-vector/clothing-store-logo-design-inspiration-600nw-2104754999.jpg"
            alt=""
            className="w-48 md:w-64"
          />
        </div>
      </div>

      <p className="text-center my-10 text-lg">
        Copyright@2025-My-first-MERN-Project
      </p>
    </div>
  );
};

export default OurApp;
