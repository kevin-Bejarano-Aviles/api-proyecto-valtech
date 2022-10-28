import warningImg from '../../../../assets/icons/icon_warning.svg'

function Select ({error, label,touched, ...props })  {
	return (
	  <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
		<label htmlFor={props.name} className='text-sm'>{label}</label>
		<select
        	className={`mobile:w-full tablet:max-w-[320px] pl-1 pr-2 h-10 rounded-lg text-gray-400 appearance-none bg-no-repeat bg-[right_10px_center] border-2 focus:outline-green ${(error && touched) ? 'border-red-500' : ''}  ${(!touched && !error) ? 'bg-backgroundGray' : '' }`}		  
		  	{...props}
		/>
		{ error && touched? (
		  <div className='text-red-500 flex mt-2'>
				  <img src={warningImg} alt="warning" />
				  <p className='ml-2'>{error}</p>
			  </div>
		) : null}
	  </div>
	);
  };
  export default Select;