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
                error: action.payload,
              }
            }
      default:
        return state
    }
  }