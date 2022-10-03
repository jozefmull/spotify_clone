import React from 'react'
import { MdSkipNext, MdSkipPrevious, MdPlayCircle, MdOutlinePauseCircleFilled, MdOutlineShuffle, MdRepeat  } from 'react-icons/md';

import styles from '../../css/MusicPlayer.module.css'

const Controls = () => {
  return (
    <div className={styles.player_controls_buttons}>
        <MdOutlineShuffle size={20} color="#bababa"/>
        <MdSkipPrevious size={30} color="#bababa" />
        <MdPlayCircle className={styles.play} size={38} color="#fff" />
        <MdSkipNext size={30} color="#bababa" />
        <MdRepeat size={20} color="#bababa"/>
    </div>
  )
}

export default Controls