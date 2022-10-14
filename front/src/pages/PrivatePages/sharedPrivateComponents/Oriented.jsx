/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import iconUser from '../../../assets/icons/privatePage/Icon_user.svg';

// eslint-disable-next-line react/prop-types
function Oriented({ info, asignOriented = false }) {
  const navigate = useNavigate();
  // eslint-disable-next-line react/prop-types
  const oriented = info.adviserId;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className='flex items-center justify-between gap-4 pl-6 w-80 h-24 list-none border-solid border-2 rounded-lg border-slate-200 cursor-pointer'
      onClick={() => {
        // eslint-disable-next-line react/prop-types
        navigate(`/orientados/${info.id}`);
      }}
    >
      <div className='flex  '>
        <img
          className='w-16 h-16 rounded-full ml-[-5px] mt-[-4px] mx-1'
          // eslint-disable-next-line import/no-dynamic-require, global-require, react/prop-types
          src={require(`../../../assets/students/${info.avatar}`)}
          alt=''
        />
        <div className='ml-2'>
          <h3 className='font-medium text-base'>{info.fullName}</h3>
          <h4 className='text-sm text-lightgray'>{info.school}</h4>
        </div>
      </div>
      {asignOriented && oriented && (
        <div
          className={`flex mb-12 mr-4 w-4 h-4  ${!asignOriented && 'hiden'}`}
        >
          <img src={iconUser} alt='iconUser' />
        </div>
      )}
    </div>
  );
}
export default Oriented;
