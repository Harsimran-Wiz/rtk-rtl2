import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../slices/userSlice'

const UserComponent = () => {
    const user = useSelector(selectUser)
  return (
      <div>
          <h2>User Information</h2>
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
    </div>
  )
}

export default UserComponent