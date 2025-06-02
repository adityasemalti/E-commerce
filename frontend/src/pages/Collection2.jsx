import React, { useContext } from 'react'
import AppContext from '../Context/AppContext'
import '../App.css'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
const Collection2 = () => {
    const {products }= useContext(AppContext)

    const navigate= useNavigate()
    const id = useParams()
  return (
    <div>
      <Navbar/>
        <h1 className='text-center text-6xl py-2 font-semibold newFont'>TOP COLLECTIONS</h1>
        <div>
      {
        products.map((p)=>(
             <div key={p._id} className="w-1/5 m-5 border rounded-2xl shadow-md p-4 hover:shadow-lg transition-all" onClick={()=>{navigate(`/productDetail/${p._id}`)}}>
      <img
        src={p.image[0]}
        alt={p.name}
        className="w-full h-48 object-cover rounded-xl mb-3"
      />
      <h2 className="text-lg font-semibold mb-1">{p.name}</h2>
      <p className="text-gray-600 mb-2">${p.price.toFixed(2)}</p>
      <button
        onClick={() => onAddToCart(p)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
        ))
      }
    </div>
    </div>
  )
}

export default Collection2
