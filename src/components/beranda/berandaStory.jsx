import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import {getAllProfileUsers, profileSelector } from '../../features/getDataProfileSlice';

const BerandaStory = () => {
  const dispatch = useDispatch();
  const profiles = useSelector(profileSelector.selectAll);

  useEffect(()=> {
    dispatch(getAllProfileUsers())
  }, [dispatch]);

  return (
    <div className='bg-story h-[9.5rem] max-h-[9.5rem] grid items-center justify-start p-5 grid-flow-col gap-5 overflow-x-auto overflow-y-hidden'>
      {profiles.map((profile, i) => (
        <div className="mt-8" key={profile.uuid}>
        <div className="grid items-center justify-center ring-red-600 ring-[3px] ring-offset-2 ring-offset-story rounded-full ">
          <img className='w-[70px] h-[70px] max-h-[70px] max-w-[70px] rounded-[100%] items-center pointer-events-none' src={profile.url_pic} alt="story"/>
        </div>
        <div className="grid justify-center mt-1.5">
          <font className='text-white text-[13px]'>{profile.user.username}</font>
        </div>
      </div>
      ))}
    </div>
  )
}
export default BerandaStory