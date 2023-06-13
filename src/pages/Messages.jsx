import React, { useEffect } from 'react';
import ComingSoon from '../components/maintenance/ComingSoon';
import BottomNavbar from '../components/beranda/bottomNavbar';

const Messages = () => {
  
  return (
    <div>
      <div className="bg-bg-instagram h-[100vh]">
        <ComingSoon />
      </div>
      <BottomNavbar/>
  </div>
  )
}

export default Messages