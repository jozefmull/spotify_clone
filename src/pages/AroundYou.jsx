import React from 'react'
import { useEffect, useState, useContext } from "react"
import { GlobalContext } from '../context/GlobalState'

import SongCard from '../components/SongCard'
import Notification from '../components/Notification'
import Loader from '../components/Loader'

import axios from 'axios'

import styles from '../css/Discover.module.css'

const AroundYou = () => {
  // data from global context
  const {songsByCountry, getChartsByCountry, changeCountry, playerData} = useContext(GlobalContext)
  const {data, error:songsByCountryError , loading:songsByCountryLoading, country:songsByCountryCountry} = songsByCountry
  const {isPlaying, activeSong} = playerData
  // component state
  // if we already have country then set it to that country otherwise set it to empty string
  const [country, setcountry] = useState(songsByCountryCountry ? songsByCountryCountry : '')
  // error set to null
  const [error, seterror] = useState(null)
  // loading if there is no country we set it to true otherwise we set it to false
  const [loading, setloading] = useState(!songsByCountryCountry ? true : false)
  
  useEffect(() => {
    // if there are no songs by country get country you are in right now
    if (!songsByCountryCountry) {
      axios.get(`https://geo.ipify.org/api/v2/country?apiKey=${process.env.REACT_APP_GEO_API_KEY}`)
      .then((res) => {
        //set country to current country and change country in the context 
        setcountry(res?.data?.location?.country)
        changeCountry(res?.data?.location?.country)
      })
      .catch(err => seterror(err))
      // finally after everything is done set loading of this page to false
      .finally(() => setloading(false))
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    // if country isnt empty string and we have no data from songs by country get charts by country from shazam
    if (country !== '' && data.length === 0) {
      getChartsByCountry(country)      
    }
    // eslint-disable-next-line
  }, [country])

  //if page is loading display loader coontainer
  if (loading ) {
    return (
      <div className={`${styles.container_secondary} py-5 px-10 overflow-y-scroll pb-[75px] pt-[85px]  text-white`}>
        <div className='relative w-full min-h-[25px]'>
            <Loader/>
        </div>
      </div>
    )
  }
    
  return (
    <div className={`${styles.container_secondary} py-5 px-10 overflow-y-scroll pb-[75px] pt-[85px]  text-white`}>
      {/* ERROR  MESSAGE - if there is a error and it has a message or there is error from songs by country fetch */}
      {((error && error.message) || songsByCountryError) && <Notification type='error' message={error.message} title='Error' />}
      <h1 className='font-bold text-white text-3xl mt-2 mb-4 ml-2 animate-slideup'>Around you {`( ${country} )`}</h1>
      <div className={`${styles.datawrap} flex flex-wrap gap-5 justify-start`}>
        {/* if we have some data then map through them and display song cards */}
        {data.length > 0 && data.map((song,id) => (
          <SongCard 
            key={song.key} 
            song={song} 
            loading={songsByCountryLoading}
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

export default AroundYou