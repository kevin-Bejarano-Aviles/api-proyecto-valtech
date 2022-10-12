import HeaderAdmin from '../sharedPrivateComponents/header/HeaderAdmin';
import Menu from '../sharedPrivateComponents/menu/Menu';
import ProfilePictureHeader from '../../../assets/admins/ProfilePictureHeader.svg';
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
        <main className='mobile:max-w-max mobile:mx-auto laptop:mx-12 pb-12 mt-6'>
          <div className='mobile:flex-col mobile:gap-4 lap_tablet:flex-row flex items-center'>
            <h2 className='flex items-center justify-center h-[32px] w-[90px] text-2xl text-blue'>
              Mi perfil
            </h2>
          </div>
          <div className='h-[368px] w-[768px] absolute border-solid border-2 rounded-lg flex items-center justify-around mt-6'>
            <div className='h-[320px] w-[325px] py-5 p-[100px] '>
              <ProfilePicture 
              styles='w-32 rounded-full'
              picture={ProfilePictureHeader}
              alt='admin'/>
            </div>
              <div className='h-[320px] w-[400px] border-l-2 pl-4 py-5'>

              <h2 className=' text-2xl'>{`${adminFirstName} ${adminSecondName}`}</h2>
              <h6 className='text-sm mt-2 mb-6 text-lightgray'>Administradora</h6>

              <h6 className='text-xs text-lightgray'>EMAIL</h6>
              <h5 className='mb-6 mt-1'>{`${adminEmail}`}</h5>

              <h6 className='text-xs text-lightgray'>TELÉFONO</h6>
              <h5 className='mb-6 mt-1'>1553678990</h5>  
              {/* me falta traer estos datos del back oo dejarlos fijos !!!!!!!!!!!!!!! preguntar */}
              <h6 className='text-xs text-lightgray'>LINKED IN</h6>
              <h5 className='mb-6  mt-1'>Sofia.serrano</h5>
              </div>
          </div>
        </main>
      </div>
           
   </div>
  )
}

export default Profile;