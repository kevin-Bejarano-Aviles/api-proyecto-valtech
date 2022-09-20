import React from 'react'

function ProfilePicture( {picture, alt}) {
  return (
    <div >
      <img src={picture} alt={alt} className='h-12 w-[46px] rounded-full ' />
    </div>
  )
};

export default ProfilePicture;
