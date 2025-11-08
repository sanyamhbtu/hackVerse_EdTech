import React from 'react'
import data from '../../../data/data'
import SingleItem from './SingleItem'
import Para from './Para'

function SideCode() {
  return (
    <div className='sm:w-[80%] md:w-[60%] w-40 flex sm:flex-row flex-col md:justify-start mx-auto md:items-start
    gap-5
    '>
      <div className='w-[29%]'>
         {/* Company */}
         <Para text={"Company"} />
         {
          data.Company.map((item , index)=>{
            return <SingleItem item={item} key={index} linkto={item}/>
          })
         }
      </div>
      <div className='w-[29%]'>
         {/* Resources Support */}
         <Para text={"Resources"} />
         {
          data.Resources.map((item , index)=>{
            return <SingleItem item={item} key={index} linkto={item}/>
          })
         }
         <Para text={"Support"} />
         {
          data.Support.map((item , index)=>{
            return <SingleItem item={item} key={index} linkto={item}/>
          })
         }
      </div>
      <div className='w-[29%]'>
        {/* Plans Community */}
        {/* Resources Support */}
         <Para text={"Plans"} />
         {
          data.Plans.map((item , index)=>{
            return <SingleItem item={item} key={index} linkto={item}/>
          })
         }
         <Para text={"Community"} />
         {
          data.Community.map((item , index)=>{
            return <SingleItem item={item} key={index} linkto={item}/>
          })
         }
      </div>
    </div>
  )
}

export default SideCode