import React from 'react'
import {MdSearch} from 'react-icons/md'

import styles from '../css/Search.module.css'

const Search = () => {
  return (
    <div className='py-5 px-10 overflow-y-scroll pb-[75px] pt-[85px]  text-white'>
       <h1 className='font-bold text-white text-3xl mt-2 mb-4 ml-2 animate-slideup'>Search</h1>
       <div className={styles.inputwrap}>
          <input className={`${styles.input} animate-slideup`} type="text" name="search" id="search" placeholder='What do you want to listen to?'/>
          <MdSearch className='animate-slideup'/>
       </div>
      
    </div>
  )
}

export default Search