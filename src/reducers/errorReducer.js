const errorReducer = (state = null, action) => {
  switch (action.type) {
      case 'NEW_ERROR':
          return action.message
      case 'RESET_ERROR':
          return null
      default:
          return state
  }
}
let timeResetter;

export const setErrorMessage= (message, seconds) => {
  if (timeResetter) {
    clearTimeout(timeResetter);
  }
  return dispatch => {
    dispatch({
      type: 'NEW_ERROR',
      message: message
    })

    timeResetter = setTimeout(() => {
        dispatch({ type: 'RESET_ERROR' })
      }, seconds)
  }
}

export default errorReducer