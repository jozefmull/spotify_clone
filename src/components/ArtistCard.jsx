import React from 'react'
import { useNavigate } from 'react-router-dom'

import styles from '../css/SongCard.module.css'

const ArtistCard = ({track}) => {
  const navigate = useNavigate()

  return (
    <div className={`${styles.card} animate-slideup`} onClick={() => navigate(`/artist/${track.artists[0].adamid}`)}>
      <img className='mb-4' src={track?.share?.avatar} alt="artist" />
      <h3 className='font-bold mb-3'>{track.subtitle.length < 30 ? track.subtitle : track.subtitle.substring(0,30) + '...'}</h3>
    </div>
  )
}

export default ArtistCard