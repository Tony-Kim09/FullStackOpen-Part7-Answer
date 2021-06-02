import React, { useState } from 'react'
import { createNewBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const dispatch = useDispatch()

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(createNewBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }))
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  return (
    <div>
      <Form onSubmit={addBlog}>
        <Form.Group>
        <Form.Label>
          Title:
          <Form.Control
            id='title'
            type='text'
            name='title'
            value={newTitle}
            onChange={handleTitleChange}
          />
        </Form.Label>
        <div>
          Author:
          <Form.Control
           id='author'
           type='text'
           name='title'
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          Url:
          <Form.Control
            id='urlInput'
            type='text'
            name='title'
            value={newUrl}
            onChange={handleUrlChange}
          />
        </div>
        <br/>
        <Button variant='primary' id='createBlogButton' type="submit">Save</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm