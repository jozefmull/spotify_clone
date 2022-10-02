import React,{useEffect, useContext, useState} from 'react'
import { useParams } from 'react-router-dom'

import { GlobalContext } from '../context/GlobalState'
import {MdPlayArrow, MdFavoriteBorder, MdFavorite} from 'react-icons/md'

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
      <div className='mr-5 relative w-[200px] h-[200px]'>
          {loading && <Loader/>}
          {Object.keys(data).length !== 0 && !loading && (
            <img className='animate-slideup' 
              src={data?.images?.coverart} 
            alt="song_image" width={200} height={200}/>
          )}
        </div>
        <div className='flex flex-col'>
          <div className='relative min-w-[120px] min-h-[18px]'>
            {loading && <Loader/>}
            {Object.keys(data).length !== 0 && !loading && <p className='font-bold text-md animate-slideup'>SONG</p>}
          </div>
          <div className='mt-1 mb-2 relative min-h-[60px] min-w-[175px]'>
            {loading && <Loader/>}
            {Object.keys(data).length !== 0 && !loading && <h1 className='animate-slideup m-0 font-bold text-6xl'>{data?.title}</h1>}
          </div>
          <div className="relative min-h-[18px] min-w-[125px]">
            {loading && <Loader/>}
            {Object.keys(data).length !== 0 && !loading && <p className='animate-slideup font-bold'>{data?.subtitle}</p>}
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