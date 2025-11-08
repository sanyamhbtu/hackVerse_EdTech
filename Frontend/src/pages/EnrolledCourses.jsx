import React, { useEffect } from 'react'
import DashBoardSideBar from '../component/Common/DashBoardSideBar'
import { useDispatch, useSelector } from 'react-redux';
import SingleEnrolledCourse from '../component/Common/SingleEnrolledCourse';
import { fetchEnrolledCourse } from '../relatedFunction/courses';
import {setEnrolledCourses} from "../slice/cartSlice";
import { setLoading } from '../slice/loaderANDlogout';

function EnrolledCourses() {
  const { isLoading } = useSelector((state) => state.loaderANDlogout);
  const {enrolledCourses}=useSelector((state)=>state.cartAndEnrolledCourse);
  const dispatch=useDispatch();
  async function getEnrolledCourse() {
    dispatch(setLoading(true));
    const result=await fetchEnrolledCourse();
    // console.log("result is ",result);
    dispatch(setEnrolledCourses(result));
    dispatch(setLoading(false));
  }

  useEffect(()=>{
    getEnrolledCourse();
  },[])

  return (
    <div>
      <div className="flex flex-row gap-0 bg-slate-900 text-white min-h-screen pb-52">
        <DashBoardSideBar />
        {isLoading ? (
          <div className="loader p-8 mx-auto h-fit lg:mt-[20%] mt-[10%]"></div>
        ) : (
          <div className=" flex flex-col md:gap-8 gap-5 md:w-[75%] w-[90%]  text-white relative md:left-[15%] lg:top-25 md:top-20 top-10 md:ml-20 mx-auto">
            <div className="md:text-4xl text-2xl text-white font-semibold flex flex-row justify-between px-5">
              <p>Enrolled Courses</p>
            </div>
            <div className='border-2 border-slate-700'></div>
            <div className='flex flex-col md:gap-10 gap-5'>
              {
                enrolledCourses?.length === 0 && (
                  <div className='md:text-2xl text-xl text-slate-300 font-bold mx-auto'>No Enrolled Courses</div>
                )
              }
              <div className='flex flex-col md:gap-8 gap-5 md:items-start items-center'>
                {
                  enrolledCourses?.length>0 && enrolledCourses.map((obj,index)=>{
                    return <SingleEnrolledCourse key={index} obj={obj}/>
                  })
                }
              </div>
                
              {/* <SingleEnrolledCourse/>
              <SingleEnrolledCourse/>
              <SingleEnrolledCourse/> */}
            </div>
            
          </div>
        )}
      </div>
    </div>
  )
}

export default EnrolledCourses