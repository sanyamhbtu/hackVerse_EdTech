import React from 'react'
import emptyStar from "../../../assets/emptyStar.png"
import fullStar from "../../../assets/filledStar.png"

function Review({img,name,description,rate}) {
  const maxStar=5;
  return (
    <div className='flex flex-col justify-start gap-1 w-[100%]  bg-slate-800 p-5 '>
      <div className="flex flex-row">
        <img src={img} alt="" 
        className='w-[30px] h-[30px] rounded-full mx-1'/>
        <div className='text-base text-white font-bold ml-2'>{name}</div>
      </div>
      <div className='text-base text-slate-500'>
        {description}
      </div>
      <div className='flex flex-row gap-1'>
        <p className='text-yellow-400'>{rate}</p>
        <div className='flex flex-row gap-1'>{
          [...Array(maxStar)].map((_,i)=>(
            <img
            className='w-[20px] h-fit'
            key={i}
            src={i<rate?fullStar:emptyStar}
            alt="stars"
            />
          ))
          }</div>
      </div>

    </div>
  )
}

export default Review