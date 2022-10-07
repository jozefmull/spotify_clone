import {createContext, useReducer} from 'react'
import { AppReducer } from './AppReducer'
import axios from 'axios'

const initialState = {
    songsByGenre: {
      loading: false,
      error: null,
      genre: {
        title: 'Pop',
        value: 'POP'
      },
      data: localStorage.getItem('KZsO3WAdde_PopSongs') ? JSON.parse(localStorage.getItem('KZsO3WAdde_PopSongs')) : []
    },
    songDetails: {
      loading: false,
      error: null,
      data: localStorage.getItem('KZsO3WAdde_SongDetails') ? JSON.parse(localStorage.getItem('KZsO3WAdde_SongDetails')) : {}
    },
    songsByCountry: {
      loading: false,
      error: null,
      country: localStorage.getItem('KZsO3WAdde_country') ? localStorage.getItem('KZsO3WAdde_country') : null,
      data: localStorage.getItem('KZsO3WAdde_SongsByCountry') ? JSON.parse(localStorage.getItem('KZsO3WAdde_SongsByCountry')) : []
    },
    topCharts: {
      loading:false,
      error:null,
      data: localStorage.getItem('KZsO3WAdde_TopCharts') ? JSON.parse(localStorage.getItem('KZsO3WAdde_TopCharts')) : []
    },
    relatedSongs: {
      loading:false,
      error:null,
      data: []
    },
    searchResults:{
      loading:false,
      error:null,
      data: {}
    },
    artistDetails: {
      loading:false,
      error:null,
      data:{}
    },
    playerData: {
      currentSongs: [],
      currentIndex: 0,
      isActive: false,
      isPlaying: false,
      activeSong: {},
      genreListId: '',
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
    * GET WORLD CHARTS BY GENRE
    */
    const getWorldChartsByGenre = async(genre = state.genre.value) => {
        const options = {
            params: {genre_code: genre},
            headers: {
              'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
              'X-RapidAPI-Host': process.env.REACT_APP_API_HOST
            }
        }

        try {
            dispatch({type: 'CHART_BY_GENRE_REQUEST'})
            const res = await axios.get('https://shazam-core.p.rapidapi.com/v1/charts/genre-world', options)
            const {data} = res

            dispatch({type: 'CHART_BY_GENRE_SUCCESS', payload: data.filter(item => item?.hub?.actions)})

            if (genre === 'POP') {
              localStorage.setItem('KZsO3WAdde_PopSongs', JSON.stringify(data))
            }
        } catch (error) {
            dispatch({type: 'CHART_BY_GENRE_FAIL', payload: error})
        }
    }
    /*
    * GET SONG DETAILS
    */
    const getSongDetails = async(id) => {
      const options = {
        params: {track_id: id},
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
          'X-RapidAPI-Host': process.env.REACT_APP_API_HOST
        }
      }

      try {
        dispatch({type: 'SONG_DETAILS_REQUEST'})

        const res = await axios.get('https://shazam-core.p.rapidapi.com/v1/tracks/details', options)
        const {data} = res

        dispatch({type: 'SONG_DETAILS_SUCCESS', payload: data})

        localStorage.setItem('KZsO3WAdde_SongDetails', JSON.stringify(data))

      } catch (error) {
          dispatch({type: 'SONG_DETAILS_FAIL', payload: error})
      }
    }

    /*
    * CHANGE COUNTRY ON AROUND YOU
    */
    const changeCountry = (country) => {
      try {
        dispatch({type: 'SET_COUNTRY', payload: country})
        localStorage.setItem('KZsO3WAdde_country', country)

      } catch (error) {
        console.error(error);
      }
    }

    /*
    * GET CHARTS BY COUNTRY
    */
   const getChartsByCountry = async(country) => {
    const options = {
      params: {country_code: country},
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_API_HOST
      }
    }

    try {
      dispatch({type: 'SONGS_BY_COUNTRY_REQUEST'})

      const res = await axios.get('https://shazam-core.p.rapidapi.com/v1/charts/country', options)
      const {data} = res

      dispatch({type: 'SONGS_BY_COUNTRY_SUCCESS', payload: data.filter(item => item?.hub?.actions)})

      localStorage.setItem('KZsO3WAdde_SongsByCountry', JSON.stringify(data.filter(item => item?.hub?.actions)))
    } catch (error) {
       dispatch({type: 'SONGS_BY_COUNTRY_FAIL', payload: error})
    }
   }

   /*
    * GET TOP CHARTS
    */
   const getTopCharts = async() => {
    const options = {
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_API_HOST
      }
    };

    try {
      dispatch({type: 'TOP_CHARTS_REQUEST'})

      const res = await axios.get('https://shazam-core.p.rapidapi.com/v1/charts/world', options)
      const {data} = res

      dispatch({type: 'TOP_CHARTS_SUCCESS', payload: data.filter(item => item?.hub?.actions)})

      localStorage.setItem('KZsO3WAdde_TopCharts', JSON.stringify(data.filter(item => item?.hub?.actions)))
    } catch (error) {
       dispatch({type: 'TOP_CHARTS_FAIL', payload: error})
    }
   }

   /*
    * GET RELATED SONGS
    */
   const getRelatedSongs = async(id) => {

    const options = {
      params: {track_id: id},
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_API_HOST
      }
    }

    try {
      dispatch({type: 'RELATED_SONGS_REQUEST'})

      const res = await axios.get('https://shazam-core.p.rapidapi.com/v1/tracks/related', options)
      const {data} = res
      // payload filter data we get bcs some of the songs do not have audio in item.hub.actions[1]
      dispatch({type: 'RELATED_SONGS_SUCCESS', payload: data.filter(item => item?.hub?.actions)})
    } catch (error) {
       dispatch({type: 'RELATED_SONGS_FAIL', payload: error})
    }
   }

   /*
   * GET SEARCH RESULTS
   */
   const getSearchResults = async(myquery) => {
    //options for API call
    const options = {
      params: {offset: '20', query: myquery, search_type: 'SONGS'},
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_API_HOST
      }
    }
    // try to fetch data and catch error
    try {
      // set loading to true
      dispatch({type: 'SEARCH_REQUEST'})

      const res = await axios.get('https://shazam-core.p.rapidapi.com/v1/search/multi', options)
      const {data} = res
      // set loading to false and send data as a payload - we need to alter data bcs of searh results structure and then filter items that do not have audio in them
      dispatch({type: 'SEARCH_SUCCESS', payload: data?.tracks?.hits.map(song => song.track).filter(item => item?.hub?.actions)})
      
    } catch (error) {
      // set loading to false and send error as a payload
       dispatch({type: 'SEARCH_FAIL', payload: error})
    }
   }

   /*
    * GET RELATED SONGS
    */
   const getArtistDetails = async(key) => {
    dispatch({type: 'ARTIST_DETAILS_RESET'})

    const options = {
      params: {artist_id: key},
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_API_HOST
      }
    };

    try {
      dispatch({type: 'ARTIST_DETAILS_REQUEST'})

      const res = await axios.get('https://shazam-core.p.rapidapi.com/v1/artists/details', options)
      const {data} = res

      dispatch({type: 'ARTIST_DETAILS_SUCCESS', payload: data})
      
    } catch (error) {
       dispatch({type: 'ARTIST_DETAILS_FAIL', payload: error})
    }
   }

    return (
        <GlobalContext.Provider
          value={{
            songsByGenre: state.songsByGenre,
            songDetails: state.songDetails,
            songsByCountry: state.songsByCountry,
            topCharts: state.topCharts,
            relatedSongs: state.relatedSongs,
            searchResults: state.searchResults,
            artistDetails: state.artistDetails,
            playerData: state.playerData,
            getWorldChartsByGenre,
            changeGenre,
            getSongDetails,
            getChartsByCountry,
            changeCountry,
            getTopCharts,
            getRelatedSongs,
            getSearchResults,
            getArtistDetails,
            dispatch
          }}
        >
          {children}
        </GlobalContext.Provider>
      )
}