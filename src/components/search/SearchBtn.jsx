import React, { useEffect, useState } from 'react';
import { AiOutlineSearch }  from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const SearchBtn = ({ children }) => {
    const [isInputFocused, setIsInputFocused] = useState(false);
    // const [isNavigate , setIsNavigate] = useState(false);
    // const navigate  = useNavigate();

    // const navigateUsers = () => {
    //     navigate('/explore/search')
    // }

  return (
    <React.Fragment>
        <div className="">
            <div className='bg-bg-instagram h-12 max-h-12 grid place-items-center w-full fixed'>
                <form>
                <div className="relative group">
                <div className="absolute top-1 left-[150px] transition-transform transform">
                    <div className="flex items-center text-zinc-400 gap-1">
                    <AiOutlineSearch className={`text-[13.5px] ${isInputFocused ? 'mt-1' : 'mt-0'}`} />
                    <label htmlFor="" className={`text-[13px] ${isInputFocused ? `hidden` : 'visible'}`}>
                        Cari
                    </label>
                    </div>
                </div>
                <input
                    type="text"
                    className="appearance-none border w-[350px] py-1.5 px-5 text-white leading-tight focus:outline-none border-opacity-40 border-white  placeholder:text-[13px] text-[12px] rounded-md bg-black group-focus:shadow-outline"
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                />
                </div>
                </form>
            </div>
            <div className='pb-9'>
                {children}
            </div>
        </div>
    </React.Fragment>
  )
}

export default SearchBtn