import React from 'react'

function Home() {
  return (
    <>
      <h1 className='text-6xl mb-4'>Welcome</h1>
      <p>{process.env.REACT_APP_GITHUB_URL}</p>
    </>
  )
}

export default Home