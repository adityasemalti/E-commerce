import React from 'react'
import Navbar from '../components/Navbar'
import Corousel from '../components/Corousel'
import Collection from './Collection'
import Kids from './Kids'
import OurApp from '../components/OurApp'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Corousel/>
      <Collection/>
      <Kids/>
      <OurApp/>
    </div>
  )
}

export default Home
