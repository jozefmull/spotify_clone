import React, {useContext, useEffect} from 'react'
import { GlobalContext } from '../context/GlobalState'

import Notification from '../components/Notification'
import ArtistCard from '../components/ArtistCard'

import styles from '../css/Discover.module.css'

const TopCharts = () => {
  const {topCharts, getTopCharts} = useContext(GlobalContext)
  const {data, loading, error} = topCharts

  useEffect(() => {
    if (data.length === 0) {
      getTopCharts()
    }
    // eslint-disable-next-line
  }, [])
  
  return (
    <div className={`${styles.container_secondary} py-5 px-10 overflow-y-scroll pb-[75px] pt-[85px]  text-white`}>
      {/* ERROR  MESSAGE*/}
      {((error && error.message)) && <Notification type='error' message={error.message} title='Error' />}
      <h1 className='font-bold text-white text-3xl mt-2 mb-4 ml-2 animate-slideup'>Top Artists</h1>
      <div className={`${styles.datawrap} flex flex-wrap gap-5 justify-start`}>
        {data.length > 0 && data.map((track) => (
          <ArtistCard key={track.key} track={track} loading={loading}/>
        ))}
      </div>
    </div>
  )
}

export default TopCharts