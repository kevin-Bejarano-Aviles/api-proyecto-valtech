import React from 'react'
import Header from '../components/HeaderPublic'
import Footer from '../components/Footer'
/* import ImgError from '../img/ImgError.svg' */

export default function Error() {
  return (
    <div className='bg-white'>
      <header className=''><Header/></header>
      <div className='bg-imgheader h-[553px] w-full flex justify-center '>
          {/* <img src={ImgError} alt="Error"/> */}
      </div>
      <footer><Footer/></footer>
    </div>
  )
}
