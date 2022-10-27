import React from 'react';
import Icon from '../../../../assets/logo/vnegro.svg';
import MenuComponent from './MenuComponent';

/* const that i use later in NavLink classname */
function Menu() {
  return (
    <div className='hidden laptop:block h-screen'>
      <div className='w-[234px] min-h-screen bg-white border-r border-fixed border-bordergray z-30'>
        <div className='fixed'>
          <img
            className='ml-8 mr-auto mt-8 w-[166px] h-[41px] '
            src={Icon}
            alt=''
          />
          <div className='mt-[67px] w-[234px]'>
            <MenuComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Menu;
