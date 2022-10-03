import React from 'react'

import Controls from './Controls';
// import Player from './Player';
import PlayBackBar from './PlayBackBar';
import Track from './Track';
import VolumeBar from './VolumeBar';

import styles from '../../css/MusicPlayer.module.css'

const MusicPlayer = () => {
  return (
    <div 
    className={styles.music_player}
    // className="relative sm:px-12 px-8 w-full flex items-center justify-between"
    >
    <Track 
    // isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} 
    />
    <div className="flex flex-col items-center justify-center max-w-[35%] w-[35%]">
      <Controls
        // isPlaying={isPlaying}
        // isActive={isActive}
        // repeat={repeat}
        // setRepeat={setRepeat}
        // shuffle={shuffle}
        // setShuffle={setShuffle}
        // currentSongs={currentSongs}
        // handlePlayPause={handlePlayPause}
        // handlePrevSong={handlePrevSong}
        // handleNextSong={handleNextSong}
      />
      <PlayBackBar
        // value={appTime}
        // min="0"
        // max={duration}
        // onInput={(event) => setSeekTime(event.target.value)}
        // setSeekTime={setSeekTime}
        // appTime={appTime}
      />
       {/*<Player
        activeSong={activeSong}
        volume={volume}
        isPlaying={isPlaying}
        seekTime={seekTime}
        repeat={repeat}
        currentIndex={currentIndex}
        onEnded={handleNextSong}
        onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
        onLoadedData={(event) => setDuration(event.target.duration)}
      /> */}
    </div>
    <VolumeBar 
    // value={volume} min="0" max="1" onChange={(event) => setVolume(event.target.value)} setVolume={setVolume}
     />
  </div>
  )
}

export default MusicPlayer