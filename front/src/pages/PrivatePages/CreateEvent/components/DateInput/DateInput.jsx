import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import iconCalendar from '../../../../../assets/icons/privatePage/icon-calendar.svg';
import './DateInput.css';

const DateInput = ({ label, name, areInputVisible, formik, onChangeInputVisibility }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleSelectedDate = date => {
    const selectedDay = ('0' + date.getDate()).slice(-2);
    const selectedMonth = ('0' + (date.getMonth() + 1)).slice(-2);
    const selectedYear = date.getFullYear();
    setSelectedDate(`${selectedDay}/${selectedMonth}/${selectedYear}`);
  };

  const handleChangeInputValue = () => {
    formik.values.date = selectedDate;
  };

  useEffect(() => {
    handleChangeInputValue();
  },[selectedDate]);

  return (
    <div className='relative flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
      <label htmlFor={name} className='text-sm'>{label}</label>
      <div className={`${areInputVisible.date ? 'border-green' : ''} flex items-center h-10 rounded-lg cursor-pointer border-2`}>
        <div
          name={name}
          id={name}
          // onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          // value={formik.values.date}
          className='mobile:w-full tablet:max-w-[320px] pl-3 pr-2 text-sm appearance-none select-none truncate'
          onClick={onChangeInputVisibility}
        >
          <p className={`${selectedDate === '' ? 'text-lightgray' : ''}`}>{selectedDate || 'Ingresar Fecha'}</p>
        </div>
        <img src={iconCalendar} alt='' className='px-2 w-[32px]' />
      </div>
      <Calendar
        calendarType='US'
        locale='rm-sursilv'
        onChange={handleSelectedDate}
        className={areInputVisible.date ? '' : 'hidden'}
      />
      {formik.touched.date && formik.errors.date ? (
        <div className='text-red-500'>{formik.errors.date}</div>
      ) : null}
    </div>
  );
};

export default DateInput;