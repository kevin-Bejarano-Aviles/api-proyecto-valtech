import { useState, useEffect } from 'react';
import iconArrow from '../../../../assets/icons/privatePage/list-control.svg';

function DurationInput({
  label,
  name,
  areInputVisible,
  formik,
  errorCreateEventObject,
  initialValues,
  handleAreInputVisible,
}) {
  const [selectedDuration, setSelectedDuration] = useState('');

  const durationInputValues = [];

  const fillDurationInputValues = () => {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j <= 45; j += 15) {
        durationInputValues.push(
          ('0' + i).slice(-2) + ':' + ('0' + j).slice(-2)
        );
      }
    }
    durationInputValues.shift();
    durationInputValues.push('08:00');
  };

  fillDurationInputValues();

  const handleChangeSelectedDuration = (newValue) => {
    setSelectedDuration(newValue);
  };

  const handleValidateErrors = () => {
    selectedDuration === ''
      ? formik.setErrors({ ...formik.errors, duration: 'Required' })
      : formik.setErrors({ ...formik.errors, duration: '' });
  };

  const handleChangeFormikValue = () => {
    formik.values.duration = selectedDuration;
  };

  useEffect(() => {
    handleChangeFormikValue();
    handleValidateErrors();
  }, [selectedDuration]);

  const handleClick = () => {
    handleAreInputVisible({
      ...initialValues,
      duration: !areInputVisible.duration,
    });
  };

  return (
    <div className='relative flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
      <label htmlFor={name} className='relative -z-10 text-sm'>
        {label}
      </label>
      <div
        className={`${areInputVisible.duration ? 'border-green' : ''} ${
          selectedDuration === '' ? 'text-lightgray' : 'bg-inputbackground'
        } flex items-center h-10 rounded-lg cursor-pointer border-2`}
      >
        <div
          name={name}
          id={name}
          className='mobile:w-full tablet:max-w-[320px] pl-3 pr-2 text-sm appearance-none select-none truncate'
          onClick={handleClick}
          tabIndex='0'
          onBlur={formik.handleBlur}
        >
          {selectedDuration === ''
            ? 'Seleccionar duración'
            : `${selectedDuration} hs`}
        </div>
        <img src={iconArrow} alt='' className='px-2' />
      </div>
      <ul
        className={`${
          areInputVisible.duration ? '' : 'hidden'
        } absolute overflow-auto top-[72px] list-none w-full h-[120px] rounded-lg border-2 shadow-lg`}
      >
        {durationInputValues.map((value, index) => (
          <li
            key={value}
            className={`${
              index % 2 === 0 ? 'bg-white' : 'bg-bgStudents'
            } w-full h-10 flex items-center pl-3 cursor-pointer hover:font-bold hover:text-green`}
            onClick={() => handleChangeSelectedDuration(value)}
          >
            {value}
          </li>
        ))}
      </ul>
      {formik.touched.duration && formik.errors.duration ? (
        <div className='text-red-500'>{formik.errors.duration}</div>
      ) : null}
      {errorCreateEventObject.duration ? (
        <div className='text-red-500'>
          {errorCreateEventObject.duration.msg}
        </div>
      ) : null}
    </div>
  );
}

export default DurationInput;
