import React from 'react'

import styles from '../../css/MusicPlayer.module.css'

const Track = () => {
  return (
    <div className={styles.track}>
        <img src="https://i.scdn.co/image/ab67616d000048511630dd349221a35ce03a0ccf" alt="song" className='mr-5'/>
        <div>
          <h6 className='text-md font-semibold'>Song name</h6>
          <span className='text-sm font-normal'>Artist</span>
        </div>
    </div>
  )
}

export default Track