import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import iconCalendar from '../../../../../assets/icons/privatePage/icon-calendar.svg';
import './DateInput.css';

const DateInput = ({ label, name, areInputVisible, formik, initialValues, handleAreInputVisible }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleSelectedDate = date => {
    const selectedDay = ('0' + date.getDate()).slice(-2);
    const selectedMonth = ('0' + (date.getMonth() + 1)).slice(-2);
    const selectedYear = date.getFullYear();
    setSelectedDate(`${selectedYear}/${selectedMonth}/${selectedDay}`);
  };

  const handleValidateErrors = () => {
    selectedDate === ''
    ? formik.setErrors({ ...formik.errors, date: 'Required'})
    : formik.setErrors({ ...formik.errors, date: ''});
  };

  const handleChangeFormikValue = () => {
    formik.values.date = selectedDate.replaceAll('/','-');
  };

  useEffect(() => {
    handleValidateErrors();
    handleChangeFormikValue();
  },[selectedDate]);

  const handleClick = () => {
    handleAreInputVisible({
      ...initialValues,
      date: !(areInputVisible.date)
    });
  };

  return (
    <div className='relative flex flex-col tablet:max-w-[320px] gap-1 tablet:grow'>
      <label htmlFor={name} className='text-sm'>{label}</label>
      <div className={`${areInputVisible.date ? 'border-green' : ''} ${selectedDate === '' ? 'text-lightgray' : 'bg-inputbackground'} flex items-center h-10 rounded-lg cursor-pointer border-2`}>
        <div
          name={name}
          id={name}
          className='mobile:w-full tablet:max-w-[320px] pl-3 pr-2 text-sm appearance-none select-none'
          onClick={handleClick}
          tabIndex='0'
          onBlur={formik.handleBlur}
        >
          {selectedDate || 'Ingresar Fecha'}
        </div>
        <img src={iconCalendar} alt='' className='px-2 w-[32px]' />
      </div>
      <Calendar
        calendarType='US'
        locale='rm-sursilv'
        onChange={handleSelectedDate}
        className={`${areInputVisible.date ? '' : 'hidden'} absolute w-[320px]`}
      />
      {formik.touched.date && formik.errors.date ? (
        <div className='text-red-500'>{formik.errors.date}</div>
      ) : null}
    </div>
  );
};

export default DateInput;