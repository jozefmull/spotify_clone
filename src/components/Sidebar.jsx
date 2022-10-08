import {MdMusicNote} from 'react-icons/md'
import NavLinks from './NavLinks'

import styles from '../css/Sidebar.module.css'

const Sidebar = () => {
  return (
    <div className={`${styles.sidebar} px-5 py-3 min-w-[250px] w-full max-w-[250px] animate-slidedown`}>
    <div className='flex text-white  h-[50px] justify-start items-center'>
      <MdMusicNote className='mr-2 h-[40px] w-[40px]'/>  <em className='font-semibold text-2xl'>Music</em>
    </div>
    <div className="mt-7">
      <NavLinks mobile={false}/>
    </div>
  </div>
  )
}

export default Sidebar