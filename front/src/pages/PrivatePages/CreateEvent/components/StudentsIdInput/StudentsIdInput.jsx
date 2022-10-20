import { useState, useEffect } from 'react';
import iconSearch from '../../../../../assets/icons/privatePage/icon-search.svg';
import './StudentsIdInput.css';

function StudentsIdInput({ label, name, studentObjectList, areInputVisible, formik, onChangeInputVisibility }) {
  const [selectedStudents, setSelectedStudents] = useState({ids: [], names: []});

  const handleChangeSelectedStudents = (event, studentId, studentFullName) => {
    if (event.target.checked) {
      setSelectedStudents({
        ids: [...selectedStudents.ids, studentId.toString()],
        names: [...selectedStudents.names, studentFullName]
      });
    } else {
      setSelectedStudents({
        ids: selectedStudents.ids.filter(id => id !== studentId.toString()),
        names: selectedStudents.names.filter(name => name !== studentFullName)
      });
    }
  };

  const handleValidateErrors = () => {
    if (selectedStudents.ids.length === 0) {
      formik.setErrors({ ...formik.errors, studentsId: 'Required'});
    } else {
      formik.setErrors({ ...formik.errors, studentsId: ''});
    }
  };

  const handleChangeFormikValue = () => {
    formik.values.studentsId = selectedStudents.ids;
  };

  useEffect(() => {
    handleValidateErrors();
    handleChangeFormikValue();
  },[selectedStudents]);

  return (
    <div className='relative flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
      <label htmlFor={name} className='text-sm'>{label}</label>
      <div className={`${areInputVisible.studentsId ? 'border-green' : ''} flex items-center h-10 border-2 rounded-lg overflow-hidden cursor-pointer`}>
        <div
          name={name}
          id={name}
          className={`${selectedStudents.ids.length === 0 ? 'text-lightgray' : ''} mobile:w-[284px] h-full flex items-center pl-3 text-sm appearance-none select-none`}
          onClick={onChangeInputVisibility}
          tabIndex='0'
          onBlur={formik.handleBlur}
        >
          <p className='truncate'>{selectedStudents.ids.length === 0 ? 'Seleccionar orientado' : selectedStudents.names.join(', ')}</p>
        </div>
        <img src={iconSearch} alt='' className='px-2' />
      </div>
      <ul className={`${areInputVisible.studentsId ? '' : 'hidden'} absolute z-10 top-[72px] w-full h-[120px] overflow-x-auto rounded-lg border-2 shadow-lg`}>
        {studentObjectList.map(student => (
          <li key={student.id} className={`${student.id % 2 === 0 ? 'bg-bgStudents' : 'bg-white'} h-10 flex items-center gap-3 pl-3`}>
            <input
              className='input-checked'
              type='checkbox'
              id={student.fullName}
              onClick={(event) => handleChangeSelectedStudents(event, student.id, student.fullName)}
            />
            <label htmlFor={student.fullName} className='relative pl-6 w-full cursor-pointer label-checked'>
              {student.fullName}
            </label>
          </li>
        ))}
      </ul>
      {formik.touched.studentsId && formik.errors.studentsId ? (
        <div className='text-red-500'>{formik.errors.studentsId}</div>
      ) : null}
  </div>
  );
};

export default StudentsIdInput;