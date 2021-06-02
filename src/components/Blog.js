import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div className="titleAndAuthor"> 
        <b>
          {blog.title} <b>By: {blog.author}</b>
        </b>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object
}

export default Blog