import React from 'react'

import NavLinks from './NavLinks'

import styles from '../css/TopBar.module.css'

const MobileMenu = ({handleClick}) => {
  return (
    <div className={styles.mobile_menu}>
        <NavLinks handleClick={handleClick} mobile={true}/>
    </div>
  )
}

export default MobileMenu