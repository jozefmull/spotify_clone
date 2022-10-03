import React from 'react'
import { useNavigate } from 'react-router-dom'

import styles from '../css/SongDetails.module.css'

const ArtistSongs = ({songs}) => {
    const navigate = useNavigate()

  return (
    <ul className={styles.relatedSongsWrapper}>
        {songs.length > 0 && songs.map((song, id) => (
            <li className={`${styles.relatedSong} animate-slideup`} key={song?.id} onClick={() => navigate(`/song/${song?.id}`)}>
                <span>{id + 1}</span>
                <img src={
                    song?.attributes?.artwork?.url
                    .replace('{w}', '50')
                    .replace('{h}', '50')
                } alt="song" width={45} height={45} />
                <h3 className='font-semibold text-md'>{song?.attributes?.name}</h3>
            </li>
        ))}
    </ul>
  )
}

export default React.memo(ArtistSongs)