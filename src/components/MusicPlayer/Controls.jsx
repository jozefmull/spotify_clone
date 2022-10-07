import React from 'react'
import { MdSkipNext, MdSkipPrevious, MdPlayCircle, MdPauseCircle, MdOutlineShuffle, MdRepeat  } from 'react-icons/md';

import styles from '../../css/MusicPlayer.module.css'

const Controls = ({ isPlaying, repeat, setRepeat, shuffle, setShuffle, handlePlayPause, handlePrevSong, handleNextSong }) => {
  // only one of repeat and shuffle can be true at a time
  // set shuffle to opposite of previous and if repeat is true set it to false
  const handleShuffle = () => {
    setShuffle(prev => !prev)
    if (repeat === true) {
      setRepeat(false)
    }
  }
  // only one of repeat and shuffle can be true at a time
  // set repeat to opposite of previous and if shuffle is true set it to false
  const handleRepeat = () => {
    setRepeat(prev => !prev)
    if (shuffle === true) {
      setShuffle(false)
    }
  }

  return (
    <div className={styles.player_controls_buttons}>
        <MdOutlineShuffle size={20} color={shuffle ? '#1ed760' : '#bababa'} onClick={handleShuffle}/>
        <MdSkipPrevious size={30} color="#bababa" onClick={handlePrevSong} />
        {isPlaying ? (
          <MdPauseCircle className={styles.play} size={38} color="#fff" onClick={handlePlayPause}/>
        ) : (
          <MdPlayCircle className={styles.play} size={38} color="#fff" onClick={handlePlayPause}/>
        )}
        <MdSkipNext size={30} color="#bababa" onClick={handleNextSong}/>
        <MdRepeat size={20} color={repeat ? '#1ed760' : '#bababa'} onClick={handleRepeat}/>
    </div>
  )
}

export default Controls