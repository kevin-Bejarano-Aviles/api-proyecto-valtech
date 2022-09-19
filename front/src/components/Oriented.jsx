function Oriented({ info }) {
  return (
    <div className="w-[940px] h-[100px] flex">
      <div className='w-60 h-42 list-none py-2 mx-2 my-3 px-2 border-solid border-2 rounded-md border-slate-200 flex'>
        <img className='w-16 h-16 rounded-full ml-[-5px] mt-[-4px] mx-1' src={require(`../img/students/${info.avatar}`)} alt=''/>
       <div className="">
        <h3 className='font-medium text-base'>{info.fullName}</h3>
        <h4 className='text-sm text-blue'>{info.school}</h4>
       </div>
     </div>
  </div>
  )
}

export default Oriented;
