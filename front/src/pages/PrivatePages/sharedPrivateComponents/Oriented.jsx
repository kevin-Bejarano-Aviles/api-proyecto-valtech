import { useNavigate, useParams } from 'react-router-dom';
import icon_user from '../../../assets/icons/privatePage/Icon_user.svg'

function Oriented({ info ,asignOriented=false}) {

  const navigate = useNavigate();
  let oriented=info.adviserId;


  return (
    <div className='flex items-center justify-between gap-4 pl-6 w-80 h-24 list-none border-solid border-2 rounded-lg border-slate-200 cursor-pointer'
         onClick={() => {navigate(`/orientados/${info.id}`)}}>

        <div className='flex  '>
          <img className='w-16 h-16 rounded-full ml-[-5px] mt-[-4px] mx-1' src={require(`../../../assets/students/${info.avatar}`)} alt=''/>
            <div className='ml-2'>
              <h3 className='font-medium text-base'>{info.fullName}</h3>
              <h4 className='text-sm text-lightgray'>{info.school}</h4>
            </div> 
        </div>
        
          { 
            (asignOriented && oriented) && 
            <div className={`flex mb-8 mr-3 w-5 h-5 ${!asignOriented && 'hiden'}`}>
              <img src={icon_user} alt="iconUser" />
            </div>
          }

    </div>
  )
}
export default Oriented;
