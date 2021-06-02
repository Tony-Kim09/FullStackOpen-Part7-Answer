import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import UserList from './components/Users'
import BlogList from './components/BlogList'
import { setUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import BlogForm from './components/BlogForm'
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import userService from './services/users'
import User from './components/User'
import BlogDetail from './components/BlogDetail'
import NavBar from './components/NavBar'

import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [users, setUsers] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    userService.getAllUsers()
                .then(users => setUsers(users))
                .catch(err => console.log(err))
  }, [])
  const currentUser = useSelector(state => state.userInformation)
  blogService.setToken(currentUser.token)
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong Username and Password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const blogForm = () => {
    return (
      <Togglable buttonLabel='new blog'>
        <BlogForm />
      </Togglable>
    )
  }
  //The following takes care of Login
  const loginForm = () => {

    return (
      <Togglable id='loginform' buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const userBar = () => {
    return (
      <div>
        <h2>Add a New Blog</h2>
        {blogForm()}
      </div>
    )
  }

  return (
    <div className='container'>
      <Notification/>
      <ErrorMessage/>
      {currentUser === null ?
        loginForm() :
        <BrowserRouter>
          <NavBar user={currentUser} />
          <Switch>
            <Route exact path='/users'>
              <UserList users={users} />
            </Route>
            <Route exact path='/blogs'>
              {userBar()}
              <BlogList blogs={blogs}/>
            </Route>
            <Route exact path='/blogs/:id'>
              <BlogDetail blogs={blogs}/>  
            </Route>
            <Route exact path='/users/:id'>
              <User users={users}/>
            </Route>
            <Route path='/'>
            </Route>
          </Switch>
        </BrowserRouter>
      }
    </div>
  )
}

export default App