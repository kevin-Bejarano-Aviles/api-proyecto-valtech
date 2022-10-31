import { useState, useEffect } from 'react';
import iconArrow from '../../../../../assets/icons/privatePage/list-control.svg';
import warningImg from '../../../../../assets/icons/icon_warning.svg';
import timeInputValues from './timeInputValues.json';

function TimeInput({
  label,
  name,
  areInputVisible,
  formik,
  errorCreateEventObject,
  initialValues,
  handleAreInputVisible,
}) {
  const [selectedTime, setSelectedTime] = useState({
    hour: null,
    minute: '00',
  });

  const handleChangeHour = (newHour) => {
    setSelectedTime({
      hour: newHour,
      minute: selectedTime.minute,
    });
  };

  const handleChangeMinute = (newMinute) => {
    setSelectedTime({
      hour: selectedTime.hour,
      minute: newMinute,
    });
  };

  const handleValitimeErrors = () => {
    Object.values(selectedTime).some((value) => value === null)
      ? formik.setErrors({ ...formik.errors, time: 'Requerido' })
      : formik.setErrors({ ...formik.errors, time: '' });
  };

  const handleChangeFormikValue = () => {
    if (!Object.values(selectedTime).some((value) => value === null)) {
      formik.values.time = Object.values(selectedTime).join(':');
    }
  };

  useEffect(() => {
    handleChangeFormikValue();
    handleValitimeErrors();
  }, [selectedTime]);

  const handleClick = () => {
    handleAreInputVisible({
      ...initialValues,
      time: !areInputVisible.time,
    });
  };

  return (
    <div className='relative flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
      <label htmlFor={name} className='relative -z-10 text-sm'>
        {label}
      </label>
      <div
        className={`${
          (formik.touched.time && formik.errors.time) ||
          errorCreateEventObject.time
            ? 'border-red-500'
            : ''
        } ${areInputVisible.time ? 'border-green' : ''} ${
          Object.values(selectedTime).some((value) => value === null)
            ? 'text-lightgray'
            : 'bg-inputbackground'
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
          {Object.values(selectedTime).some((value) => value === null)
            ? 'Seleccionar horario'
            : `${Object.values(selectedTime).join(':')} hs`}
        </div>
        <img src={iconArrow} alt='' className='px-2 w-[32px]' />
      </div>
      <div
        className={`absolute top-[72px] z-10 flex list-none w-full h-[120px] overflow-x-auto rounded-lg border-2 shadow-lg ${
          areInputVisible.time ? '' : 'hidden'
        }`}
      >
        <ul className='basis-1/2 overflow-auto'>
          {timeInputValues.hours.map((hour) => (
            <li
              key={hour}
              className={`${
                hour % 2 === 0 ? 'bg-white' : 'bg-bgStudents'
              } w-full h-10 flex items-center pl-3 cursor-pointer hover:font-bold hover:text-green`}
              onClick={() => handleChangeHour(hour)}
            >
              {hour}
            </li>
          ))}
        </ul>
        <ul className='basis-1/2 overflow-auto'>
          {timeInputValues.minutes.map((minute) => (
            <li
              key={minute}
              className={`${
                minute % 2 === 0 ? 'bg-white' : 'bg-bgStudents'
              } w-full h-10 flex items-center pl-3 cursor-pointer hover:font-bold hover:text-green`}
              onClick={() => handleChangeMinute(minute)}
            >
              {minute}
            </li>
          ))}
        </ul>
      </div>
      {(formik.touched.time && formik.errors.time) ||
      errorCreateEventObject.time ? (
        <div className='flex gap-1 text-red-500'>
          <img src={warningImg} alt='' />
          {formik.touched.time && formik.errors.time
            ? formik.errors.time
            : errorCreateEventObject.time.msg}
        </div>
      ) : null}
    </div>
  );
};

export default TimeInput;
