import iconCheck from '../img/icon-check.svg';
import iconClose from '../img/icon-close.svg';

function Alert({ message, onclick }) {
  return (
    <div className='fixed bottom-5 flex justify-between p-4 w-[768px] font-bold text-sm text-white bg-blue rounded-lg'>
      <div className='flex gap-6'>
        <img src={iconCheck} alt='' />
        {message}
      </div>
      <img className='cursor-pointer' src={iconClose} alt='' onClick={onclick} />
    </div>
  )
}

export default Alert;