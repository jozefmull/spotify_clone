import {createContext, useReducer} from 'react'
import { AppReducer } from './AppReducer'

import axios from 'axios'

const initialState = {
    loading: false,
    error: '',
    songsByGenre: [],
    genre: {
      title: 'Pop',
      value: 'POP'
    }
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    const changeGenre = (genre) => {
      try {
        dispatch({type: 'CHANGE_GENRE', payload: genre})
      } catch (error) {
        console.error(error);
      }
    }

    const getWorldChartsByGenre = async(genre = state.genre.value) => {
        const options = {
            params: {genre_code: genre},
            headers: {
              'X-RapidAPI-Key': 'd4cff359efmshcdf6e869d043e5dp1fcfe3jsn7c77f4ddd1f2',
              'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
            }
        }

        try {
            dispatch({type: 'CHART_BY_GENRE_REQUEST'})
            const res = await axios.get('https://shazam-core.p.rapidapi.com/v1/charts/genre-world', options)
            const {data} = res

            dispatch({type: 'CHART_BY_GENRE_SUCCESS', payload: data})
        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <GlobalContext.Provider
          value={{
            loading: state.loading,
            error: state.error,
            songsByGenre: state.songsByGenre,
            genre: state.genre,
            getWorldChartsByGenre,
            changeGenre
          }}
        >
          {children}
        </GlobalContext.Provider>
      )
}