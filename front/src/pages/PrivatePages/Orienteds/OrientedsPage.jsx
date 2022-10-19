import {React, UseState, useContext,useEffect} from 'react';
import axios from 'axios';
import useGet from '../hooks/useGet';
import HeaderAdmin from '../sharedPrivateComponents/header/HeaderAdmin';
import Menu from '../sharedPrivateComponents/menu/Menu';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../sharedPrivateComponents/button/Button';
import Search from '../sharedPrivateComponents/Search';
import OrientedList from '../sharedPrivateComponents/OrientedList';
import Context from '../../../context/Context';

import { Link } from 'react-router-dom';



//see orientedList
function Orienteds() {
  const {getAllStudentsList,listStudent}=useGet()
  const [search, SetSearch] = useState('');
  const [showAll, setShowAll] = useState(true);

  const handleSearch = (event) => {
    // If the input is empty, show one that meets the criteria. Otherwise, the message was not found.
    console.log(event.target.value);
    SetSearch(event.target.value);
    if (search.length > 1) {
      setShowAll(false);
    } else {
      setShowAll(true);
    }
  };

  useEffect(() => {
    getAllStudentsList();
  });

  const studentsListShow = showAll
    ? listStudent
    : listStudent.filter((user) =>
        user.fullName.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <div className='grid mobile:grid-cols-1 laptop:grid-cols-[234px_1fr] gap-0'>
      <Menu />
      <div>
        <HeaderAdmin Titulo={`Orientados`} />
        <main className='mobile:max-w-max mobile:mx-auto laptop:mx-12 pb-12 mt-6'>
          <div className='mobile:flex-col mobile:gap-4 lap_tablet:flex-row flex items-center'>
            <div>
              <h2 className='flex items-center justify-center h-[32px] w-[305px] border-b-8 pt-5 border-backgroundGray text-2xl'>
                Nuevos usuarios a orientar
              </h2>
            </div>
            <div className='w-full flex justify-end py-3'>
              <Link to={'/orientados/alta-orientado'}>
                <Button type='button' name='Ingresar orientado' />
              </Link>
            </div>
          </div>

          <div className='relative mt-8'>
            <Search
              placeholder={`Buscar orientado por nombre y apellido`}
              handleChange={handleSearch}
            />
            <OrientedList asignOriented users={studentsListShow} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Orienteds;
