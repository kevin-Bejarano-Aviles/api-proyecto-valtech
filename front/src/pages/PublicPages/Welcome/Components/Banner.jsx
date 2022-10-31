import functionsBanner from '../functions';
import ButtonImg from './ButtonImg';
import img1 from '../../../../assets/banner/banner_img1.png';
import img2 from '../../../../assets/banner/banner_img2.png';
import img3 from '../../../../assets/banner/banner_img3.png';
import './Banner.css';
import arrowLeft from '../../../../assets/icons/arrow_left.svg';
import arrowRigth from '../../../../assets/icons/arrow_right.svg';

const featuredImg = [
  {
    img: img1,
    text: 'Alentamos tu multipotencialidad y promovemos tu valor personal',
  },
  {
    img: img2,
    text: 'Desarrollamos y creamos procesos como si fuera nuestro estilo de vida',
  },
  {
    img: img3,
    text: 'Unite a nuestra comunidad y sé parte de un gran aprendizaje',
  },
];

function Banner() {
  const { handleOneNextClick, handleOnePrevClick, currentIndex, slideRef } =
    functionsBanner();

  return (
    <div
      ref={slideRef}
      className='mobile:h-56 tablet:h-[350px] relative w-full flex flex-col justify-end mobile:gap-10 tablet:gap-20 select-none overflow-hidden'
    >
      <img
        className='absolute object-cover w-full h-full'
        src={featuredImg[currentIndex].img}
        alt={currentIndex}
      />
      <div className='flex justify-between items-center mx-4 transform'>
        <div className='flex mobile:gap-4 tablet:gap-10'>
          <button onClick={() => handleOnePrevClick(featuredImg)}>
            <img src={arrowLeft} alt='' className='w-10' />
          </button>
          <p className='w-[270px] mobile:text-2xl tablet:text-4xl text-white text-shadow'>
            {featuredImg[currentIndex].text}
          </p>
        </div>
        <button onClick={() => handleOneNextClick(featuredImg)}>
          <img src={arrowRigth} alt='' className='w-10' />
        </button>
      </div>
      <div className='relative z-10 flex justify-center mb-4'>
        {featuredImg.map((user, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ButtonImg index={index} currentIndex={currentIndex} />
        ))}
      </div>
    </div>
  );
}

export default Banner;
