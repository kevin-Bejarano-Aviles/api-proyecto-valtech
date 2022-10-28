import { useState, useEffect, useRef } from 'react';
import ButtonImg from './ButtonImg';
import img1 from '../../../../assets/banner/banner_img1.png';
import img2 from '../../../../assets/banner/banner_img2.png';
import img3 from '../../../../assets/banner/banner_img3.png';
import '../../../../index.css';
import arrowLeft from '../../../../assets/icons/arrow_left.svg';
import arrowRigth from '../../../../assets/icons/arrow_right.svg';

const featuredImg = [
  {
    img: img1,
    text: 'Alentamos tu multipotencialidad y promovemos tu valor personal',
  },
  {
    img: img2,
    text: 'Desarrollamos y creamos como estilo de vida'
  },
  {
    img: img3,
    text: 'Unite a la comunidad de aprendizaje'
  }
];

function Banner() {
  const slideRef = useRef();

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOneNextClick = () => {
    const productsLength = featuredImg.length;
    if (currentIndex === productsLength - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
    slideRef.current.classList.add('fade-anim');
  };

  const handleOnePrevClick = () => {
    const productsLength = featuredImg.length;
    if (currentIndex === 0) {
      setCurrentIndex(productsLength - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
    slideRef.current.classList.add('fade-anim');
  };

  const removeAnimation = () => {
    slideRef.current.classList.remove('fade-anim');
  };

  useEffect(() => {
    slideRef.current.addEventListener('animationend', removeAnimation);
  }, [currentIndex]);

  return (
    <div className='w-full  m-auto'>
      <div
        ref={slideRef}
        className='w-full flex justify-center select-none relative'
      >
        <div className='w-full overflow-hidden'>
          <img
            className='w-[800px] h-[171px] tablet:w-full tablet:h-auto object-cover'
            src={featuredImg[currentIndex].img}
            alt={currentIndex}
          />
          <p className='absolute top-5 w-full portatil:w-[180px] desktop:w-3/5 tablet:text-2xl portatil:text-3xl desktop:text-4xl pl-16 pr-24 tablet:pl-56 tablet:pr-96 text-white font-bold'>{featuredImg[currentIndex].text}</p>
        </div>
        <div className='absolute w-full tablet:w-4/5 top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center'>
          <button onClick={() => handleOnePrevClick()}>
            <img src={arrowLeft} alt='' />
          </button>
          <button onClick={() => handleOneNextClick()}>
            <img src={arrowRigth} alt='' />
          </button>
        </div>
        <div className='absolute w-full flex justify-center inset-x-0 bottom-3'>
          {featuredImg.map((user, index) => (
            <ButtonImg index={index} currentIndex={currentIndex} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Banner;
