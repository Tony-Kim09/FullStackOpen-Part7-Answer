import React from 'react'
import Blog from './Blog'
import { Link } from 'react-router-dom'

const BlogList = ({blogs}) => {

  return (
    <div>
      <h2>blogs</h2>
      <div id='blogs'>
        {blogs.sort(((first, second) => second.likes - first.likes))
          .map(blog =>
            <Link to={`/blogs/${blog.id}`} key={blog.id}>
              <Blog blog={blog}/>
            </Link>
        )}
      </div>
    </div>
  )
}

export default BlogList