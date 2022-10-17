import React from 'react';

import Oriented from './Oriented';

function OrientedList({ asignOriented = false, users }) {
  const [seeMore, setSeeMore] = useState(false);

  return (
    <div>
      <ul className='grid mobile:grid-cols-1 lap_tablet:grid-cols-2 desktop:grid-cols-3 gap-4 mt-8 mb-2 max-w-max'>
        {users.length === 0
          ? 'No hay orientados'
          : users.map((user, index) =>
              index <= 8 ? (
                <Oriented
                  info={user}
                  asignOriented={asignOriented}
                  key={user.id}
                />
              ) : seeMore ? (
                <Oriented
                  info={user}
                  asignOriented={asignOriented}
                  key={user.id}
                />
              ) : (
                ''
              )
            )}
      </ul>
      {!asignOriented && (
        <div className='max-w-max'>
          <span
            className='ml-2 h-4 max-w-max underline cursor-pointer'
            onClick={() => setSeeMore(!seeMore)}
          >
            {users.length === 0 ? (
              ''
            ) : seeMore ? (
              <p>Ver menos orientados</p>
            ) : (
              <p>Ver mas orientados</p>
            )}
          </span>
          <div
            className={
              users.length === 0
                ? 'hidden'
                : 'relative -z-10 bottom-[11px] h-3 bg-yellow'
            }
           />
        </div>
      )}
    </div>
  );
}
export default OrientedList;
