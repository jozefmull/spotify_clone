import React from 'react'
import { useNavigate  } from "react-router-dom";

import {MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

import styles from '../css/TopBar.module.css'

const TopBar = () => {
  let navigate = useNavigate ()
    
  return (
    <div className={`${styles.topbar} py-3 px-10 h-[60px] min-h-[65px] mb-0 text-white absolute animate-slidedown`}>
      <div className={styles.arrowWrap}>
        <MdArrowBackIosNew onClick={() => navigate(-1)}/>
        <MdArrowForwardIos onClick={() => navigate(1)}/>
      </div>
    </div>
  )
}

export default TopBar