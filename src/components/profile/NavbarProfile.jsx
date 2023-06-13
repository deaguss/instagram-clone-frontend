import React from 'react';
import { FiSettings } from 'react-icons/fi';
import { BsFillPeopleFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const NavbarProfile = () => {
    const { users } = useSelector((state => state.authentication));
  return (
    <div className='bg-bg-instagram text-white grid grid-flow-col place-content-between p-2 items-center fixed w-full border-b border-zinc-300 border-opacity-20'>
        <div className="">
            <FiSettings className='text-[20px]'/>
        </div>
        <div className="">
            <h5 className='text-[16px] font-semibold'>{users && users.username}</h5>
        </div>
        <div className="">
            <BsFillPeopleFill className='text-[20px]'/>
        </div>
    </div>
  )
}

export default NavbarProfile