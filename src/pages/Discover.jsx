import React, {useContext, useEffect} from 'react'
import { GlobalContext } from '../context/GlobalState'

import SongCard from '../components/SongCard'
import Genres from '../components/Genres'
import Notification from '../components/Notification'

import styles from '../css/Discover.module.css'

const Discover = () => {
  // data from global context
  const {getWorldChartsByGenre, songsByGenre, playerData} = useContext(GlobalContext)
  const {data, error , genre, loading} = songsByGenre
  const {activeSong, isPlaying} = playerData

  //on component mount if we have no data get world charts by genre from shazam
  useEffect(() => {
    if (data.length === 0) {
      getWorldChartsByGenre(genre.value)
    }    
    // eslint-disable-next-line
  }, [])

  return (
    <div className={`${styles.container} py-5 overflow-y-scroll pb-[75px] pt-[85px]  text-white`}>
      {/* ERROR  MESSAGE - if there is an error and it has a message display notification */}
      {error && error.message && <Notification type='error' message={error.message} title='Error' />}
      <h1 className='font-bold text-white text-3xl mt-2 mb-4 ml-2 animate-slideup px-10'>Discover</h1>
      <h1 className='font-bold text-white text-xl mt-2 mb-3 ml-2 animate-slideup px-10'>Genres</h1>
          {/* genres component */}
          <Genres />
      <h1 className='font-bold text-white text-xl mt-10 mb-2 ml-2 animate-slideup px-10'>{genre.title}</h1>
      <div className={`${styles.datawrap} flex flex-wrap gap-5 justify-start relative px-10`}>
        {/* if we have some data then map through them and display song cards */}
        {data.length > 0 && data.map((song, id) => (
          <SongCard 
            key={`song-card-${song.key}-${song.title}`} 
            song={song} 
            loading={loading} 
            data={data} 
            id={id}
            isPlaying={isPlaying}
            activeSong={activeSong}
            />
        ))}
      </div>
    </div>
  )
}

export default Discover