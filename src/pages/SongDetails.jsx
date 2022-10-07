import React,{useEffect, useContext, useState} from 'react'
import { useParams } from 'react-router-dom'

import { GlobalContext } from '../context/GlobalState'
import { MdPlayArrow, MdPause } from 'react-icons/md'

import Loader from '../components/Loader'
import Notification from '../components/Notification'
import RelatedSongs from '../components/RelatedSongs'
import Modal from '../components/Modal'

import styles from '../css/SongDetails.module.css'

const SongDetails = () => {
  //component state for modal and song id from url parameters
  const {songid}  = useParams()
  const [openModal, setopenModal] = useState(false)
  //data from global context
  const {getSongDetails, songDetails, dispatch, playerData, songsByGenre, relatedSongs} = useContext(GlobalContext)
  const {loading, error, data} = songDetails
  const {isPlaying, activeSong} = playerData
  const {data:dataRelated} = relatedSongs
  //handle active song
  const handleSetActiveSong = (data) => {
    dispatch({
      type:'SET_ACTIVE_SONG',
                //if we have song details set it to payload
      payload: {song: Object.keys(data).length !== 0 && data,
                //if relatedSongs exist and they have items in them set them to curr songs and append song details to beggining
                //otherwise use songs by gen and append current song details to beggining
                currentSongs: dataRelated && dataRelated.length > 0 ? [data, ...dataRelated] : [data, ...songsByGenre.data],
                //set curnt id of player to 0 
                id: 0  
              }})
  }

  useEffect(() => {
    getSongDetails(songid)
    // eslint-disable-next-line
  }, [songid])

  return (
    <div className={styles.wrapper}>
      {/* ERROR MESSAGE */}
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
            {/* IF song is playing and activesong key is equal to current song details key display pause icon and vice versa */}
            {isPlaying && activeSong?.key === data?.key ? (
              <MdPause className={styles.play_icon} onClick={() => dispatch({type: 'PLAY_PAUSE', payload: false})}/>
            ) : (
              <MdPlayArrow className={styles.play_icon} onClick={() => handleSetActiveSong(data)}/>
            )}
            {/* if we have section with type lyrics display button that opens modal with lyrics */}
            {Object.keys(data).length !== 0 && !loading && data?.sections[1]?.type === 'LYRICS' && (
                <button className={styles.lyrics_btn} onClick={() => setopenModal(true)}>Lyrics</button>
            )}
        </div>
      </div>
      {/* if modal state open is true display modal */}
      {openModal && (
          <Modal data={data?.sections[1]?.text} setopenModal={setopenModal}/>
      )}
      <div className='text-white px-8 pb-8'>
        <h5 className='font-bold text-xl animate-slideup'>Related tracks</h5>
        {/* related songs component */}
        <RelatedSongs songid={songid} song={data}/>
      </div>
    </div>
  )
}

export default SongDetails