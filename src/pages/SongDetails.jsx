import React,{useEffect, useContext, useState} from 'react'
import { useParams } from 'react-router-dom'

import { GlobalContext } from '../context/GlobalState'
import {MdPlayArrow, MdFavoriteBorder, MdFavorite} from 'react-icons/md'

// import Notification from '../components/Notification'
import Loader from '../components/Loader'
import Notification from '../components/Notification'
import RelatedSongs from '../components/RelatedSongs'

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
    getSongDetails(songid)
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
          </div>
        </div>
      </div>
      <div className='text-white px-8 pt-8'>
        <div className={`${styles.controls_wrap} animate-slideup`}>
            <MdPlayArrow className={styles.play_icon}/>
            {favourite ? <MdFavorite className={styles.favourite_icon} onClick={() => handleClick()}/>  :  <MdFavoriteBorder className={styles.favourite_icon} onClick={() => handleClick()}/>}
        </div>
      </div>
      <div className='text-white px-8 pb-8'>
        <h5 className='font-bold text-xl animate-slideup'>Related tracks</h5>
        <RelatedSongs songid={songid}/>
      </div>
    </div>
  )
}

export default SongDetails