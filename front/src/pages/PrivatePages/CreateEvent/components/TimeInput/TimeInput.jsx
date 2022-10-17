import { useState } from 'react';
import iconArrow from '../../../../../assets/icons/privatePage/list-control.svg';
import timeInputValues from './timeInputValues.json';

const TimeInput = ({ label, name, areInputVisible, formik, onChangeInputVisibility }) => {
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <div className='relative flex flex-col gap-1 tablet:grow tablet:max-w-[320px]'>
      <label htmlFor={name} className='relative -z-10 text-sm'>{label}</label>
      <div className={`${areInputVisible.time ? 'border-green' : ''} flex items-center h-10 rounded-lg cursor-pointer border-2`}>
        <div
          name={name}
          id={name}
          // onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          // value={formik.values.time}
          className='mobile:w-full tablet:max-w-[320px] pl-3 pr-2 text-sm appearance-none select-none truncate'
          onClick={onChangeInputVisibility}
        >
          <p className={`${selectedTime === null ? 'text-lightgray' : ''}`}>{selectedTime || 'Ingresar Fecha'}</p>
        </div>
        <img src={iconArrow} alt='' className='px-2 w-[32px]' />
      </div>
      <div className={`absolute top-[72px] z-10 flex list-none w-full h-[120px] overflow-x-auto rounded-lg border-2 shadow-lg ${areInputVisible.time ? '' : 'hidden'}`}>
        <ul className='basis-1/2'>
          {timeInputValues.hours.map(hour => (
            <li
              key={hour}
              className={`${hour % 2 === 0 ? 'bg-bgStudents' : 'bg-white'} w-full h-10 flex items-center pl-3 cursor-pointer hover:font-bold hover:text-green`}
              // onClick={event => {
              //   handleChangeSelectedAdviser(event);
              //   handleChangeInputValue(adviser.id);
              // }}
            >
              {hour}
            </li>
          ))}
        </ul>
        {/* <ul className='overflow-auto basis-1/2' id='hour'>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>00</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>01</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>02</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>03</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>04</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>05</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>06</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>07</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>08</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>09</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>10</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>11</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>12</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>13</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>14</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>15</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>16</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>17</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>18</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>19</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>20</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>21</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>22</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>23</li>
        </ul> */}
        {/* <ul className='overflow-auto basis-1/2' id='minute'>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>00</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>01</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>02</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>03</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>04</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>05</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>06</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>07</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>08</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>09</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>10</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>11</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>12</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>13</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>14</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>15</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>16</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>17</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>18</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>19</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>20</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>21</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>22</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>23</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>24</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>25</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>26</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>27</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>28</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>29</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>30</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>31</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>32</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>33</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>34</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>35</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>36</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>37</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>38</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>39</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>40</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>41</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>42</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>43</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>44</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>45</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>46</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>47</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>48</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>49</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>50</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>51</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>52</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>53</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>54</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>55</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>56</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>57</li>
          <li className={`${styleItem} bg-white`} onClick={e => handleSelectedTime(e)}>58</li>
          <li className={`${styleItem} bg-bgStudents`} onClick={e => handleSelectedTime(e)}>59</li>
        </ul> */}
      </div>
      {formik.touched.time && formik.errors.time ? (
        <div className='text-red-500'>{formik.errors.time}</div>
      ) : null}
  </div>
  );
};

export default TimeInput;