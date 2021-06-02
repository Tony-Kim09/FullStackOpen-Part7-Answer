import React from 'react'
import { deleteBlogUsingId, updateLikes } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useParams} from 'react-router-dom'
import {Button} from 'react-bootstrap';

const BlogDetail = ({blogs}) => {
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)
  const dispatch = useDispatch()

  return (
    blog ?
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes</p>
      <Button className='likeButton' onClick={() => dispatch(updateLikes(blog))}>Like</Button>
      <Button className='deleteBlogButton' onClick={() => dispatch(deleteBlogUsingId(blog.id))} >Delete</Button> <br/>
    </div>
    : null
  )
}
export default BlogDetail