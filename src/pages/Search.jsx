import React, {useState, useEffect, useContext} from 'react'
import {MdSearch} from 'react-icons/md'
import { GlobalContext } from '../context/GlobalState'

import CircLoader from '../assets/circloader.svg'

import Notification from '../components/Notification'
import SongCard from '../components/SongCard'

import styles from '../css/Search.module.css'
import styles2 from '../css/Discover.module.css'

const Search = () => {
  // component state - loading and search query
  const [searchQuery, setsearchQuery] = useState('')
  const [searchLoading, setsearchLoading] = useState(false)
  //data from gobal context
  const {getSearchResults, searchResults, playerData} = useContext(GlobalContext)
  const {error, data, loading} = searchResults
  const {isPlaying, activeSong} = playerData

  //if search query changs then run this debounce func
  useEffect(() => {
    // debounce func is supposed to delay setting our values to a new state after user stops typing
    const delayDebounceFn = setTimeout(() => {
      // if we have a search query that is not empty set loading to true and get search results of that query 
      if (searchQuery !== '') {
        setsearchLoading(true)
        getSearchResults(searchQuery)
      }
      // delay is 1 second
    }, 1000)

    // on component unmount clear timeout of debounce function
    return () => {
      clearTimeout(delayDebounceFn)
    }
    // eslint-disable-next-line
  }, [searchQuery])

  // handle change of input
  const handleChange = (e) => {
    e.preventDefault()
    // set new search query to component state
    setsearchQuery(e.target.value)
  }

  return (
    <div className={`${styles2.container_secondary} py-5 px-10 overflow-y-scroll pb-[75px] pt-[85px]  text-white`}>
      {/* ERROR  MESSAGE - if there is an error and it has a message display notification */}
      {error && error.message && <Notification type='error' message={error.message} title='Error' />}
      <h1 className='font-bold text-white text-3xl mt-2 mb-4 ml-2 animate-slideup'>Search</h1>
      <div className={`${styles.inputwrap} animate-slideup`}>
          <form autoComplete='off'>
            <input autoComplete='off' value={searchQuery} className={styles.input} onChange={(e) => handleChange(e)} type="search" name="search_songs" id="search" placeholder='What do you want to listen to?'/>
          </form>
          {searchLoading && loading ?  <img src={CircLoader} alt="circ-loader" /> : <MdSearch/>}
      </div>
      <div className={`${styles2.datawrap} flex flex-wrap gap-5 justify-start mt-5`}>
         {/* if data has some keys meaning if it is not empty map through them and display song cards */}
         {Object.keys(data).length !== 0 && data.map((song, id) => (
          <SongCard
            key={`song-card-${song.key}-${song.title}`} 
            song={song} 
            loading={loading}
            data={data} 
            id={id}
            isPlaying={isPlaying}
            activeSong={activeSong}
            />
        ))}
      </div>
    </div>
  )
}

export default Search