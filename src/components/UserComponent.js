import React from 'react'
import { useGetUserQuery } from "../slices/api";

const UserComponent = () => {
  const { data: user, isError, isLoading } = useGetUserQuery();
  
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading user information.</p>;
  }

  return (
      <div>
          <h2>User Information</h2>
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
    </div>
  )
}

export default UserComponent