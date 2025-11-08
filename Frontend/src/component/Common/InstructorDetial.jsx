import React from 'react'

function InstructorDetial({obj}) {
  return (
    <div className=' h-[10%] relative flex flex-row md:gap-3 gap-5'>
      <img src={obj.image} alt="Img..." className='lg:w-20 lg:h-20 md:w-14 md:h-14 w-20 h-20 rounded-full'/>
      <div>
        <div className=' text-base text-slate-100 font-bold'>{`${obj.firstName} ${obj?.lastName}`}</div>
        <div className='text-slate-100'>{`${obj?.additionalDetal?.about}`}</div>
        { obj?.additionalDetal?.contactNumber &&
          <div className='text-slate-100'>{`+91 ${obj?.additionalDetal?.contactNumber}`}</div>
        }
      </div>
        
    </div>
  )
}

export default InstructorDetial