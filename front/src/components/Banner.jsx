import img1 from '../img/banner_img1.png';
import img2 from '../img/banner_img2.png';
import img3 from '../img/banner_img3.png';
import '../index.css';

import arrow_left from '../img/arrow_left.svg'
import arrow_rigth from '../img/arrow_right.svg'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import ButtonImg from './ButtonImg';


const featuredImg=[img1,img2,img3];

function Banner() {
    const slideRef=useRef()

    const [currentIndex,setCurrentIndex]=useState(0);
    let count;
    const handleOneNextClick=()=>{
        const productsLength = featuredImg.length;
        count = (currentIndex + productsLength + 1) % productsLength;
        console.log(count);
        setCurrentIndex(count);
        slideRef.current.classList.add('fade-anim');
    }

    const handleOnePrevClick=()=>{
        const productsLength = featuredImg.length;
        count = (currentIndex + productsLength - 1) % productsLength;
        setCurrentIndex(count);
        slideRef.current.classList.add('fade-anim');
        console.log(count);
    }

    const startSlider=()=>{
        setInterval(()=>{
            handleOneNextClick()
        },1000)
        console.log(currentIndex);
    }

    const removeAnimation= ()=>{
        slideRef.current.classList.remove('fade-anim');
    }

    useEffect(()=>{
        // startSlider()
        slideRef.current.addEventListener("animationend", removeAnimation);
    },[])

    return ( 
        <div className="w-full  m-auto">
            <div ref={slideRef} className='w-full flex justify-center select-none relative'>
            <div className="w-full">
                <img className='w-full' src={featuredImg[currentIndex]} alt={currentIndex}></img>
            </div>
                <div className='absolute w-4/5 top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center'>
                    <button onClick={handleOnePrevClick}><img src={arrow_left} alt="" /></button>
                    <button onClick={handleOneNextClick}><img src={arrow_rigth} alt="" /></button>
                </div>
                {/* ver como hacer que varie dependiendo de las imagenes que se carguen */}
                <div className='absolute w-full flex justify-center inset-x-0 bottom-3'>
                    {
                        featuredImg.map( (user,index)=>(
                            <ButtonImg index={index} currentIndex={currentIndex}/>
                        )
                        )
                    }
                </div>
            </div> 

        </div>
    );
}

export default Banner;