import React, {useContext, useEffect} from 'react'
import { GlobalContext } from '../context/GlobalState'

import Notification from '../components/Notification'
import ArtistCard from '../components/ArtistCard'

import styles from '../css/Discover.module.css'

const TopCharts = () => {
  // data form global context
  const {topCharts, getTopCharts} = useContext(GlobalContext)
  // we use top charts because top artists will be the atrists of the top songs that month and we do not have to make another API call
  const {data, loading, error} = topCharts

  // on component mount if we have no data from top charts then get top charts
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
      <h1 className='font-bold text-white text-3xl mt-2 mb-4 ml-2 animate-slideup'>Top Artists</h1>
      <div className={`${styles.datawrap} flex flex-wrap gap-5 justify-start`}>
        {/* if we have some data then map through them and display artiscards */}
        {data.length > 0 && data.map((track) => (
          <ArtistCard key={track.key} track={track} loading={loading}/>
        ))}
      </div>
    </div>
  )
}

export default TopCharts