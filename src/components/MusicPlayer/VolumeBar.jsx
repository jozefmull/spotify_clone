import React from 'react'
import { MdVolumeUp, MdVolumeDown, MdVolumeMute } from 'react-icons/md';


import styles from '../../css/MusicPlayer.module.css'

const VolumeBar = ({ value, min, max, onChange, setVolume }) => {
  return (
    <div className={styles.volume_wrapper}>
    {Number(value) <= 1 && Number(value) > 0.5 && <MdVolumeUp size={25} color="#FFF" onClick={() => setVolume(0)} />}
    {Number(value) <= 0.5 && Number(value) > 0 && <MdVolumeDown size={25} color="#FFF" onClick={() => setVolume(0)} />}
    {Number(value) === 0 && <MdVolumeMute size={25} color="#FFF" onClick={() => setVolume(1)} />}
    <input
      type="range"
      step="any"
      value={value}
      min={min}
      max={max}
      onChange={onChange}
      className={styles.volume_input}
    />
  </div>
  )
}

export default VolumeBar