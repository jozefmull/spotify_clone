import React, {useState, useEffect, useContext} from 'react'
import {MdSearch} from 'react-icons/md'
import { GlobalContext } from '../context/GlobalState'

import Notification from '../components/Notification'
import SongCard from '../components/SongCard'

import styles from '../css/Search.module.css'
import styles2 from '../css/Discover.module.css'

const Search = () => {
  const [searchQuery, setsearchQuery] = useState('')
  const {getSearchResults, searchResults} = useContext(GlobalContext)
  const {error, data, loading} = searchResults

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery !== '') {
        getSearchResults(searchQuery)
      }
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
    // eslint-disable-next-line
  }, [searchQuery])

  const handleChange = (e) => {
    e.preventDefault()
    setsearchQuery(e.target.value)
  }

  return (
    <div className={`${styles2.container_secondary} py-5 px-10 overflow-y-scroll pb-[75px] pt-[85px]  text-white`}>
      {error && error.message && <Notification type='error' message={error.message} title='Error' />}
      <h1 className='font-bold text-white text-3xl mt-2 mb-4 ml-2 animate-slideup'>Search</h1>
      <div className={`${styles.inputwrap} animate-slideup`}>
          <form autoComplete='off'>
            <input autoComplete='off' value={searchQuery} className={styles.input} onChange={(e) => handleChange(e)} type="search" name="search_songs" id="search" placeholder='What do you want to listen to?'/>
          </form>
          <MdSearch/>
      </div>
      <div className={`${styles2.datawrap} flex flex-wrap gap-5 justify-start mt-5`}>
        {data?.tracks?.hits?.map(song => song.track).map(song => (
          <SongCard key={song.key} song={song} loading={loading}/>
        ))}
        {data?.artists?.hits}
      </div>
    </div>
  )
}

export default Search