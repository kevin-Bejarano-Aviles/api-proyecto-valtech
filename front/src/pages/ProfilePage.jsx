// import { Link } from 'react-router-dom';
import HeaderAdmin from '../components/HeaderAdmin';
import Menu from '../components/Menu';
import ProfilePictureHeader from '../img/ProfilePictureHeader.svg';
import ProfilePicture from '../components/ProfilePicture';

function Profile() {
  const admin = JSON.parse(localStorage.getItem('admin'));
  const adminFirstName = admin.fullName.split(' ')[0,1];
  // const adminEmail = admin.email.split(' ')[0];
  const adminAvatar = admin.avatar.split(' ')[0];

  

  return (
   <div className='grid mobile:grid-cols-1 laptop:grid-cols-[234px_1fr] gap-0'>
      <Menu />
      <div>

        <HeaderAdmin Titulo={`¡Bienvenida, ${adminFirstName}!`} />
        <main className='mobile:max-w-max mobile:mx-auto laptop:mx-12 pb-12 mt-6'>
          <div className='mobile:flex-col mobile:gap-4 lap_tablet:flex-row flex items-center'>
            <h2 className='flex items-center justify-center h-[32px] w-[90px] text-2xl'>
              Mi perfil
            </h2>
          </div>
         
          <div className='h-[368px] w-[768px] absolute border-solid border-2 rounded-lg flex items-center justify-around mt-6'>

            <div className='h-[320px] w-[325px] py-6 p-[100px] '>
              <ProfilePicture 
              styles='w-32 rounded-full'
              picture={ProfilePictureHeader}
              alt='Admin'/>
            </div>

              <div className='h-[320px] w-[400px] border-l-2'>
               {`${adminFirstName}`}
              </div>

          </div>


        </main>

      </div>
           
   </div>
  )
}

export default Profile;