import React, {useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import { GlobalContext } from '../context/GlobalState'

import DefaultImg from '../assets/images/default.png'

import Loader from '../components/Loader'
import Notification from '../components/Notification'

import styles from '../css/SongDetails.module.css'

const RelatedSongs = ({songid}) => {
    const navigate = useNavigate()

    const {getRelatedSongs, relatedSongs} = useContext(GlobalContext)
    const {loading, error, data} = relatedSongs

    useEffect(() => {
      getRelatedSongs(songid)
      // eslint-disable-next-line
    }, [])
    
    useEffect(() => {
      getRelatedSongs(songid)
      // eslint-disable-next-line
    }, [songid])
    
  if (loading) {
   return (
      <div className='mt-4 relative min-h-[25px] w-full'>
        <Loader />
      </div>
    )
  }

  if (error && error.message) {
    return  <Notification type='error' message={error.message} title='Error' />
  }

  return (
    <ul className={styles.relatedSongsWrapper}>
        {data.length > 0 && data.map((related, id) => (
            <li className={`${styles.relatedSong} animate-slideup`} key={related.title} onClick={() => navigate(`/song/${related.key}`)}>
                <span>{id + 1}</span>
                <img src={related.images?.coverart ? related.images?.coverart : DefaultImg } alt="song_image" width={45} height={45} />
                <h3 className='font-semibold text-md'>{related.title.length < 40 ? related.title : related.title.substring(0,40) + '...'}</h3>
            </li>
        ))}
    </ul>
  )
}

export default React.memo(RelatedSongs)