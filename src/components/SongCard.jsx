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
          <img className='mb-4' src={song.images?.coverart ? song.images?.coverart : DefaultImg} alt="alt_text" width={'auto'} height={200}/>
          <MdPlayArrow className={styles.play_icon}/>
        </div>
        <h3 className='font-bold mb-2'>{song.title.length < 17 ? song.title : song.title.substring(0,17) + '...'}</h3>
        <span>{song.subtitle.length < 17 ? song.subtitle : song.subtitle.substring(0,17) + '...'}</span>
      </Link>
    </div>
  )
}

export default SongCard