import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'

import styles from '../css/SongCard.module.css'

import {MdPlayArrow} from 'react-icons/md'

import Loader from '../components/Loader'



const SongCard = ({song}) => {
  const context = useContext(GlobalContext)
  const {loading} = context

  return (
    <div className={styles.card}>
      {loading && <Loader/>}
        <div>
          <img className='mb-4' src={song.images.coverart} alt="alt_text" width={'auto'} height={184}/>
          <MdPlayArrow className={styles.play_icon}/>
        </div>
        <h3 className='font-bold mb-3'>{song.title}</h3>
        <span>{song.subtitle}</span>
    </div>
  )
}

export default SongCard