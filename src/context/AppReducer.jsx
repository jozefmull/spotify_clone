// Reducer is how we specify application state changes in response to certain actions to our context
export const AppReducer = (state, action) => {
    switch (action.type) {
      case 'CHART_BY_GENRE_REQUEST':
        return {
          ...state,
          loading: true,
        }
        case 'CHART_BY_GENRE_SUCCESS':
            return {
              ...state,
              loading: false,
              songsByGenre: action.payload,
            }
        case 'CHART_BY_GENRE_FAIL':
        return {
          ...state,
          error: action.payload
        }
        case 'CHANGE_GENRE':
          return {
            ...state,
            genre: action.payload,
          }
      default:
        return state
    }
  }