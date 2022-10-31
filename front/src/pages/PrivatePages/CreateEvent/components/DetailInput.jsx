import warningImg from '../../../../assets/icons/icon_warning.svg';

function DetailInput({
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
    <div>
      <label htmlFor={name} className='text-sm'>
        {label}
      </label>
      <textarea
        rows='5'
        name={name}
        id={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.detail}
        className={`${
          (formik.touched.detail && formik.errors.detail) ||
          errorCreateEventObject.detail
            ? 'border-red-500 focus:outline-red-500'
            : ''
        } ${
          formik.values.detail ? 'bg-inputbackground' : ''
        } mobile:w-full lap_tablet:w-[656px] block p-2 text-sm rounded-lg border-2 focus:outline-green`}
        placeholder='Escribe un comentario'
        onClick={handleClick}
      />
      {(formik.touched.detail && formik.errors.detail) ||
      errorCreateEventObject.detail ? (
        <div className='flex gap-1 text-red-500'>
          <img src={warningImg} alt='' />
          {formik.touched.detail && formik.errors.detail
            ? formik.errors.detail
            : errorCreateEventObject.detail.msg}
        </div>
      ) : null}
    </div>
  );
}

export default DetailInput;
