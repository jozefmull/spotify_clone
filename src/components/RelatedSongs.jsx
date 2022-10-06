import React, {useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import { GlobalContext } from '../context/GlobalState'

import DefaultImg from '../assets/images/default.png'

import Loader from '../components/Loader'
import Notification from '../components/Notification'

import styles from '../css/SongDetails.module.css'

const RelatedSongs = ({songid}) => {
    //navigate hook so we can navigate to new song details page after click on related song
    const navigate = useNavigate()
    //data from context
    const {getRelatedSongs, relatedSongs} = useContext(GlobalContext)
    const {loading, error, data} = relatedSongs

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
            <li className={`${styles.relatedSong} animate-slideup`} key={related.title} onClick={() => navigate(`/song/${related.key}`)}>
                <span>{id + 1}</span>
                <img src={related.images?.coverart ? related.images?.coverart : DefaultImg } alt="song_image" width={45} height={45} />
                <h3 className='font-semibold text-sm'>{related.title.length < 40 ? related.title : related.title.substring(0,40) + '...'}</h3>
            </li>
        ))}
    </ul>
  )
}
// react memo is supposed to remember this component and rerender it only if related songs change
export default React.memo(RelatedSongs)