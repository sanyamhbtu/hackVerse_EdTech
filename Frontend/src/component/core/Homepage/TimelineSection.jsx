import React, { useDebugValue } from 'react'
import logo1 from "../../../assets/logo1.png"
import logo2 from "../../../assets/logo2.png"
import logo3 from "../../../assets/logo3.png"
import logo4 from "../../../assets/logo4.png"
import timelineimg from '../../../assets/timelineimg.jpg'

const timeline=[
  {
    logo:logo1,
    heading:"Leadership",
    Description:"Fully commited to the success of company"
  },
  {
    logo:logo2,
    heading:"Leadership",
    Description:"Fully commited to the success of company"
  },
  {
    logo:logo3,
    heading:"Leadership",
    Description:"Fully commited to the success of company"
  },
  {
    logo:logo4,
    heading:"Leadership",
    Description:"Fully commited to the success of company"
  },
]

function TimelineSection() {
  return (
    <div className='w-11/12 mx-auto' >
      <div className='flex md:flex-row md:gap-10 items-center md:py-14 flex-col gap-y-5 py-7 '>
        <div className='flex flex-col md:w-[40%] w-[70%] md:gap-5 gap-3'>
          {
            timeline.map((element,index)=>{
              return (
                <div className='flex flex-row md:gap-5 gap-2' key={index}>
                  <div className='w-[50px] bg-white items-center flex'><img src={element.logo} alt="" />
                  </div>
                  <div>
                    <h2 className='font-semibold text-xl'>{element.heading}</h2>
                    <p className='text-base'>{element.Description}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className='relative shadow-blue-300 md:w-[60%] w-[80%] mx-auto'>
          <img src={timelineimg} alt="" className='md:w-[70%] w-[85%]' />
          <div className='absolute bg-green-950 flex flex-row text-white uppercase md:py-6 py-2 left-[50%] md:translate-x-[-75%] translate-x-[-50%] translate-y-[-50%]'>
            <div className='flex gap-5 items-center border-r border-green-300 px-7'>
              <p className='md:text-3xl text-xl font-bold'> 10</p>
              <p className='text-green-400 md:text-sm text-[13px]' >Years of Experience</p>
            </div>
            <div className='flex gap-5 items-center px-7'>
              <p className='md:text-3xl text-xl font-bold'> 250</p>
              <p className='text-green-400 md:text-sm text-[13px]' >TYPES OF COURSE</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineSection