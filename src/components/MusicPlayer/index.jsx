import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../context/GlobalState'

import Controls from './Controls';
import Player from './Player';
import PlayBackBar from './PlayBackBar';
import Track from './Track';
import VolumeBar from './VolumeBar';

import styles from '../../css/MusicPlayer.module.css'

const MusicPlayer = () => {
  //data from global context
  const {playerData, dispatch} = useContext(GlobalContext)
  const {activeSong, currentIndex, currentSongs, isActive, isPlaying} = playerData

  //states for player
  const [duration, setDuration] = useState(0)
  const [seekTime, setSeekTime] = useState(0)
  const [appTime, setAppTime] = useState(0)
  const [volume, setVolume] = useState(0.3)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)

  // Play / Pause btn handle, if it is playing pause it after click and vice versa
  const handlePlayPause = () => {
    //if player is not active return
    if (!isActive) return;
    if (isPlaying) {
      dispatch({type: 'PLAY_PAUSE', payload: false})
    } else {
      dispatch({type: 'PLAY_PAUSE', payload: true})
    }
  }

  // handle click on next icon
  const handleNextSong = () => {
    //if current index is equal to current songs length return first song in current songs
    if (currentIndex === currentSongs.length - 1){
      dispatch({type: 'NEXT_SONG', payload: 0})
    //if shuffle is false return next song 
    }else if (!shuffle) {
      dispatch({type: 'NEXT_SONG', payload: currentIndex + 1})
    //if shuffle is false return random song from current songs
    } else {
      dispatch({type: 'NEXT_SONG', payload: Math.floor(Math.random() * currentSongs.length)})
    }
  }

  // handle click on previous icon
  const handlePrevSong = () => {
    // if index is 0 return last song of current songs array
    if (currentIndex === 0) {
      dispatch({type: 'PREV_SONG', payload: currentSongs.length - 1})
    // if shuffle is true return random number from current songs length
    } else if (shuffle) {
      dispatch({type: 'PREV_SONG', payload: Math.floor(Math.random() * currentSongs.length)})
    // if shuffle is false return previous index
    } else {
      dispatch({type: 'PREV_SONG', payload: currentIndex - 1})
    }
  }

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
            handlePlayPause={handlePlayPause}
            handlePrevSong={handlePrevSong}
            handleNextSong={handleNextSong}
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
              onEnded={handleNextSong}
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