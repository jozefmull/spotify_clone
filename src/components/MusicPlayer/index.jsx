import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../context/GlobalState'

import Controls from './Controls';
import Player from './Player';
import PlayBackBar from './PlayBackBar';
import Track from './Track';
import VolumeBar from './VolumeBar';

import styles from '../../css/MusicPlayer.module.css'

const MusicPlayer = () => {
  const {playerData, dispatch} = useContext(GlobalContext)
  const {activeSong, currentIndex, currentSongs, isActive, isPlaying} = playerData

  const [duration, setDuration] = useState(0)
  const [seekTime, setSeekTime] = useState(0)
  const [appTime, setAppTime] = useState(0)
  const [volume, setVolume] = useState(0.3)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)

  // Play / Pause btn handle, if it is playing pause it after click and vice versa
  const handlePlayPause = () => {
    // if (!isActive) return;

    if (isPlaying) {
      dispatch({type: 'PLAY_PAUSE', payload: false})
    } else {
      dispatch({type: 'PLAY_PAUSE', payload: true})
    }
  };

  // if we have active song and it has title thats not undefined display Music Player
  if (activeSong?.title !== undefined) {
    return (
      <div className={`${styles.music_player} animate-slideup`}>
        <Track isPlaying={isPlaying} activeSong={activeSong} isActive={isActive} />
        <div className={`${styles.controls_wrap} flex flex-col items-center justify-center max-w-[35%] w-[35%]`}>
          <Controls
            isPlaying={isPlaying}
            isActive={isActive}
            repeat={repeat}
            setRepeat={setRepeat}
            shuffle={shuffle}
            setShuffle={setShuffle}
            currentSongs={currentSongs}
            handlePlayPause={handlePlayPause}
            // handlePrevSong={handlePrevSong}
            // handleNextSong={handleNextSong}
          />
          <PlayBackBar
            value={appTime}
            min="0"
            max={duration}
            onInput={(event) => setSeekTime(event.target.value)}
            setSeekTime={setSeekTime}
            appTime={appTime}
          />
          <Player
              activeSong={Object.keys(activeSong).length !== 0 && activeSong}
              volume={volume}
              isPlaying={isPlaying}
              seekTime={seekTime}
              repeat={repeat}
              // currentIndex={currentIndex}
              // onEnded={handleNextSong}
              onTimeUpdate={(e) => setAppTime(e.target.currentTime)}
              onLoadedData={(e) => setDuration(e.target.duration)}
          />
        </div>
        <VolumeBar value={volume} min="0" max="1" onChange={(e) => setVolume(e.target.value)} setVolume={setVolume} />
      </div>
    )
  }
}

export default MusicPlayer