import React from 'react'
import { useSelector } from 'react-redux'

const ErrorMessage = () => {
  const message = useSelector(state => state.errorMessage)

  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

export default ErrorMessage