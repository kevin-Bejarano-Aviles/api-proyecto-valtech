import React from 'react';
import HeaderAdmin from '../sharedPrivateComponents/header/HeaderAdmin';
import Menu from '../sharedPrivateComponents/menu/Menu';
import Avatar from '../../../assets/admins/default.jpg';
import ProfilePicture from '../sharedPrivateComponents/ProfilePicture';

function Profile() {
  const admin = JSON.parse(localStorage.getItem('admin'));
  const adminFirstName = admin.fullName.split(' ')[0];
  const adminSecondName = admin.fullName.split(' ')[1];
  const adminEmail = admin.email;

  return (
    <div className='grid mobile:grid-cols-1 laptop:grid-cols-[234px_1fr] gap-0'>
      <Menu />
      <div>
        <HeaderAdmin Title={`¡Bienvenida, ${adminFirstName}!`} />
        <main className='mobile:mx-auto py-4 flex flex-row relative bottom-10 ml-[46px] mr-6 mt-16 mobile:flex-col lap_tablet:flex-col  tablet:flex-col laptop:flex-row items-center laptop:ml-[50px] laptop:mt-[300px]'>
          <div className='mobile:flex-col mobile:gap-4 lap_tablet:flex-row flex items-center '>
            <h2 className='flex items-center justify-center h-[32px] w-[90px] text-2xl text-blue laptop:z-10 laptop:relative laptop:top-[-250px]'>
              Mi perfil
            </h2>
          </div>
          <div className='h-[368px] w-[768px] absolute border-solid border-2 rounded-lg flex items-center justify-around mt-10 mobile:w-full mobile:h-[500px] mobile:flex-col mobile:mx-auto mobileM:w-[475px]  mobileL:mx-auto laptop:flex-row laptop:w-[700px] laptop:h-[400px]'>
            <div className='h-[320px] w-[325px] py-5 p-[100px] '>
              <ProfilePicture
                styles='w-32 h-32 rounded-full'
                picture={Avatar}
                alt='admin'
              />
            </div>
            <div className='h-[320px] w-[400px] laptop:border-l-2 pl-4 py-5  mobile:w-[200px] laptop:relative laptop:left-[-125px]'>
              <h2 className=' text-2xl'>{`${adminFirstName} ${adminSecondName}`}</h2>
              <h6 className='text-sm mt-2 mb-6 text-lightgray'>
                Administradora
              </h6>

              <h6 className='text-xs text-lightgray'>EMAIL</h6>
              <h5 className='mb-6 mt-1'>{`${adminEmail}`}</h5>

              <h6 className='text-xs text-lightgray'>TELÉFONO</h6>
              <h5 className='mb-6 mt-1'>1553678990</h5>

              <h6 className='text-xs text-lightgray'>LINKED IN</h6>
              <h5 className='mb-6  mt-1'>Sofia.serrano</h5>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;