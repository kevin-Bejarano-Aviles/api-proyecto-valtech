import functionsBanner from '../functions';
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
  const {handleOneNextClick,handleOnePrevClick,currentIndex,slideRef}=functionsBanner();

  return (
    <div className='w-full  m-auto'>
      <div
        ref={slideRef}
        className='w-full flex justify-center select-none relative '
      >
        <div className='w-full overflow-hidden  z-1 bg-black'>
          <img
            className=' w-[800px] h-[171px] opacity-70  object-cover tablet:w-full tablet:h-auto tablet:opacity-100'
            src={featuredImg[currentIndex].img}
            alt={currentIndex}
          />
          <p className='absolute z-2 top-5 text-white font-bold pl-16 w-64 tablet:text-xl tablet:pl-32 tablet:w-96 lap_tablet:text-2xl lap_tablet:pl-48 lap_tablet:pr:-32 lap_tablet:w-3/5 desktop:text-4xl desktop:pr:-46 desktop:w-2/5'>{featuredImg[currentIndex].text}</p>          
        </div>
        <div className='absolute z-3 w-full tablet:w-4/5 top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center'>
          <button onClick={() => handleOnePrevClick(featuredImg)}>
            <img src={arrowLeft} alt='' />
          </button>
          <button onClick={() => handleOneNextClick(featuredImg)}>
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
