import blogService from '../services/blogs'
import { setErrorMessage } from './errorReducer'
import { setNotification } from './notificationReducer'

const blogReducer = (state= [], action) => {
  switch(action.type){
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'DELETE_BLOG':
      const id = action.data.id
      return state.filter(blog => blog.id !== id)
    case 'UPDATE_LIKES':
      const updatingBlog = action.data
      const blogToChange = state.find(x => x.id === updatingBlog.id)

      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }
      return state.map(blog => blog.id !== updatingBlog.id ? blog : changedBlog)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type:'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createNewBlog = (data) => {
  return async dispatch => {
    try{
      const blog = await blogService.create(data)
      const message = `Your New Blog: ${blog.title} by ${blog.author} has been added`
      dispatch(
        setNotification(message, 5000)
      )
      dispatch({
        type: 'NEW_BLOG',
        data: blog
      })
    }
    catch (err) {
      dispatch(setErrorMessage(err.response.data.error, 5000))
    }
  }
}

export const deleteBlogUsingId = (id) => {
  return async dispatch => {
    if (window.confirm('Would you like to remove the blog?')) {
      try {
        const deleteStatus = await blogService.deleteBlog(id)
        if (deleteStatus === 204){
          dispatch(setNotification('The blog has been successfully deleted!', 5000))
          dispatch({
            type: 'DELETE_BLOG',
            data: { id }
          })
        }
      } catch (err) {
        dispatch(setErrorMessage(err.response.data.error, 5000))
      }
    }
  }
}

export const updateLikes = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, blog)
    dispatch({
      type:'UPDATE_LIKES',
      data: updatedBlog
    })
  }
}

export default blogReducer