import { Link } from 'react-router-dom'
import {MdPlayArrow} from 'react-icons/md'

import Loader from '../components/Loader'
import DefaultImg from '../assets/images/default.png'

import styles from '../css/SongCard.module.css'

const SongCard = ({song, loading}) => {

  return (
    <div className={`${styles.card} animate-slideup`}>
      {loading && <Loader/>}
      <Link to={`/song/${song.key}`}>
        <div>
          <img className='mb-4' src={song.images?.coverart ? song.images?.coverart : DefaultImg} alt="alt_text" width={'auto'} height={184}/>
          <MdPlayArrow className={styles.play_icon}/>
        </div>
        <h3 className='font-bold mb-2'>{song.title.length < 30 ? song.title : song.title.substring(0,30) + '...'}</h3>
        <span>{song.subtitle.length < 30 ? song.subtitle : song.subtitle.substring(0,30) + '...'}</span>
      </Link>
      <div></div>
    </div>
  )
}

export default SongCard