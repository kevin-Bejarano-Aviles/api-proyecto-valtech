function Oriented({ info }) {
  return (
    <div className='w-60 h-42 inline-block list-none py-2 mx-2 my-3 px-2 border-solid border-2 rounded-md border-slate-200 relative bottom-[540px] left-[265px]  '>
      {/* <img className='w-24 h-24 rounded-full' src={require(`../img/students/${info.avatar}`)} alt='image'/> */}
      <h3 className='font-medium text-base'>{info.fullName}</h3>
      <h4 className='text-sm text-blue'>{info.school}</h4>
    </div>
  )
}

export default Oriented;
