import React,{useEffect, useContext, useState} from 'react'
import { useParams } from 'react-router-dom'

import { GlobalContext } from '../context/GlobalState'
import {MdPlayArrow, MdFavoriteBorder, MdFavorite} from 'react-icons/md'

// import Notification from '../components/Notification'
import Loader from '../components/Loader'
import Notification from '../components/Notification'

import styles from '../css/SongDetails.module.css'

const SongDetails = () => {
  const {songid}  = useParams()
  const [favourite, setfavourite] = useState(false)
  
  const {getSongDetails, songDetails} = useContext(GlobalContext)
  const {loading, error, data} = songDetails

  const handleClick = () => {
    setfavourite(!favourite)
  }

  useEffect(() => {
    // getSongDetails(songid)
    // eslint-disable-next-line
  }, [songid])

  return (
    <div className={styles.wrapper}>
       {error && error.message && <Notification type='error' message={error.message} title='Error' />}
      <div className={styles.hero}>
        <div className='relative mr-5'>
          {loading && <Loader/>}
          <img className='animate-slideup' src={ (!loading && data) ? data.images?.coverart : '' } alt="song_image" width={200} height={200}/>
        </div>
        <div className='flex flex-col'>
          <span className='font-bold text-md relative animate-slideup'>
            {loading && <Loader/>}
            SONG
          </span>
          <h1 className='font-bold text-6xl mt-1 mb-4 relative animate-slideup'>
            {loading && <Loader/>}
            {!loading && data && data.title}
          </h1>
          <div className={`${styles.artist} relative`}>
            {loading && <Loader/>}
            <span className='font-bold animate-slideup'>{!loading && data && data.subtitle}</span>
            {/* <img src="https://i.scdn.co/image/ab6761610000f17853e9f1076c20cd9141926791" alt="artist_photo" width={35} height={35} />
            <span className='font-bold'>Artist</span> */}
          </div>
        </div>
      </div>
      <div className='text-white p-8'>
        <div className={`${styles.controls_wrap} animate-slideup`}>
            <MdPlayArrow className={styles.play_icon}/>
            {favourite ? <MdFavorite className={styles.favourite_icon} onClick={() => handleClick()}/>  :  <MdFavoriteBorder className={styles.favourite_icon} onClick={() => handleClick()}/>}
           
        </div>
        <h6 className='font-semibold my-2 text-md animate-slideup'>Popular tracks by</h6>
        <h5 className='font-bold text-xl relative animate-slideup'>SAM SMITH{loading && <Loader/>}</h5>
      </div>
      <div className='text-white p-8'>
        <h5 className='font-bold text-xl animate-slideup'>Related tracks</h5>
      </div>
    </div>
  )
}

export default SongDetails