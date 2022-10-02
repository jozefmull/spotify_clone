import {FaSpotify} from 'react-icons/fa'
import NavLinks from './NavLinks'

import styles from '../css/Sidebar.module.css'



const Sidebar = () => {

  return (
    <div className={`${styles.sidebar} px-5 py-3 bg-black min-w-[250px] w-full max-w-[250px] animate-slidedown`}>
    <div className='flex text-white  h-[50px] justify-start items-center'>
      <FaSpotify className='mr-2 h-[40px] w-[40px]'/>  <em className='font-semibold text-2xl'>NotSpotify</em>
    </div>
    <div className="mt-7">
      <NavLinks mobile={false}/>
    </div>
  </div>
  )
}

export default Sidebar