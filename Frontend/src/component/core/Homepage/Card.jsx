import React from 'react'
import { MdOutlinePeopleOutline } from "react-icons/md";
import { MdPlayLesson } from "react-icons/md";

function Card({heading,description,level,lessonNumber,active}) {
  // console.log(active);
  return (
    <div className={`flex flex-col gap-2 md:w-[25%] w-[70%] p-5 lg:h-60 md:h-88 ${active?"bg-white text-black shadow-[12px_12px_0px_rgba(228,243,123,1)]":"bg-slate-800 text-slate-300"}`}>
      <div className='text-2xl font-semibold'>{heading}</div>
      <div className='md:text-base '>{description}</div>
      <div className='border-slate-300 border-1 mb-1'></div>
      <div className="flex flex-row justify-between px-1">
        <div className='flex flex-row gap-1 items-center'><MdOutlinePeopleOutline /> <p>{level}</p></div>
        <div className='flex flex-row gap-1 items-center'><MdPlayLesson /> <p>{lessonNumber}</p></div>
      </div>
    </div>
  )
}

export default Card