import Icon_Search from '../img/Icon_search.svg';


function Search({placeholder}) {
    return ( 
    <label className='relative block w-full lap_tablet:w-3/5'>
        <input className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' placeholder={placeholder} type='text' name='search'/>
        <span className='sr-only'>Search</span>
        <span className='absolute inset-y-0 right-0 flex items-center pr-2'>
            <img src={Icon_Search} alt='Icon_Search' />  
        </span>
    </label>
     );
}

export default Search;