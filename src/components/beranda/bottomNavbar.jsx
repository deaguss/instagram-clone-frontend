import React, { useEffect } from 'react';
import { AiFillHome, AiOutlineSearch, AiOutlineMessage } from 'react-icons/ai';
import { MdOutlineVideoLibrary } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProfileUsers, profileSelector } from '../../features/getDataProfileSlice';
import { mappingProfile } from '../../utils/forEachData';
import noAvatar from '../../resources/img/noavatar.png';

const BottomNavbar = ({ children }) => {
    const profiles = useSelector(profileSelector.selectAll);
    const { users } = useSelector((state) => state.authentication);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      dispatch(getAllProfileUsers())
    }, [dispatch, users]);

    const dataPicPro = mappingProfile(profiles, users);
    const HandlePageChanges = (path) => {
        navigate(path);
      }
    
      const renderButton = (path, icon) => {
        return (
          <button 
            type='button' 
            onClick={() => HandlePageChanges(path)}
            className={location.pathname === path ? 'active' : ''}
          >
            {icon}
          </button>
        );
      }
  return (
    <>
    <div className='fixed w-[100%] bg-bg-instagram text-white grid grid-flow-col py-4 px-6 bottom-0 border  border-black '>
      {renderButton('/beranda', <AiFillHome className='text-[24px]'/>)}
      {renderButton('/explore', <AiOutlineSearch className='text-[24px]'/>)}
      {renderButton('/reels', <MdOutlineVideoLibrary className='text-[24px]'/>)}
      {renderButton('/message', <AiOutlineMessage className='text-[24px]'/>)}
      {renderButton('/profile', <img className='w-[24px] max-w-[24px] rounded-xl -mr-6' alt='img' src={users && dataPicPro[users.uuid] &&dataPicPro[users.uuid] ? users && dataPicPro[users.uuid] : noAvatar}/> )}
    </div>
    <main>
      {children}
    </main>
    </>
  )
}

export default BottomNavbar