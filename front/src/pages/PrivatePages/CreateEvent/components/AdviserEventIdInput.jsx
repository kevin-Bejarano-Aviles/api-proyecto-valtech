import { useState } from 'react';
import iconSearch from '../../../../assets/icons/privatePage/icon-search.svg';

const AdviserEventIdInput = ({ label, name, adviserObjectList, areInputVisible, formik, initialValues, handleAreInputVisible }) => {
  const [selectedAdviser, setSelectedAdviser] = useState(null);

  const handleChangeSelectedAdviser = event => {
    setSelectedAdviser(event.target.innerText);
  };

  const handleChangeFormikValue = idAdviserSelected => {
    formik.values.adviser_event_id = idAdviserSelected.toString();
  };

  const handleClick = () => {
    handleAreInputVisible({
      ...initialValues,
      adviser_event_id: !(areInputVisible.adviser_event_id)
    });
  };

  return (
    <div className='relative flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
      <label htmlFor={name} className='text-sm'>{label}</label>
      <div className={`${areInputVisible.adviser_event_id ? 'border-green' : ''} ${selectedAdviser === null ? 'text-lightgray' : 'bg-inputbackground'} flex items-center h-10 rounded-lg cursor-pointer border-2`}>
        <div
          name={name}
          id={name}
          className='mobile:w-full h-full flex items-center tablet:max-w-[320px] pl-3 pr-2 text-sm appearance-none select-none truncate'
          onClick={handleClick}
          tabIndex='0'
          onBlur={formik.handleBlur}
        >
          {selectedAdviser || 'Seleccionar orientador'}
        </div>
        <img src={iconSearch} alt='' className='px-2' />
      </div>
      <ul className={`absolute top-[72px] z-10 list-none w-full h-[120px] overflow-x-auto rounded-lg border-2 shadow-lg ${areInputVisible.adviser_event_id ? '' : 'hidden'}`}>
        {adviserObjectList.map(adviser => (
          <li
            key={adviser.id}
            id={adviser.id}
            className={`${adviser.id % 2 === 0 ? 'bg-bgStudents' : 'bg-white'} h-10 flex items-center gap-3 pl-3 truncate cursor-pointer hover:font-bold hover:text-green`}
            onClick={event => {
              handleChangeSelectedAdviser(event);
              handleChangeFormikValue(adviser.id);
              formik.handleBlur(event);
            }}
          >
            {adviser.fullName}
          </li>
        ))}
      </ul>
      {formik.touched.adviser_event_id && formik.errors.adviser_event_id ? (
        <div className='text-red-500'>{formik.errors.adviser_event_id}</div>
      ) : null}
    </div>
  );
};

export default AdviserEventIdInput;