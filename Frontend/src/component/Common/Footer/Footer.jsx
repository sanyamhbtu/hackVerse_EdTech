import React from 'react'
import SideCode from './SideCode'
import SideCode2 from './SideCode2'

function Footer() {
  return (
    <div className='flex  flex-col mx-auto w-[100%]'>
      <div className='w-[100%] border-blue-800 border-1 my-4 shadow-sm shadow-blue-300'></div>
      <div className='w-[90%] flex flex-row mx-auto  flex-wrap'>
        <SideCode2></SideCode2>
        <SideCode></SideCode>
      </div>
    </div>
  )
}

export default Footer