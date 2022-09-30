import React, {useEffect} from 'react'

import {Routes, Route} from 'react-router-dom'

import Sidebar from './components/Sidebar'
import MusicPlayer from './components/MusicPlayer'
import TopBar from './components/TopBar'
import Notification from './components/Notification'

import Discover from './pages/Discover'
import Search from './pages/Search'
import AroundYou from './pages/AroundYou'
import TopArtists from './pages/TopArtists'
import TopCharts from './pages/TopCharts'
import SongDetails from './pages/SongDetails'

import styles from './css/App.module.css'

const App = () => {
  return (
    <div className={`${styles.app} h-screen max-w-screen flex overflow-hidden`}>
      <Notification type='info' message='This app uses Shazam-core API free tier' title='INFO!' closeAfter={100000}/>
      <Notification type='info' message='API calls are limited to 500 a month' title='INFO!' closeAfter={100000}/>
        <Sidebar/>
        <MusicPlayer/>
        <div className="flex flex-col w-screen">
          <TopBar />
          <Routes>
            <Route path='/' element={<Discover/>} />
            <Route path='/search' element={<Search/>} />
            <Route path='/around-you' element={<AroundYou/>} />
            <Route path='/top-artists' element={<TopArtists/>} />
            <Route path='/top-charts' element={<TopCharts/>} />
            <Route path='/song/:songid' element={<SongDetails/>} />
          </Routes>
        </div>  
    </div>
  )
}

export default App