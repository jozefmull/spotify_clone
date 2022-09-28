import React, {useContext, useEffect} from 'react'
import { GlobalContext } from '../context/GlobalState'

import SongCard from '../components/SongCard'
import Genres from '../components/Genres'

const Discover = () => {
  const context = useContext(GlobalContext)
  const {getWorldChartsByGenre, songsByGenre, genre} = context

  useEffect(() => {
    if (songsByGenre.length === 0) {
      getWorldChartsByGenre()
    }    
    // eslint-disable-next-line
  }, [])
  

  return (
    <div className='py-5 px-10 overflow-y-scroll pb-[75px] max-w-[calc(100%_-_240px)]'>
      <h1 className='font-bold text-white text-3xl mt-2 mb-4 ml-2'>Discover</h1>
      <h1 className='font-bold text-white text-xl mt-2 mb-2 ml-2'>Genres</h1>
      <Genres />
      
      <h1 className='font-bold text-white text-xl mt-10 mb-2 ml-2'>{genre.title}</h1>
      <div className='flex flex-wrap gap-5'>
        {songsByGenre.length > 0 && songsByGenre.map(song => (
          <SongCard key={song.key} song={song}/>
        ))}
      </div>
    </div>
  )
}

export default Discover