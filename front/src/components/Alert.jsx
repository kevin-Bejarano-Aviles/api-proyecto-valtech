import iconCheck from '../img/icon-check.svg';
import iconClose from '../img/icon-close.svg';

function Alert({ message, onclick }) {
  return (
    <div className='mobile:bottom-3 mobile:w-[300px] tablet:bottom-5 tablet:w-[500px] laptop:w-[600px] desktop:w-[768px] fixed flex justify-between p-4 font-bold text-sm text-white bg-blue rounded-lg'>
      <div className='flex gap-6'>
        <img src={iconCheck} alt='' />
        {message}
      </div>
      <img className='cursor-pointer' src={iconClose} alt='' onClick={onclick} />
    </div>
  )
}

export default Alert;