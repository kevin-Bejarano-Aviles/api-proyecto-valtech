import { Link } from 'react-router-dom';
import HeaderAdmin from '../components/HeaderAdmin';
import Menu from '../components/Menu';
// import OrientedList from '../components/OrientedList';

function Profile() {
  const admin = JSON.parse(localStorage.getItem('admin'));
  const adminFirstName = admin.fullName.split(' ')[0];

  return (
   <div className='grid mobile:grid-cols-1 laptop:grid-cols-[234px_1fr] gap-0'>
      <Menu />
      <div>

        <HeaderAdmin Titulo={`¡Bienvenida, ${adminFirstName}!`} />
        <main className='mobile:max-w-max mobile:mx-auto laptop:mx-12 pb-12 mt-6'>
          <div className='mobile:flex-col mobile:gap-4 lap_tablet:flex-row flex items-center'>
            <h2 className='flex items-center justify-center h-[32px] w-[90px] text-2xl '>
              Mi perfil
            </h2>
          </div>
          {/* <OrientedList/> */}


        </main>

      </div>
           <Link to={'/inicio/mi-perfil'}/> 
   </div>
  )
}

export default Profile;