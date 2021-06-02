import { Link } from 'react-router-dom'
import React from 'react'
import LogoutForm from '../components/Logout'
import { Navbar, Nav } from 'react-bootstrap'

const NavBar = ({user}) => {
  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
  }

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className='mr-auto'>
          <Nav.Link href='#' as='span'>
            <Link  to='/blogs'>blog</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link to='/users'>users</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <div><b>{user.name}</b> has logged in</div>
          </Nav.Link>
          <Nav.Link>
            <LogoutForm logout={handleLogOut}/>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar