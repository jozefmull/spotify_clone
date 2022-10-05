import React from 'react'

import styles from '../../css/MusicPlayer.module.css'

const PlayBackBar = ({ value, min, max, onInput, setSeekTime, appTime }) => {
  // TIME is in seconds
  const getTime = (time) => {
    // time / 60 gives us minutes and time % 60 gives us seconds (residue)
    return `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`
  }

  return (
    <div className={styles.playback_bar}>
      <p className="text-white">
          {/* get time of musicPlayer component */}
          {value === 0 ? '0:00' : getTime(value)}
      </p>
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
      />
      <p className="text-white">
          {/* get time of audio from player component*/}
          {max === 0 ? '0:00' : getTime(max)}
      </p>
  </div>
  )
}

export default PlayBackBar