import React from 'react'
import Login from './pages/Login'
import Home from './pages/Home'
import {Routes,Route} from 'react-router-dom'
import About from './pages/About'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Collection2 from './pages/Collection2'
import SearchResults from './pages/SearchResults'
import Orders from './pages/Orders'
export const backendUrl = import.meta.env.VITE_BACKEND_URL
const App = () => {
  
  return (
    <>
    <ToastContainer/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/place-order' element={<PlaceOrder/>}/>
    <Route path='/collection2' element={<Collection2/>}/>
    <Route path='/productDetail/:id' element={<ProductDetail/>}/>
    <Route path="/search" element={<SearchResults />} />
    <Route path="/orders" element={<Orders/>} />
    
   </Routes>
    </>
  )
}

export default App

