import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../Context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedProducts = ({category,subCategory}) => {
    const {products ,currency } = useContext(AppContext)
    const [related,setRelated] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        if(products.length > 0){
            let productsCopy = products.slice()
            productsCopy= productsCopy.filter((item)=>category === item.category)
            productsCopy = productsCopy.filter((item)=> subCategory===item.subCategory)
            setRelated(productsCopy.slice(0,5))
        }
    },[products])
  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <h1 >Related Products</h1>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            related.map((item,index)=>(
                <div onClick={()=>{navigate(`/productDetail/${item._id}`)}} key={index} className='ml-2'>
                    <img  src={item.image[0]} alt="" />
                    <p className='text-md text-gray-700 mx-2 font-semibold'>{item.name}</p>
                    <p className='text-md text-gray-700 mx-2 font-semibold'> {currency +item.price}</p>
                </div>
            ))
        }

      </div>
    </div>
  )
}

export default RelatedProducts
