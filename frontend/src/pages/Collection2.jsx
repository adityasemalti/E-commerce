import React, { useContext } from 'react'
import AppContext from '../Context/AppContext'
import '../App.css'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Collection2 = () => {
  const { products } = useContext(AppContext)
  const navigate = useNavigate()
  const id = useParams()

  const onAddToCart = (product) => {
    // Add your logic here for adding to cart
  }

  return (
    <div>
      <Navbar />
      <h1 className='text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl py-4 font-semibold newFont'>TOP COLLECTIONS</h1>
      
      <div className="flex flex-wrap justify-center px-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4"
          >
            <div
              className="border rounded-2xl shadow-md p-4 hover:shadow-lg transition-all cursor-pointer h-full flex flex-col"
              onClick={() => { navigate(`/productDetail/${p._id}`) }}
            >
              <img
                src={p.image[0]}
                alt={p.name}
                className="w-full h-48 object-cover rounded-xl mb-3"
              />
              <h2 className="text-lg font-semibold mb-1">{p.name}</h2>
              <p className="text-gray-600 mb-2">${p.price.toFixed(2)}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent parent div's onClick
                  onAddToCart(p)
                }}
                className="bg-blue-600 text-white px-4 py-2 mt-auto rounded-lg hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Collection2
