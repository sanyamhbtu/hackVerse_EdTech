import React from 'react'
import { Link } from 'react-router-dom'
function SingleItem({item,linkto}) {
  return (
    <Link to={linkto}>
      <div className='text-slate-400 my-1 py-0.5'>{item}</div>
    </Link>
    
  )
}

export default SingleItem