import React, { useState } from 'react'
import LectureOfSections from './LectureOfSections'
import { IoIosArrowDown } from "react-icons/io";

function SingleSection({setVideoUrl,obj}) {
  const [openLecture,setOpenLecture]=useState(false);

  return (
    <div className=''>
      <div className='bg-slate-800 text-base text-slate-100 font bold rounded-sm shadow-slate-200 shadow-md py-2.5 flex flex-col gap-0 mb-3 '>
        <div className='flex flex-row justify-between py-2 px-2 hover:cursor-pointer'
        onClick={()=>{
          setOpenLecture(!openLecture);
        }} 
        >
          <p className='text-xl font-bold text-slate-50 items-center'>{obj?.sectionName}</p>
          <IoIosArrowDown className='text-2xl font-black '/>
        </div>
        {
          openLecture && (
            <div className='flex flex-col gap-1'>
              {
                obj?.subsection.map((lecture,index)=>{
                  return <LectureOfSections setVideoUrl={setVideoUrl} lectureDesc={lecture} key={index}></LectureOfSections>
                })
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default SingleSection