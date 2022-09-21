import img1 from '../img/banner_img1.png'
import arrow_left from '../img/arrow_left.svg'
import arrow_rigth from '../img/arrow_right.svg'


const featuredImg=[img1];

function Banner() {
    return ( 
    <div className='w-full flex justify-center select-none relative'>
        <img src={featuredImg[0]}></img>
        <div className='absolute w-4/5 top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center'>
            <button><img src={arrow_left} alt="" /></button>
            <button><img src={arrow_rigth} alt="" /></button>
        </div>
    </div> );
}

export default Banner;