import React, { useEffect } from 'react'
import BottomNavbar from '../components/beranda/bottomNavbar';
import SearchBtn from '../components/search/SearchBtn';
import BerandaAllPost from '../components/search/BerandaAllPost';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const Search = () => {
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
    <>
      <BottomNavbar>
        <SearchBtn>
          <BerandaAllPost />
        </SearchBtn>
      </BottomNavbar>
    </>
  )
}

export default Search