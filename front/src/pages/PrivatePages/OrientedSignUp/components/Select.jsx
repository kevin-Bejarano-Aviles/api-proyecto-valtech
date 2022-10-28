import warningImg from '../../../../assets/icons/icon_warning.svg'
import arrowDown from '../../../../assets/icons/Icon_arrow-down.svg';

function Select ({error, label,touched, ...props })  {
	return (
	  <div className='flex flex-col mb-1 gap-1 tablet:grow tablet:max-w-[320px]'>
		<label htmlFor={props.name} className='text-sm px-1'>{label}</label>
			<select
				defaultValue='Default'
				className={`mobile:w-full mx-2 tablet:max-w-[320px] px-2 h-10 rounded-lg text-gray-400  bg-no-repeat bg-[right_10px_center] border-2 focus:outline-green ${(error && touched) ? 'border-red-500' : ''}  ${(touched && !error) ? 'bg-backgroundGray text-blue' : ''} bg-no-repeat appearance-none  bg-[right_10px_center] `}		  
				{...props}
				style={{backgroundImage:`url(${arrowDown})`}}
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