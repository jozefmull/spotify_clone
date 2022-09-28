import React, {useEffect} from 'react'

import {Routes, Route} from 'react-router-dom'

import Sidebar from './components/Sidebar'
import MusicPlayer from './components/MusicPlayer'
import TopBar from './components/TopBar'

import Discover from './pages/Discover'
import Search from './pages/Search'
import AroundYou from './pages/AroundYou'
import TopArtists from './pages/TopArtists'
import TopCharts from './pages/TopCharts'

const App = () => {
  return (
    <div className='h-screen max-w-screen flex bg-[#121212] overflow-hidden'>
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
          </Routes>
        </div>  
    </div>
  )
}

export default App