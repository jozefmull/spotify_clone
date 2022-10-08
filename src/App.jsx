import React, {useContext} from 'react'
import { GlobalContext } from './context/GlobalState'
import {Routes, Route} from 'react-router-dom'

import Sidebar from './components/Sidebar'
import MusicPlayer from './components/MusicPlayer/index'
import TopBar from './components/TopBar'
import Notification from './components/Notification'

import Discover from './pages/Discover'
import Search from './pages/Search'
import AroundYou from './pages/AroundYou'
// import TopArtists from './pages/TopArtists'
import TopCharts from './pages/TopCharts'
import SongDetails from './pages/SongDetails'
import ArtistDetails from './pages/ArtistDetails'

import styles from './css/App.module.css'

const App = () => {
  const {playerData} = useContext(GlobalContext)
  const {isActive} = playerData

  return (
    <div className={`${styles.app} h-screen max-w-screen flex overflow-hidden relative`}>
      <Notification type='info' message='This app uses Shazam-core API free tier' title='INFO!' closeAfter={20000}/>
      <Notification type='info' message='API calls are limited to 500 a month' title='INFO!' closeAfter={20000}/>
      {isActive && <Notification type='info' message='This app can play only song preview!' title='INFO!' closeAfter={20000}/>}
        <Sidebar/>
        <div className="flex flex-col w-screen overflow-hidden">
          <TopBar />
          <Routes>
            <Route path='/' element={<Discover/>} />
            <Route path='/search' element={<Search/>} />
            <Route path='/around-you' element={<AroundYou/>} />
            {/* <Route path='/top-artists' element={<TopArtists/>} /> */}
            <Route path='/top-charts' element={<TopCharts/>} />
            <Route path='/song/:songid' element={<SongDetails/>} />
            <Route path='/artist/:artistid' element={<ArtistDetails/>} />
            <Route path='/search/:searchquery' element={<Search/>} />
          </Routes>
          <MusicPlayer />
        </div>  
    </div>
  )
}

export default App