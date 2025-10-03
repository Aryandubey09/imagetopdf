import React from 'react'
import Navbar from './Navbar'
import Testimonial from './Testimonial'
import Footer from './footer'
import ImageToPdf from './ImageToPdf'


function Home() {
  return (
    <div className='navbar'>

         <Navbar/>
      <ImageToPdf/>
      <Testimonial/>
      <Footer/>
    </div>
  )
}

export default Home