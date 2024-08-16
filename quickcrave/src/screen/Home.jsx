import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Card from '../components/Card.jsx'
import Carousel from '../components/Carousel.jsx'


function Home() {
  return (
    <div>
        <Navbar/>
        <Carousel/>
        <div className='m-2'>
        <Card/> <Card/>
        </div>
        <Footer/>
    </div>
  )
}

export default Home