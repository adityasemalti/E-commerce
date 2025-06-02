import React from 'react'

const OurApp = () => {
    return (
        <div>
            <div className='h-1 w-full bg-black'></div>
            <div className='flex items-center justify-between'>
                
                <div>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNlNOFEgROO2uXZgvj5_4UphB4kqcMyXR_AA&s"
                        alt=""
                        className='' />
                    <img
                        className='w-56 mx-16'
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png" alt="" />
                </div>
                <p className='text-6xl font-semibold newFont shadow-lg shadow-black'>get your stuff At your door</p>

                <div className='flex flex-col '>
                    <img src="https://www.shutterstock.com/image-vector/clothing-store-logo-design-inspiration-600nw-2104754999.jpg" alt="" 
                    className='w-64 mx-10'
                    />
                    
                </div>
            </div>
            <p className='text-center my-10 text-lg '>Copyright@2025-My-first-MERN-Project</p>
        </div>
    )
}

export default OurApp
