import { useNavigate } from 'react-router-dom';

function Oriented({ info }) {
  const navigate = useNavigate();

  return (
    <div
      className='flex items-center gap-4 pl-6 w-80 h-24 list-none border-solid border-2 rounded-lg border-slate-200 cursor-pointer'
      onClick={() => {navigate(`/orientados/${info.id}`)}}>
      <img className='w-16 h-16 rounded-full ml-[-5px] mt-[-4px] mx-1' src={require(`../img/students/${info.avatar}`)} alt=''/>
      <div className=''>
        <h3 className='font-medium text-base'>{info.fullName}</h3>
        <h4 className='text-sm text-lightgray'>{info.school}</h4>
      </div>
    </div>
  )
}

export default Oriented;
