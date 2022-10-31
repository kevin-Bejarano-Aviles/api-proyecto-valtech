import warningImg from '../../../../assets/icons/icon_warning.svg';

function NameInput({
  label,
  name,
  formik,
  errorCreateEventObject,
  initialValues,
  handleAreInputVisible,
}) {
  const handleClick = () => {
    handleAreInputVisible({ ...initialValues });
  };

  return (
    <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
      <label htmlFor={name} className='text-sm'>
        {label}
      </label>
      <input
        name={name}
        id={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        className={`${
          (formik.touched.name && formik.errors.name) ||
          errorCreateEventObject.name
            ? 'border-red-500 focus:outline-red-500'
            : ''
        } ${
          formik.values.name ? 'bg-inputbackground' : ''
        } mobile:w-full tablet:max-w-[320px] p-3 h-10 text-sm rounded-lg border-2 focus:outline-green`}
        placeholder='Ingresar nombre'
        onClick={() => handleClick()}
      />
      {(formik.touched.name && formik.errors.name) ||
      errorCreateEventObject.name ? (
        <div className='flex gap-1 text-red-500'>
          <img src={warningImg} alt='' />
          {formik.touched.name && formik.errors.name
            ? formik.errors.name
            : errorCreateEventObject.name.msg}
        </div>
      ) : null}
    </div>
  );
}

export default NameInput;
