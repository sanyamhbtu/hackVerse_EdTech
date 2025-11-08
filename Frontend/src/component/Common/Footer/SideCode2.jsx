import React from 'react'
import data from '../../../data/data'
import SingleItem from './SingleItem'
import Para from './Para'

function SideCode2() {
  return (
    <div className='sm:w-[80%] md:w-[60%] w-40 flex sm:flex-row flex-col md:justify-start mx-auto md:items-start 
    gap-5
    '>
      <div className='w-[29%]'>
         {/* Subjects */}
         <Para text={"Subjects"} />
         {
          data.Subjects.map((item , index)=>{
            return <SingleItem item={item} key={index} linkto={item}/>
          })
         }
      </div>
      <div className='w-[29%]'>
         {/* Languages */}
         <Para text={"Languages"} />
         {
          data.Languages.map((item , index)=>{
            return <SingleItem item={item} key={index} linkto={item}/>
          })
         }
         {/* <Para text={"Support"} />
         {
          data.Support.map((item , index)=>{
            return <SingleItem item={item} key={index} linkto={item}/>
          })
         } */}
      </div>
      <div className='w-[29%]'>
        {/* Career building */}
         <Para text={"Career"} />
         {
          data["Career building"].map((item , index)=>{
            return <SingleItem item={item} key={index} linkto={item}/>
          })
         }
         {/* <Para text={"Community"} />
         {
          data.Community.map((item , index)=>{
            return <SingleItem item={item} key={index} linkto={item}/>
          })
         } */}
      </div>
    </div>
  )
}

export default SideCode2