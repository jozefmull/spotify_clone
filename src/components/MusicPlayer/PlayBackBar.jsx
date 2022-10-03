import React from 'react'

import styles from '../../css/MusicPlayer.module.css'

const PlayBackBar = () => {
  return (
    <div className={styles.playback_bar}>
    
    <p className="text-white">
        0.00
        {/* {value === 0 ? '0:00' : getTime(value)} */}
    </p>
    <input
      type="range"
      step="any"
    //   value={value}
    //   min={min}
    //   max={max}
    //   onInput={onInput}
    />
    <p className="text-white">
        {/* {max === 0 ? '0:00' : getTime(max)} */}
        3.00
    </p>
   
  </div>
  )
}

export default PlayBackBar