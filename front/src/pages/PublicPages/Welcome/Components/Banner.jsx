import { useState, useEffect, useRef } from 'react';
import ButtonImg from './ButtonImg';
import img1 from '../../../../assets/banner/banner_img1.png';
import img2 from '../../../../assets/banner/banner_img2.png';
import img3 from '../../../../assets/banner/banner_img3.png';
import '../../../../index.css';
import arrowLeft from '../../../../assets/icons/arrow_left.svg';
import arrowRigth from '../../../../assets/icons/arrow_right.svg';

const featuredImg = [img1, img2, img3];

function Banner() {
  const slideRef = useRef();

  const [band, setBand] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  let count;
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
        <div className='w-full overflow-hidden object-fit'>
          <img
            className='w-[800px] h-[171px] tablet:w-full tablet:h-auto'
            src={featuredImg[currentIndex]}
            alt={currentIndex}
          ></img>
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