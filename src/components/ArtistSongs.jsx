import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'
// import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { MdPlayArrow, MdPause } from 'react-icons/md'

import styles from '../css/SongDetails.module.css'

const ArtistSongs = ({songs}) => {
  const {playerData, dispatch} = useContext(GlobalContext)
  const {activeSong, isPlaying} = playerData

    //handle play - e prevent default bcs of parent link
    const handlePlay = (e,song, id) => {
        e.preventDefault()
        // console.log(song?.attributes?.previews[0]?.url, id);
        //related songs item handle play - set active song to current related sung, current songs to data with appended current song details to beggining and id + 1
        dispatch({type:'SET_ACTIVE_SONG', payload: {song: song, currentSongs: songs, id} })
    }
    //handle pause - e prevent default bcs of parent link
    const handlePause = (e) => {
        e.preventDefault()
        // dispatch({type: 'PLAY_PAUSE', payload:false})
    } 

  return (
    <ul className={styles.relatedSongsWrapper}>
        {songs.length > 0 && songs.map((song, id) => (
            <li className={`${styles.relatedSong} animate-slideup`} key={`song-artist-${song?.id}-${song?.attributes?.name}`}>
                <Link to=''>
                    {isPlaying && activeSong.key === song.key ? (
                        <MdPause className={styles.pause_icon}
                         onClick={(e) => handlePause(e)}
                         />
                    ) : (
                        <span>{id + 1}</span>
                    )}
                    <MdPlayArrow className={styles.play_icon}  onClick={(e) => handlePlay(e, song, id)}/>
                    <img src={
                        song?.attributes?.artwork?.url
                        .replace('{w}', '50')
                        .replace('{h}', '50')
                    } alt="song" width={45} height={45} />
                    <h3 className='font-semibold text-md'>{song?.attributes?.name}</h3>
                </Link>
            </li>
        ))}
    </ul>
  )
}

export default React.memo(ArtistSongs)