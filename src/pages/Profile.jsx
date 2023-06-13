import React, {useEffect} from 'react'
import BottomNavbar from '../components/beranda/bottomNavbar';
import NavbarProfile from '../components/profile/NavbarProfile';
import ProfileDetail from '../components/profile/ProfileDetail';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const Profile = () => {
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
    <BottomNavbar>
      <NavbarProfile />
      <ProfileDetail />
    </BottomNavbar>
  )
}

export default Profile