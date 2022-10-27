const DetailInput = ({ label, name, formik, errorCreateEventObject, initialValues, handleAreInputVisible }) => {

  const handleClick = () => {
    handleAreInputVisible({...initialValues});
  };

  return (
    <div>
      <label htmlFor={name} className='text-sm'>{label}</label>
      <textarea
        cols='60'
        rows='5'
        name={name}
        id={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.detail}
        className={`${formik.values.detail ? 'bg-inputbackground' : ''} w-full block p-2 text-sm rounded-lg border-2 focus:outline-green`}
        placeholder='Escribe un comentario'
        onClick={handleClick}
      />
      {formik.touched.detail && formik.errors.detail ? (
        <div className='text-red-500'>{formik.errors.detail}</div>
      ) : null}
      {errorCreateEventObject.detail ? (
        <div className='text-red-500'>{errorCreateEventObject.detail.msg}</div>
      ) : null}
    </div>
  );
};

export default DetailInput;