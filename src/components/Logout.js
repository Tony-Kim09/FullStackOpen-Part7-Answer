import React from 'react'
import { Form, Button } from 'react-bootstrap'

const logoutForm = ({ logout }) => (
  <Form onSubmit={logout}>
    <Button variant='secondary' id='logoutButton' type="submit">logout</Button>
  </Form>
)

export default logoutForm