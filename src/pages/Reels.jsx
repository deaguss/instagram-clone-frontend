import React, { useEffect } from 'react'
import BottomNavbar from '../components/beranda/bottomNavbar';
import ComingSoon from '../components/maintenance/ComingSoon';
const Reels = () => {


  return (
    <div>
      <div className="bg-bg-instagram h-[100vh]">
        <ComingSoon />
      </div>
      <BottomNavbar/>
    </div>
  )
}

export default Reels