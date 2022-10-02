import React, { useState } from 'react'
import { useNavigate  } from "react-router-dom";

import {MdArrowBackIosNew, MdArrowForwardIos, MdMenu} from 'react-icons/md';

import MobileMenu from './MobileMenu';

import styles from '../css/TopBar.module.css'

const TopBar = () => {
  let navigate = useNavigate ()

  const [open, setopen] = useState(false)

  const handleClick = () => {
    setopen(!open)
  }
    
  return (
    <div className={`${styles.topbar} py-3 px-10 h-[60px] min-h-[65px] mb-0 text-white absolute animate-slidedown flex justify-between items-center`}>
      <div className={styles.arrowWrap}>
        <MdArrowBackIosNew onClick={() => navigate(-1)}/>
        <MdArrowForwardIos onClick={() => navigate(1)}/>
      </div>
      <MdMenu onClick={() => handleClick()}/>
      {open && <MobileMenu handleClick={handleClick}/>}
    </div>
  )
}

export default TopBar