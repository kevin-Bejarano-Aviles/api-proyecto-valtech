import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useGet from '../hooks/useGet';
import HeaderAdmin from '../sharedPrivateComponents/header/HeaderAdmin';
import Menu from '../sharedPrivateComponents/menu/Menu';

import Button from '../sharedPrivateComponents/button/Button';
import Search from '../sharedPrivateComponents/Search';
import OrientedList from '../sharedPrivateComponents/OrientedList';

// see orientedList
function Orienteds() {
  const { studentList, getAllStudents } = useGet();
  const [search, SetSearch] = useState('');
  const [showAll, setShowAll] = useState(true);

  const handleSearch = (event) => {
    SetSearch(event.target.value);
    if (search.length > 1) {
      setShowAll(false);
    } else {
      setShowAll(true);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  const studentsListShow = showAll
    ? studentList
    : studentList.filter((user) =>
        user.fullName.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <div className='grid mobile:grid-cols-1 laptop:grid-cols-[234px_1fr] gap-0'>
      <Menu />
      <div>
        <HeaderAdmin Titulo='Orientados' />
        <main className='mobile:max-w-max mobile:mx-auto laptop:mx-12 pb-12 mt-6'>
          <div className='mobile:flex-col mobile:gap-4 lap_tablet:flex-row flex items-center'>
            <div>
              <h2 className='flex items-center justify-center h-[32px] w-[305px] border-b-8 pt-5 border-backgroundGray text-2xl'>
                Nuevos usuarios a orientar
              </h2>
            </div>
            <div className='w-full flex justify-end py-3'>
              <Link to='/orientados/alta-orientado'>
                <Button type='button' name='Ingresar orientado' />
              </Link>
            </div>
          </div>

          <div className='relative mt-8'>
            <Search
              placeholder='Buscar orientado por nombre y apellido'
              handleChange={handleSearch}
            />
            <OrientedList users={studentsListShow} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Orienteds;
