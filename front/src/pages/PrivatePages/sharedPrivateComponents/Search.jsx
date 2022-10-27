import Icon_Search from '../../../assets/icons/privatePage/icon-search.svg';

function Search({ placeholder, handleChange }) {
  return (
    <label className='relative block w-full tablet:mx-0 tablet:w-4/5 lap_tablet:w-3/5'>
      <input
        className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md pl-2 py-2 tablet:pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-sm sm:text-sm'
        placeholder={placeholder}
        type='text'
        name='search'
        onChange={handleChange}
      />
      <span className='sr-only'>Search</span>
      <span className='absolute inset-y-0 right-0 flex items-center pr-2'>
        <img src={Icon_Search} className='' alt='Icon_Search' />
      </span>
    </label>
  );
}

export default Search;
