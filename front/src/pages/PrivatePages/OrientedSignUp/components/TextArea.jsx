import warningImg from '../../../../assets/icons/icon_warning.svg';

function TextArea({ error, label, touched, ...props }) {
  return (
    <div className='flex flex-col gap-1 mb-8'>
      <label htmlFor={props.name} className='text-sm'>
        {label}
      </label>
      <textarea
        rows='4'
        className={`border-2 mobile:w-full max-w-[656px] p-2 rounded-lg ${
          error && touched ? 'border-red-500' : ''
        } ${!error && touched ? 'bg-inputbackground' : ''} focus:outline-green`}
        {...props}
      />
      {error && touched ? (
        <div className='text-red-500 flex mt-2'>
          <img src={warningImg} alt='warning' />
          <p className='ml-2'>{error}</p>
        </div>
      ) : null}
    </div>
  );
}

export default TextArea;
