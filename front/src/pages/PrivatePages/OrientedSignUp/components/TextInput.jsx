import warningImg from '../../../../assets/icons/icon_warning.svg'

function TextInput ({ errorPost=null,error,label,touched, ...props })  {
  console.log(label);  
  console.log(touched);  
  
  return (
      <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px] mb-8'>
        <label htmlFor={props.name} className='text-sm'>{label}</label>
        <input
          className={`w-full tablet:max-w-[320px] p-2 h-10 rounded-lg border-2 ${(error || errorPost) && touched ? 'border-red-500' : ''} focus:outline-green`} 
          onChange={props.onChange}
          values={props.values}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        />
        {error && touched ? (
          <div className='text-red-500 flex mt-2'>
                  <img src={warningImg} alt="warning" />
                  <p className='ml-2'>{error}</p>
              </div>
        ) : null}
        {errorPost!==null ? (
          <div className='text-red-500 flex mt-2'>
                  <img src={warningImg} alt="warning" />
                  <p className='ml-2'>{errorPost}</p>
              </div>
        ) : null}
      </div>
    );
  };

  export default TextInput;