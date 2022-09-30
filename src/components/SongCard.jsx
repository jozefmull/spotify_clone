import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { Link } from 'react-router-dom'

import styles from '../css/SongCard.module.css'

import {MdPlayArrow} from 'react-icons/md'

import Loader from '../components/Loader'

const SongCard = ({song}) => {
  const {songsByGenre} = useContext(GlobalContext)
  const {loading} = songsByGenre

  return (
    <div className={`${styles.card} animate-slideup`}>
      {loading && <Loader/>}
      <Link to={`/song/${song.key}`}>
        <div>
          <img className='mb-4' src={song.images.coverart} alt="alt_text" width={'auto'} height={184}/>
          <MdPlayArrow className={styles.play_icon}/>
        </div>
        <h3 className='font-bold mb-3'>{song.title.length < 30 ? song.title : song.title.substring(0,30) + '...'}</h3>
        <span>{song.subtitle.length < 30 ? song.subtitle : song.subtitle.substring(0,30) + '...'}</span>
      </Link>
      <div></div>
    </div>
  )
}

export default SongCard