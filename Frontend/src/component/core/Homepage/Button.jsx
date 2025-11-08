import React, { act } from 'react'
import { Link } from 'react-router-dom'

const Button = ({children,active,linkto}) => {
  return (
    <Link to={linkto}>
      <div className={`text-center text-[13px] md:px-6 py-3 px-3 rounded-md font-bold ${
        active ? "bg-yellow-400  text-black":"bg-black text-white"
      } hover:scale-95
      `}>
        {children}
      </div>
    </Link>
  )
}

export default Button
