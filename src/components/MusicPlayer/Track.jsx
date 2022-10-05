import React from 'react'

import styles from '../../css/MusicPlayer.module.css'

const Track = ({activeSong, isPlaying}) => {

  return (
    <div className={styles.track}>
        {/* <img src="https://i.scdn.co/image/ab67616d000048511630dd349221a35ce03a0ccf" alt="song" className='mr-5'/> */}
        <img src={activeSong?.images?.coverart} alt="song" className='mr-5' width={64} height={64}/>

        <div>
          <h6 className='text-md font-semibold'>{activeSong?.title}</h6>
          <span className='text-sm font-normal'>{activeSong?.subtitle}</span>
        </div>
    </div>
  )
}

export default Track