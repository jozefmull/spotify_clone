import React, {useContext, useEffect} from 'react'
import { GlobalContext } from '../context/GlobalState'

import SongCard from '../components/SongCard'
import Genres from '../components/Genres'
import Notification from '../components/Notification'

const Discover = () => {
  const {getWorldChartsByGenre, songsByGenre} = useContext(GlobalContext)
  const {data, error , genre} = songsByGenre

  useEffect(() => {
    if (data.length === 0) {
      getWorldChartsByGenre()
    }    
    // eslint-disable-next-line
  }, [])

  return (
    <div className='py-5 px-10 overflow-y-scroll pb-[75px] pt-[85px] max-w-[calc(100%_-_240px)]'>
      {/* ERROR  MESSAGE*/}
      {error && error.message && <Notification type='error' message={error.message} title='Error' />}

      <h1 className='font-bold text-white text-3xl mt-2 mb-4 ml-2 animate-slideup'>Discover</h1>
      <h1 className='font-bold text-white text-xl mt-2 mb-2 ml-2 animate-slideup'>Genres</h1>
      <Genres />
      <h1 className='font-bold text-white text-xl mt-10 mb-2 ml-2 animate-slideup'>{genre.title}</h1>
      <div className='flex flex-wrap gap-5'>
        {data.length > 0 && data.map(song => (
          <SongCard key={song.key} song={song}/>
        ))}
      </div>
    </div>
  )
}

export default Discover