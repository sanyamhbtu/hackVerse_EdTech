import React from 'react'
import img from "../../assets/about1.jpg"
import { useNavigate } from 'react-router-dom'

function SingleEnrolledCourse({obj}) {
  const navigate=useNavigate();
  // console.log("Enrolled course is ",obj);
  const subSectionLen=obj?.courseContent?.reduce((acc,curr)=>acc+curr?.subsection?.length,0) ;

  return (
    <div className='flex-col sm:items-start items-center sm:w-fit w-[95%] '>
      <div className='md:flex md:flex-row flex-col md:gap-7 gap-5 text-slate-400 text-base md:w-fit hover:cursor-pointer'
      onClick={()=>{
        navigate(`/dashboard/enrolled-courses/singleEnrolled/${obj._id}`)
      }}
      >
        <img src={obj.thumbnail} alt="" 
        className='rounded-lg xl:h-60 xl:w-88 lg:h-56 lg:w-80 md:h-52 md:w-66 sm:w-88 sm:h-68 w-88 '
        />
        <div className='flex flex-col gap-y-2'>
          <div className='lg:text-3xl text-2xl font-bold text-slate-200'>{obj.courseName}</div>
          <div className='text-xl font-semibold'>{obj?.category?.categoryName}</div>
          {/* <div className='text-ellipsis overflow-hidden md:line-clamp-2 lg:line-clamp-none md:w-[80%] sm:w-[60%]' >
            {obj.courseDescription}</div> */}
          <div className='flex flex-row gap-2 p-1 border-1 border-slate-400 rounded-sm w-fit'>
            <div className='text-slate-300 font-bold'>{`${obj?.courseContent && obj?.courseContent.length} Sections`}</div>
            <div className='text-slate-300 font-bold'>{`${subSectionLen} Sub Sections`}
            </div>
          </div>
          <div className='text-yellow-400'>{`45 Rating is here`}</div>
        </div>
      </div>
      <div className='border-1 border-slate-800 md:mt-5 mt-3'></div>
    </div>
  )
}

export default SingleEnrolledCourse