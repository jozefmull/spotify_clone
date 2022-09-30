import {createContext, useReducer} from 'react'
import { AppReducer } from './AppReducer'

import axios from 'axios'

// const APIKEY = 'd4cff359efmshcdf6e869d043e5dp1fcfe3jsn7c77f4ddd1f2'
// const APIHOST = 'shazam-core.p.rapidapi.com'
const APIKEY = '798594203emsh16fe745f0e2d191p169316jsnfa0bffe0b22c'
const APIHOST = 'shazam-core.p.rapidapi.com'

const initialState = {
    songsByGenre: {
      loading: false,
      error: null,
      genre: {
        title: 'Pop',
        value: 'POP'
      },
      data: localStorage.getItem('PopSongs') ? JSON.parse(localStorage.getItem('PopSongs')) : []
    },
    songDetails: {
      loading: false,
      error: null,
      data: localStorage.getItem('SongDetails') ? JSON.parse(localStorage.getItem('SongDetails')) : {}
    } 
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    /*
    * CHANGE GENRE ON DISCOVER PAGE
    */
    const changeGenre = (genre) => {
      try {
        dispatch({type: 'CHANGE_GENRE', payload: genre})
      } catch (error) {
        console.error(error);
      }
    }

    /*
    * GET WORLD CHARTS BZ GENRE
    */
    const getWorldChartsByGenre = async(genre = state.genre.value) => {
        const options = {
            params: {genre_code: genre},
            headers: {
              'X-RapidAPI-Key': APIKEY,
              'X-RapidAPI-Host': APIHOST
            }
        }

        try {
            dispatch({type: 'CHART_BY_GENRE_REQUEST'})
            const res = await axios.get('https://shazam-core.p.rapidapi.com/v1/charts/genre-world', options)
            const {data} = res

            dispatch({type: 'CHART_BY_GENRE_SUCCESS', payload: data})

            if (genre === 'POP') {
              localStorage.setItem('PopSongs', JSON.stringify(data))
            }
        } catch (error) {
            dispatch({type: 'CHART_BY_GENRE_FAIL', payload: error})
        }
    }
    /*
    * GET SONG DETAILS
    */
    const getSongDetails = async(id) => {
      console.log('called');
      const options = {
        params: {track_id: id},
        headers: {
          'X-RapidAPI-Key': APIKEY,
          'X-RapidAPI-Host': APIHOST
        }
      }

      try {
        dispatch({type: 'SONG_DETAILS_REQUEST'})

        const res = await axios.get('https://shazam-core.p.rapidapi.com/v1/tracks/details', options)
        const {data} = res

        dispatch({type: 'SONG_DETAILS_SUCCESS', payload: data})
        localStorage.setItem('SongDetails', JSON.stringify(data))

      } catch (error) {
          dispatch({type: 'SONG_DETAILS_FAIL', payload: error})
      }
    }

    return (
        <GlobalContext.Provider
          value={{
            loading: state.loading,
            error: state.error,
            songsByGenre: state.songsByGenre,
            genre: state.genre,
            songDetails: state.songDetails,
            getWorldChartsByGenre,
            changeGenre,
            getSongDetails
          }}
        >
          {children}
        </GlobalContext.Provider>
      )
}