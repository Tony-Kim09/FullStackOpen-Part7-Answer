import React from 'react'
import { useParams } from 'react-router-dom'

const User = ({users}) => {
  const id = useParams().id
  const user = users.find(n => n.id === id)

  return (
    user ? 
    <div>
      <h2>
        {user.username}
      </h2>
      <p>Added Blogs</p>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
    : null
  )
}
export default User