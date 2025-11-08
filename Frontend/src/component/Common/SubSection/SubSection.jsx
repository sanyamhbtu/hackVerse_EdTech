import React, { useState } from 'react'
import { FaCaretDown } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { ImParagraphJustify } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import LectureUpdateForm from '../LectureUpdateForm';

function SubSection({obj,handleDeleteSubSec}) {
  const [isToggle,setToggle]=useState(false);
  const [lectureUpdate,setLectureUpdate]=useState(false);
  function handleViewlecture(){
    setLectureUpdate(true);
  }
  function canceltheUpdate(value){
    setLectureUpdate(value); 
  }

  return (
    <div className='flex flex-col gap-1 bg-slate-800 text-slate-400 w-[100%] mx-auto rounded-sm px-5 py-5'>
      <div className={`flex flex-row px-3 justify-between items-center  hover:cursor-pointer`}
      onClick={()=>{
        setToggle(!isToggle)
        console.log("hi I am here ")
        handleViewlecture()
      }}
      >
        <div className='flex flex-row gap-2'>
          <div className='flex flex-row gap-1 items-center'>
            <FaCaretDown />
            <ImParagraphJustify/>
          </div>
          <div className='text-base text-slate-400'>{obj.title}</div>
        </div>
        <div className='flex flex-row gap-2 items-center'>
          <FaPen/>
          <MdDelete
          className='hover:cursor-pointer'
          onClick={()=>{
            handleDeleteSubSec(obj._id)
          }}
          />
        </div>
      </div>
      <div className='border-1 border-slate-500 '></div>
      {
        lectureUpdate && <LectureUpdateForm obj={obj} canceltheUpdate={canceltheUpdate}/>
      }
    </div>
  )
}

export default SubSection