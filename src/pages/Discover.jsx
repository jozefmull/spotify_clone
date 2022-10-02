import React, {useContext, useEffect} from 'react'
import { GlobalContext } from '../context/GlobalState'

import SongCard from '../components/SongCard'
import Genres from '../components/Genres'
import Notification from '../components/Notification'

import styles from '../css/Discover.module.css'

const Discover = () => {
  const {getWorldChartsByGenre, songsByGenre} = useContext(GlobalContext)
  const {data, error , genre, loading} = songsByGenre

  useEffect(() => {
    if (data.length === 0) {
      getWorldChartsByGenre(genre.value)
    }    
    // eslint-disable-next-line
  }, [])

  return (
    <div className={`${styles.container} py-5 px-10 overflow-y-scroll pb-[75px] pt-[85px]  text-white`}>
      {/* ERROR  MESSAGE*/}
      {error && error.message && <Notification type='error' message={error.message} title='Error' />}
      <h1 className='font-bold text-white text-3xl mt-2 mb-4 ml-2 animate-slideup'>Discover</h1>
      <h1 className='font-bold text-white text-xl mt-2 mb-2 ml-2 animate-slideup'>Genres</h1>
          <Genres />
      <h1 className='font-bold text-white text-xl mt-10 mb-2 ml-2 animate-slideup'>{genre.title}</h1>
      <div className={`${styles.datawrap} flex flex-wrap gap-5 justify-start relative`}>
        {data.length > 0 && data.map(song => (
          <SongCard key={song.key} song={song} loading={loading}/>
        ))}
      </div>
    </div>
  )
}

export default Discover