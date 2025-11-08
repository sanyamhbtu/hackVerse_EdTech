import React from 'react'
import webd1 from "../../../assets/thumbnail/webd1.png"
import { useLocation } from 'react-router-dom'

function CatalogCard({obj}) {
  
  // const obj={
  //   img:webd1,
  //   title:"React Js",
  //   price:"3500",
  //   ratingAndreveiw:9,
  // }
  return (
    <div className=' w-[100%]'>
      <div className='flex flex-col gap-1'>
        <img src={obj.thumbnail} alt="Loading Img..." className='rounded-2xl lg:h-60'/>
        <div className='text-xl text-white truncate'>{obj.courseName}</div>
        <div className='text-base '>Rating is 99+</div>
        <div className='text-xl text-white'>Rs. {obj.price}</div>
      </div>
    </div>
  )
}

export default CatalogCard