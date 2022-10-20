const NameInput = ({ label, name, formik, onChangeInputVisibility }) => {
  return (
    <div className='flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
      <label htmlFor={name} className='text-sm'>{label}</label>
      <input
        name={name}
        id={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        className={`${formik.values.name ? 'bg-inputbackground' : ''} mobile:w-full tablet:max-w-[320px] p-3 h-10 text-sm rounded-lg border-2 focus:outline-green`}
        placeholder='Ingresar nombre'
        onClick={onChangeInputVisibility}
      />
      {formik.touched.name && formik.errors.name ? (
        <div className='text-red-500'>{formik.errors.name}</div>
      ) : null}
    </div>
  );
};

export default NameInput;