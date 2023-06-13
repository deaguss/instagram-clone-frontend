import React, { useEffect } from 'react';
import NavbarAddPost from '../components/beranda/navbarAddPost';
import BerandaPost from '../components/beranda/berandaPost';
import BerandaStory from '../components/beranda/berandaStory';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import BottomNavbar from '../components/beranda/bottomNavbar';
const Beranda = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, message} = useSelector((state) => state.authentication);
 
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if(isError){
      navigate("/login");
    }
  },[isError, message, navigate]);

  return (
    <div className='bg-black h-[100vh]'>
        <BottomNavbar>
          <NavbarAddPost />
          <BerandaStory />
          <div className="pb-12">
            <BerandaPost />
          </div>
        </BottomNavbar>
    </div>
      
  ) 
}

export default Beranda