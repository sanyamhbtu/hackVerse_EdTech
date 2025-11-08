import React from 'react'
// import videoUrl from "../../assets/lecture.mp4"

function LectureOfSections({setVideoUrl,lectureDesc}) {
  return (
    <div>
      <div className='w-11/12 bg-slate-700 text-slate-200 font-bold rounded-sm py-1.5 px-2 hover:cursor-pointer
      '
      onClick={()=>{
        setVideoUrl(lectureDesc?.videoUrl)
      }}
      >
      {lectureDesc?.title}
      </div>
    </div>
  )
}

export default LectureOfSections