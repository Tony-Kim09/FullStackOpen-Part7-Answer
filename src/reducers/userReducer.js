const userReducer = (state = JSON.parse(window.localStorage.getItem('loggedBlogappUser')), action) => {
  switch(action.type) {
    case 'NEW_USER':
      return action.data
    default:
      return state
  }
}

export const setUser = (data) => {
  return {
    type: 'NEW_USER',
    data
  }
}

export default userReducer