import React, { useState, useEffect } from 'react'
import AppContext from './AppContext'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const AppState = ({ children }) => {
  const currency = '$'
  const deliveryFee = 10
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems]= useState({})
  const [token,setToken] = useState('')
  const navigate = useNavigate()
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const addToCart =async(itemId, size)=>{
    if(!size)
    {
      toast.error("Select Size")
      return;
    }
    let cartData = structuredClone(cartItems)

    if(cartData[itemId])
    {
      if(cartData[itemId][size]){
        cartData[itemId][size] +=1
      }
      else{
        cartData[itemId][size]=1
      }
    }
    else{
      cartData[itemId]= {}
      cartData[itemId][size]=1
    }
    setCartItems(cartData);
    if(token)
    {
      try {
        await axios.post(backendUrl+ '/api/cart/add', {itemId,size}, {headers:{token}})
      } catch (error) {
        console.log(error.message)
        toast.error(error.message)
      }
    }
  }

  const getProductData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`)
      if (response.data.success) {
        setProducts(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getProductData()
  }, [])

  const getCartCount = () => {
  let totalCount = 0;
  for (const itemId in cartItems) {
    const sizes = cartItems[itemId];
    for (const size in sizes) {
      totalCount += sizes[size];
    }
  }
  return totalCount;
};


const updateQuantity =(itemId,size, quantity)=>{
  let cartData = structuredClone(cartItems)
  cartData[itemId][size] = quantity
  setCartItems(cartData)
}  

  const getCartAmount=()=>{
    let totalAmount = 0;
    for(const items in cartItems)
    {
      let  itemInfo = products.find((product)=> product._id ===items);
      for(const item in cartItems[items])
      {
        if(cartItems[items][item]>0)
        {
          totalAmount+= itemInfo.price * cartItems[items][item]
        }
      }
    }
    return totalAmount
  }

  useEffect(()=>{
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
    }
  },[])

  const value = {
    products,
    currency,
    deliveryFee,
    addToCart,
    cartItems,
    setCartItems,
    getCartCount,
    updateQuantity,
    navigate,
    getCartAmount,
    backendUrl,
    setToken,
    token
    
  }


  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export default AppState
