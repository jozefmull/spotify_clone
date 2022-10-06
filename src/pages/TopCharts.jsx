import React, {useContext, useEffect} from 'react'
import { GlobalContext } from '../context/GlobalState'

import SongCard from '../components/SongCard'
import Notification from '../components/Notification'

import styles from '../css/Discover.module.css'

const TopCharts = () => {
  // data from global context
  const {topCharts, getTopCharts, playerData} = useContext(GlobalContext)
  const {data, loading, error} = topCharts
  // we need player data to display correct icon on song card when they are playing and paused
  const {activeSong, isPlaying} = playerData

  // on component mount if data from topcharts are empty then gettopcharts from shazam
  useEffect(() => {
    if (data.length === 0) {
      getTopCharts()
    }
    // eslint-disable-next-line
  }, [])
  
  return (
    <div className={`${styles.container_secondary} py-5 px-10 overflow-y-scroll pb-[75px] pt-[85px]  text-white`}>
      {/* ERROR  MESSAGE - if there is an error and it has a message display notification */}
      {((error && error.message)) && <Notification type='error' message={error.message} title='Error' />}
      <h1 className='font-bold text-white text-3xl mt-2 mb-4 ml-2 animate-slideup'>Top Charts</h1>
      <div className={`${styles.datawrap} flex flex-wrap gap-5 justify-start`}>
        {/* if we have data map through them and display song cards */}
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

export default TopCharts