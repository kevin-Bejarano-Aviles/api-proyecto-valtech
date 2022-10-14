import { useState } from 'react';
import iconSearch from '../../../../assets/icons/privatePage/icon-search.svg';

const AdviserEventIdInput = ({ label, name, adviserObjectList, areInputVisible, formik, onChangeInputVisibility }) => {
  const [selectedAdviser, setSelectedAdviser] = useState(null);

  const handleChangeSelectedAdviser = event => {
    setSelectedAdviser(event.target.innerText);
  };

  const handleChangeInputValue = idAdviserSelected => {
    formik.values.adviser_event_id = idAdviserSelected.toString();
  };

  const handleChangeFocusColor = () => {

  };

  return (
    <div className='relative flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
      <label htmlFor={name} className='text-sm'>{label}</label>
      <div className={`${areInputVisible.adviser_event_id ? 'border-green' : ''} flex items-center h-10 rounded-lg cursor-pointer border-2`}>
        <div
          name={name}
          id={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.adviser_event_id}
          className={`mobile:w-full tablet:max-w-[320px] pl-3 pr-2 text-sm appearance-none select-none truncate`}
          onClick={onChangeInputVisibility}
        >
          <p className={`${selectedAdviser === null ? 'text-lightgray' : ''}`}>{selectedAdviser || 'Selecciona orientador'}</p>
        </div>
        <img src={iconSearch} alt='' className='px-2' />
      </div>
      <ul className={`absolute top-[72px] z-10 list-none w-full h-[120px] overflow-x-auto rounded-lg border-2 shadow-lg ${areInputVisible.adviser_event_id ? '' : 'hidden'}`}>
        {adviserObjectList.map(adviser => (
            <li
              key={adviser.id}
              className={`${adviser.id % 2 === 0 ? 'bg-bgStudents' : 'bg-white'} h-10 flex items-center gap-3 pl-3 truncate cursor-pointer hover:font-bold hover:text-green`}
              onClick={event => {
                handleChangeSelectedAdviser(event);
                handleChangeInputValue(adviser.id);
                handleChangeFocusColor();
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