import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full bg-blue-600 p-4'>
       <div className='flex gap-4 items-center justify-center'>
          <Link to={'/'}>Home</Link>
          <Link to={'/snippets'}>Snippet</Link>
       </div>
    </div>
  )
}

export default Navbar
