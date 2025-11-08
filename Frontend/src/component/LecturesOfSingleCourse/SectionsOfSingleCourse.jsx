import React, { useState } from 'react'
import SingleSection from './SingleSection'
// import videoUrl from "../../assets/lecture.mp4"

function SectionsOfSingleCourse({sections}) {
  const [videoUrl,setVideoUrl]=useState(null);
  return (
    <div className='flex flex-row gap-2 items-start'>
      <div className='w-[20%] h-screen overflow-y-auto px-1'>
        {
          sections.map((obj,index)=>{
            return <SingleSection setVideoUrl={setVideoUrl} key={index} obj={obj} ></SingleSection>
          })
        }
        
      </div>
      {
        videoUrl ? 
        (<div className='flex flex-col mx-auto w-[72%]'>
          <video src={videoUrl} className='rounded-sm'
          controls 
          ></video>
        </div>):(
          <div className='text-4xl text-slate-300 font-bold mx-auto mt-16'>Lecture Plays Here</div>
        )
      }
        
    </div>
  )
}

export default SectionsOfSingleCourse