function Oriented({ info }) {
  return (
    <div className='w-60 h-42 flex flex-wrap '>
      <img className='w-24 h-24 rounded-full' src={require(`../img/students/${info.avatar}`)} alt='image'/>
      <h3 className='font-medium text-base'>{info.fullName}</h3>
      <h4 className='text-sm '>{info.school}</h4>
    </div>
  )
}

export default Oriented;
