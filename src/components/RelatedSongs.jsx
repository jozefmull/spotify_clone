import React, {useContext, useEffect} from 'react'
// import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState'
import { Link } from 'react-router-dom'

import { MdPlayArrow, MdPause } from 'react-icons/md'
import DefaultImg from '../assets/images/default.png'

import Loader from '../components/Loader'
import Notification from '../components/Notification'

import styles from '../css/SongDetails.module.css'

const RelatedSongs = ({songid, song}) => {
  // data from context
  const {getRelatedSongs, relatedSongs, playerData, dispatch} = useContext(GlobalContext)
  const {loading, error, data} = relatedSongs
  const {activeSong, isPlaying} = playerData

  // on component mount get realted song
  useEffect(() => {
    getRelatedSongs(songid)
    // eslint-disable-next-line
  }, [])
    
  // if song id from url parameters changes get related songs of that song
  useEffect(() => {
    getRelatedSongs(songid)
    // eslint-disable-next-line
  }, [songid])
  
  //handle play - e prevent default bcs of parent link
  const handlePlay = (e, related, id) => {
    e.preventDefault()
    //related songs item handle play - set active song to current related sung, current songs to data with appended current song details to beggining and id + 1
    dispatch({type:'SET_ACTIVE_SONG', payload: {song: related, currentSongs: [song, ...data], id} })
  }
  //handle pause - e prevent default bcs of parent link
  const handlePause = (e) => {
    e.preventDefault()
    dispatch({type: 'PLAY_PAUSE', payload:false})
  } 

  //if related songs are loading display loader
  if (loading) {
   return (
      <div className='mt-4 relative min-h-[25px] w-full'>
        <Loader />
      </div>
    )
  }
  //if we have an error while loading related songs display notification
  if (error && error.message) {
    return  <Notification type='error' message={error.message} title='Error' />
  }
  // if we have some data and length of them is higher tan 0 then map through data and display songs in a list
  return (
    <ul className={styles.relatedSongsWrapper}>
        {data.length > 0 && data.map((related, id) => (
            //css styles relatedSongs and animate + if song is playing and key of active song is equal to this particular item then add related_active class
            <li className={`${styles.relatedSong} animate-slideup ${isPlaying && activeSong.key === related.key ? styles.related_active : null}`}
              key={`song-artist-${related?.key}-${related?.title}`}
              >
                <Link to={`/song/${related.key}`}>
                  {/* if isPlaying and activesong key is equal to this related song key then display pause button else dispaly span */}
                  {isPlaying && activeSong.key === related.key ? (
                    <MdPause className={styles.pause_icon} onClick={(e) => handlePause(e)}/>
                  ) : (
                    <span>{id + 1}</span>
                  )}
                  {/* play button has display none and display unset on hover except on hover of active playing related song */}
                  <MdPlayArrow className={styles.play_icon} 
                    onClick={(e) => handlePlay(e, related, id + 1)}
                    />
                  <img src={related.images?.coverart ? related.images?.coverart : DefaultImg } alt="song_image" width={45} height={45} />
                  <h3 className='font-semibold text-sm'>{related.title.length < 40 ? related.title : related.title.substring(0,40) + '...'}</h3>
                </Link>
            </li>
        ))}
    </ul>
  )
}
// react memo is supposed to remember this component and rerender it only if related songs change
export default React.memo(RelatedSongs)