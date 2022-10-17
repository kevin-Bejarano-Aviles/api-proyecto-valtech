import warningImg from '../../../../assets/icons/icon_warning.svg'

function TextArea ({error, label, ...props })  {
	return (
	  <div className='flex flex-col gap-1 mb-8'>
		<label htmlFor={props.name} className='text-sm'>{label}</label>
		<textarea
            className={`border-2 mobile:w-full max-w-[656px] p-2 rounded-lg ${error ? 'border-red-500' : ''}`}
		  	{...props}
		/>
		{ error? (
		  <div className='text-red-500 flex mt-2'>
				  <img src={warningImg} alt="warning" />
				  <p className='ml-2'>{error}</p>
			  </div>
		) : null}
	  </div>
	);
  };

  export default TextArea;