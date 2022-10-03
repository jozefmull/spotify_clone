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
        {loading ? (<div className='mr-5 relative w-[150px] h-[150px]' width={200} height={200}>
          {loading && <Loader/>}
        </div>) : Object.keys(data).length !== 0 && !loading && (
           <img className='animate-slideup mr-5'  
           src={ data?.images?.coverart} 
         alt="song-coverart" width={200} height={200}/>
        )}
        <div className='flex flex-col'>
          <div className='relative max-w-[100px] min-h-[18px]'>
            {loading && <Loader/>}
            {Object.keys(data).length !== 0 && !loading && <p className='animate-slideup font-bold text-md '>SONG</p>}
          </div>
          <div className='mt-1 mb-3 relative min-h-[60px] min-w-[150px]'>
            {loading && <Loader/>}
            {Object.keys(data).length !== 0 && !loading && <h1 className='animate-slideup m-0 font-bold text-6xl'>{data?.title}</h1>}
          </div>
          <div className="relative min-h-[18px]">
            {loading && <Loader/>}
            {Object.keys(data).length !== 0 && !loading && <p className='mt-2 font-bold animate-slideup'>{data?.subtitle}</p>}
          </div>
        </div>
      </div>
      <div className='text-white px-8 pt-8'>
        <div className={`${styles.controls_wrap} animate-slideup`}>
            <MdPlayArrow className={styles.play_icon}/>
            {favourite ? <MdFavorite className={styles.favourite_icon} onClick={handleClick}/>  :  <MdFavoriteBorder className={styles.favourite_icon} onClick={handleClick}/>}
        </div>
      </div>
      <div className='text-white px-8 pb-8'>
        <h5 className='font-bold text-xl animate-slideup'>Related tracks</h5>
        {loading ? (
            <div className='mt-4 relative min-h-[25px] w-full'>
              <Loader />
            </div>
        ) : 
        Object.keys(data).length !== 0 && !loading && (
          <RelatedSongs songid={songid}/>
        )}
      </div>
    </div>
  )
}

export default SongDetails