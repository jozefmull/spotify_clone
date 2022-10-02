import React, {useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import { GlobalContext } from '../context/GlobalState'

import styles from '../css/SongDetails.module.css'

import Loader from '../components/Loader'
import Notification from '../components/Notification'

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
    

  return (
    <ul className={styles.relatedSongsWrapper}>
       {error && error.message && <Notification type='error' message={error.message} title='Error' />}
       {loading && <Loader/>}
        {data.length > 0 && data.map((related, id) => (
            <li className={`${styles.relatedSong} animate-slideup`} key={related.title} onClick={() => navigate(`/song/${related.key}`)}>
                <span>{id + 1}</span>
                <img src={related.images?.coverart} alt="song_image" width={45} height={45} />
                <h3 className='font-semibold text-md'>{related.title}</h3>
            </li>
        ))}
    </ul>
  )
}

export default RelatedSongs