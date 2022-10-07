import React,{useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'

import { GlobalContext } from '../context/GlobalState'

import Loader from '../components/Loader'
import Notification from '../components/Notification'

import styles from '../css/SongDetails.module.css'
import ArtistSongs from '../components/ArtistSongs'

const ArtistDetails = () => {
  const {artistid}  = useParams()
  
  const {getArtistDetails, artistDetails} = useContext(GlobalContext)
  const {loading, error, data} = artistDetails

  useEffect(() => {
    getArtistDetails(artistid)
    // eslint-disable-next-line
  }, [artistid])

  return (
    <div className={styles.wrapper}>
       {error && error.message && <Notification type='error' message={error.message} title='Error' />}
      <div className={styles.hero}>
        {loading ? (<div className='mr-5 relative w-[150px] h-[150px]' width={200} height={200}>
          <Loader/>
        </div>) : Object.keys(data).length !== 0 && !loading && (
           <img className='animate-slideup mr-5'  
           src={data?.artists[artistid]?.attributes?.artwork?.url
           .replace('{w}', '500')
           .replace('{h}', '500')} 
         alt="artist-coverart" width={200} height={200}/>
        )}
        <div className='flex flex-col'>
          <div className='relative max-w-[100px] min-h-[18px]'>
            {loading && <Loader/>}
            {Object.keys(data).length !== 0 && !loading && <p className='animate-slideup font-bold text-md '>ARTIST</p>}
          </div>
          <div className='mt-1 mb-3 relative min-h-[60px] min-w-[150px]'>
            {loading && <Loader/>}
            {Object.keys(data).length !== 0 && !loading && <h1 className='animate-slideup m-0 font-bold text-6xl'>{data?.artists[artistid]?.attributes?.name}</h1>}
          </div>
          <div className="relative min-h-[18px] max-w-[125px]">
            {loading && <Loader/>}
            {Object.keys(data).length !== 0 && !loading && <p className='mt-2 font-bold animate-slideup'>{data?.artists[artistid]?.attributes?.genreNames[0]}</p>}
          </div>
        </div>
      </div>
      <div className='text-white px-8 pb-8 pt-8'>
        <div className=' relative'> 
          {loading && <Loader/>}
          {Object.keys(data).length !== 0 && !loading && (<p className=' font-bold text-xl animate-slideup'>Songs by {data?.artists[artistid]?.attributes?.name}</p>)}
        </div>
        {loading ? (
            <div className='mt-4 relative min-h-[25px] w-full'>
              <Loader />
            </div>
        ) : 
        Object.keys(data).length !== 0 && !loading && (
          <ArtistSongs songs={Object.values(data?.songs)}/>
        )}
      </div>
    </div>
  )
}

export default ArtistDetails