import React from 'react'
import { useEffect, useState, useContext } from "react"
import { GlobalContext } from '../context/GlobalState'

import SongCard from '../components/SongCard'
import Notification from '../components/Notification'
import Loader from '../components/Loader'

import styles from '../css/Discover.module.css'

import axios from 'axios'

const AroundYou = () => {
  const {songsByCountry, getChartsByCountry, changeCountry} = useContext(GlobalContext)
  const {data, error:songsByCountryError , loading:songsByCountryLoading, country:songsByCountryCountry} = songsByCountry

  const [country, setcountry] = useState(songsByCountryCountry ? songsByCountryCountry : '')
  const [error, seterror] = useState(null)
  const [loading, setloading] = useState(songsByCountryCountry ? true : false)
  
  console.log(loading);

  useEffect(() => {
    if (!songsByCountryCountry) {
      axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_PqcNZKExc5SbFsdwp330COqDnV7nT`)
      .then((res) => {
        setcountry(res?.data?.location?.country)
        changeCountry(res?.data?.location?.country)
      })
      .catch(err => seterror(err))
      .finally(() => setloading(false))
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (country !== '' && data.length === 0) {
      getChartsByCountry(country)      
    }
    // eslint-disable-next-line
  }, [country])

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
      {/* ERROR  MESSAGE*/}
      {((error && error.message) || songsByCountryError) && <Notification type='error' message={error.message} title='Error' />}
      <h1 className='font-bold text-white text-3xl mt-2 mb-4 ml-2 animate-slideup'>Around you {`( ${country} )`}</h1>
      <div className={`${styles.datawrap} flex flex-wrap gap-5 justify-start`}>
        {data.length > 0 && data.map(song => (
          <SongCard key={song.key} song={song} loading={songsByCountryLoading}/>
        ))}
      </div>
    </div>
  )
}

export default AroundYou