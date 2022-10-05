import React from 'react'
import { MdSkipNext, MdSkipPrevious, MdPlayCircle, MdPauseCircle, MdOutlineShuffle, MdRepeat  } from 'react-icons/md';

import styles from '../../css/MusicPlayer.module.css'

const Controls = ({ isPlaying, repeat, setRepeat, shuffle, setShuffle, currentSongs, handlePlayPause, handlePrevSong, handleNextSong }) => {

  return (
    <div className={styles.player_controls_buttons}>
        <MdOutlineShuffle size={20} color={shuffle ? '#1ed760' : '#bababa'} onClick={() => setShuffle((prev) => !prev)}/>
        <MdSkipPrevious size={30} color="#bababa" />
        {isPlaying ? (
          <MdPauseCircle className={styles.play} size={38} color="#fff" onClick={handlePlayPause}/>
        ) : (
          <MdPlayCircle className={styles.play} size={38} color="#fff" onClick={handlePlayPause}/>
        )}
        <MdSkipNext size={30} color="#bababa" />
        <MdRepeat size={20} color={repeat ? '#1ed760' : '#bababa'} onClick={() => setRepeat((prev) => !prev)}/>
    </div>
  )
}

export default Controls