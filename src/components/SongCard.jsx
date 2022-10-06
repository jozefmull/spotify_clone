import {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'

import { Link } from 'react-router-dom'
import {MdPlayArrow, MdPause} from 'react-icons/md'

import Loader from '../components/Loader'
import DefaultImg from '../assets/images/default.png'

import styles from '../css/SongCard.module.css'

const SongCard = ({song, loading, data, id, activeSong, isPlaying}) => {
  const {dispatch} = useContext(GlobalContext)

  // catch click on icon wrapper and if child is play then play song if child is pause then pause it
  const catchPlayBtnClick = (e) => {
    // prevent default bcs of parent link to song details
    e.preventDefault()

    if (e.target.children[0].id === 'card-play-icon') {
      dispatch({type:'SET_ACTIVE_SONG', payload: {song: song , currentSongs: data, id} })
    }else if(e.target.children[0].id === 'card-pause-icon'){
      dispatch({type: 'PLAY_PAUSE', payload: false})
    }
  }

  return (
    <div className={`${styles.card} animate-slideup`}>
      {loading && <Loader/>}
      <Link to={`/song/${song.key}`}>
        <div>
          <img className='mb-4' src={song.images?.coverart ? song.images?.coverart : DefaultImg} alt="alt_text" width={'auto'} height={200}/>
          <div id='card-play-wrapper' className={styles.play_icon_wrapper} onClick={(e) => catchPlayBtnClick(e)}>
            {/* if is playing and active song key is equal to current song on card dispaly pause icon otherwise play icon */}
            {(isPlaying && activeSong.key === song.key) ? (
              <MdPause id='card-pause-icon' className={styles.play_icon} />
            ) : (
              <MdPlayArrow id='card-play-icon' className={styles.play_icon} />
            )}
          </div>
        </div>
        <h3 className='font-bold mb-2'>{song.title.length < 17 ? song.title : song.title.substring(0,17) + '...'}</h3>
        <span>{song.subtitle.length < 17 ? song.subtitle : song.subtitle.substring(0,17) + '...'}</span>
      </Link>
    </div>
  )
}

export default SongCard