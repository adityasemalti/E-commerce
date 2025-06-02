import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppContext from '../Context/AppContext'
import RelatedProducts from './RelatedProducts'

const ProductDetail = () => {
  const { id } = useParams()
  const { products,currency,addToCart,navigate } = useContext(AppContext)
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size,setSize] = useState('')

  useEffect(() => {
    const product = products.find((item) => item._id === id)
    if (product) {
      setProductData(product)
      setImage(Array.isArray(product.image) && product.image.length > 0 ? product.image[0] : '')
    }
  }, [id, products])

  if (!productData) return <div>Loading...</div>

  return (
    <div>
      <div>
        <div className='flex h-auto gap-10 m-5'>
          <div className=' w-1/4 h-auto'>
            {productData.image?.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                alt=""
              />
            ))}
          </div>
          <div className='w-1/2 flex flex-col gap-7'>
            <div>
              <img src={image} alt="" className='w-full h-full' />
            </div>
            <div>
              <p className='text-lg font-semibold '>{productData.name}</p>
              <div className='flex gap-2 items-center'>
               <img className='w-40' src="https://miro.medium.com/v2/resize:fit:1106/1*PvoG2ZWSd5Z-a3k2jdM55A.png" alt="" />
               <p className='text-lg'>(122)</p>
               </div>
              <p className='text-lg font-semibold'>{currency + productData.price}</p>
              <p className='text-lg font-semibold '>{productData.description}</p>
              <div className='flex flex-col gap-4 my-8'> 
                <p>Select Size</p>
                <div className='flex gap-2'>
                  {
                    productData.sizes.map((item,index)=>(
                      <button onClick={()=>{setSize(item)}} className={`border py-2 px-4 bg-gray-100 ${item===size?'border-orange-500':''}`} key={index}>{item}</button>
                    ))
                  }

                </div>
              </div>

              <button onClick={()=>{addToCart(productData._id,size)}} className='bg-black text-white px-8 py-3 active:bg-gray-700'>Add To Cart</button>
              <hr className='mt-8 ' />
              <div className='m-10 text-gray-700 text-md'>
                <p>100% Original Product</p>
                <p>Cash on delivery available on this product</p>
                <p>Please read the terms and conditions about return and exchange in About section</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Description and Review Section  */}
      <div className='mt-20 '>
        <div className='flex'>
                <b className='border px-5 py-3 text-sm'> Description</b>
                <p className='border px-5 py-3 text-sm'>Review(122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores blanditiis itaque dolore doloremque saepe accusantium!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci nemo quisquam cum iste hic mollitia facere fugiat repellendus. Expedita, at?</p>
        </div>  
      </div>
      {/* display related products  */}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  )
}

export default ProductDetail
