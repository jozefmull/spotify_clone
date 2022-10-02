// Reducer is how we specify application state changes in response to certain actions to our context
export const AppReducer = (state, action) => {
    switch (action.type) {
      case 'CHART_BY_GENRE_REQUEST':
        return {
          ...state,
          songsByGenre: {
            ...state.songsByGenre,
            loading: true
          }
        }
        case 'CHART_BY_GENRE_SUCCESS':
            return {
              ...state,
              songsByGenre: {
                ...state.songsByGenre,
                loading: false,
                data: action.payload
              }
            }
        case 'CHART_BY_GENRE_FAIL':
        return {
          ...state,
          songsByGenre: {
            ...state.songsByGenre,
            loading: false,
            error: action.payload
          }
        }
        case 'CHANGE_GENRE':
          return {
            ...state,
            songsByGenre: {
              ...state.songsByGenre,
              genre: action.payload
            }
          }
          case 'SONG_DETAILS_REQUEST':
            return {
              ...state,
              songDetails: {
                ...state.songDetails,
                loading: true,
              }
            }
          case 'SONG_DETAILS_SUCCESS':
                return {
                  ...state,
                  songDetails: {
                    ...state.songDetails,
                    loading: false,
                    data: action.payload,
                  }
                }
          case 'SONG_DETAILS_FAIL':
            return {
              ...state,
              songDetails: {
                ...state.songDetails,
                loading: false,
                error: action.payload,
              }
            }
          case 'SONGS_BY_COUNTRY_REQUEST':
              return {
                ...state,
                songsByCountry: {
                  ...state.songsByCountry,
                  loading: true,
              }
            }
          case 'SONGS_BY_COUNTRY_SUCCESS':
              return {
                ...state,
                songsByCountry: {
                  ...state.songsByCountry,
                  loading: false,
                  data: action.payload
              }
            }
          case 'SONGS_BY_COUNTRY_FAIL':
              return {
                ...state,
                songsByCountry: {
                  ...state.songsByCountry,
                  loading: false,
                  error: action.payload,
              }
            }
          case 'SET_COUNTRY': 
            return {
              ...state,
              songsByCountry: {
                ...state.songsByCountry,
                country: action.payload
              }
            }
          case 'TOP_CHARTS_REQUEST':
              return {
                ...state,
                topCharts: {
                  ...state.topCharts,
                  loading: true,
              }
            }
          case 'TOP_CHARTS_SUCCESS':
              return {
                ...state,
                topCharts: {
                  ...state.topCharts,
                  loading: false,
                  data: action.payload
              }
            }
          case 'TOP_CHARTS_FAIL':
              return {
                ...state,
                topCharts: {
                  ...state.topCharts,
                  loading: false,
                  error:action.payload
              }
            }
          case 'RELATED_SONGS_REQUEST':
              return {
                ...state,
                relatedSongs: {
                  ...state.relatedSongs,
                  loading: true,
              }
            }
          case 'RELATED_SONGS_SUCCESS':
              return {
                ...state,
                relatedSongs: {
                  ...state.relatedSongs,
                  loading: false,
                  data: action.payload
              }
            }
          case 'RELATED_SONGS_FAIL':
              return {
                ...state,
                relatedSongs: {
                  ...state.relatedSongs,
                  loading: false,
                  error:action.payload
              }
            }
          case 'SEARCH_REQUEST':
              return {
                ...state,
                searchResults: {
                  ...state.searchResults,
                  loading: true,
              }
            }
          case 'SEARCH_SUCCESS':
              return {
                ...state,
                searchResults: {
                  ...state.searchResults,
                  loading: false,
                  data: action.payload
              }
            }
          case 'SEARCH_FAIL':
              return {
                ...state,
                searchResults: {
                  ...state.searchResults,
                  loading: false,
                  error: action.payload
              }
            }
      default:
        return state
    }
  }