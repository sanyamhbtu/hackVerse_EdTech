import img from "../assets/about1.jpg"
import React, { useEffect, useRef, useState } from 'react'
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import SectionsOfSingleCourse from "../component/LecturesOfSingleCourse/SectionsOfSingleCourse"
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../slice/loaderANDlogout";
import DashBoardSideBar from "../component/Common/DashBoardSideBar";
import { useLocation } from "react-router-dom";
import { fetchCourseDetail, giveRating } from "../relatedFunction/courses";
import InstructorDetial from "../component/Common/InstructorDetial";
import filledStar from "../assets/filledStar.png";
import emptyStar from "../assets/emptyStar.png";

function EnrolledCourseSinglePage() {
  const { isLoading } = useSelector((state) => state.loaderANDlogout);
  const location=useLocation();
  const dispatch=useDispatch();
  const [courseDetail,setCourseDetail]=useState(null);
  const courseId=location.pathname.split('/').at(-1);
  // console.log("course Id is ",courseId);
   

  // const obj={
  //   img:img,
  //   categoryName:"Web Development",
  //   title:"Hi this is for the webd course",
  //   description:"In this couse we learn about the basic of the web d and then Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore deleniti, saepe eveniet soluta est fugiat provident ipsam molestias, obcaecati iusto expedita cupiditate vel, sit quo id sint eius optio atque. ",
  //   whatYouWillLearn:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore deleniti, saepe eveniet soluta est fugiat provident ipsam molestias, obcaecati iusto expedita cupiditate vel, sit quo id sint eius optio atque.",
  //   benefitsOfTheCourse:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore deleniti, saepe eveniet soluta est fugiat provident ipsam molestias, obcaecati iusto expedita cupiditate vel, sit quo id sint eius optio atque.",
  //   courseContent:[{
  //     sectionName:"Section 1",
  //     subsection:{
  //       subsectionName:"SubSection 1",
  //       url:"#"
  //     }
  //   },{
  //     sectionName:"Section 2",
  //     subsection:{
  //       subsectionName:"SubSection 1",
  //       url:"#"
  //     }
  //   },{
  //     sectionName:"Section 3",
  //     subsection:{
  //       subsectionName:"SubSection 1",
  //       url:"#"
  //     }
  //   }
  //   ]
  // }
  async function getCourseDetail() {
    dispatch(setLoading(true));
    const data=await fetchCourseDetail(courseId);
    // console.log("Data inside enrolledcourse single page is ",data);
    setCourseDetail(data);
    dispatch(setLoading(false));
    
  }
  // console.log("Instrucot is",courseDetail?.instructor)
  const [page,setPage]=useState("Course-Desc")
  const [fillStarArr,setFillStarArr]=useState([]);
  const emptyStarArray=Array.from({length:5});

  useEffect(()=>{
    getCourseDetail();
  },[])
  // console.log(fillStarArr?.length);
  const reviewRef=useRef({
    review:""
  })
  async function reviewHandler(e){
    e.preventDefault();
    // console.log("Rating is ",fillStarArr.length);
    // console.log("Review is ",reviewRef.current.review);
    await giveRating(courseDetail._id,reviewRef.current.review,fillStarArr.length);
    setFillStarArr(Array.from({length:0}));
    reviewRef.current.value="";
  }

  return (
    <div className='text-slate-300 relative bg-slate-950 '>
      {
        page==="Course-Desc" && (
              <div>
                <DashBoardSideBar />
                {
                  isLoading ? (<div className="loader p-8 mx-auto h-fit lg:mt-[20%] mt-[10%] bg-slate-900"></div>):
                  (
                    <div className="md:absolute xl:left-58 lg:left-44 2xl:left-68 md:left-36 top-15 bg-slate-900 pt-7">
                      <div className='text-3xl bg-blue-950 text-white font-bold py-3 px-3 xl:ml-15 lg:ml-8 md:ml-5
                      rounded-sm '>{courseDetail?.category.categoryName}</div>
                      <div className='flex md:flex-row flex-col-reverse gap-1 md:items-start items-center'>
                        <div className='md:w-[60%] sm:w-[70%] w-[90%] flex flex-col gap-5 xl:p-15 lg:p-8 md:p-5 md:py-10 '>
                          <div className=' bg-slate-800 rounded-lg p-4 flex flex-col gap-2 text-base text-slate-300'>
                          <div className='text-2xl font-bold text-slate-100'>{courseDetail?.courseName}</div>
                          <div className="font-semibold">{courseDetail?.courseDescription}</div>
                          <div className='flex flex-col gap-2 font-semibold'>
                            <div className='text-xl font-bold text-slate-300'>What you will Learn</div>
                            <p className="text-slate-400">{courseDetail?.whatYouWillLearn}
                            </p>
                          </div>
                          </div>
                          <div className=' bg-slate-800 rounded-lg p-4 flex flex-col gap-2 text-base text-slate-300'>
                          <div className='text-2xl font-bold text-slate-100'>Know Your Teacher</div>
                          <div className=''>
                            {
                              courseDetail?.instructor &&
                              (<InstructorDetial obj={courseDetail?.instructor}></InstructorDetial>)
                            }
                          </div>
                          </div>
                          <div className=' bg-slate-800 rounded-lg p-4 flex flex-col gap-2 text-base text-slate-300'>
                          <div className='text-2xl font-bold'>Benefits Of the Course</div>
                          <div className="font-semibold">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, earum repellat voluptates nulla provident voluptatem minima perferendis unde. Nihil, quis!
                          </div>
                          </div>
                        </div>
                        <div className='md:w-[30%] sm:w-[70%] w-[90%] flex flex-col gap-3 xl:py-15 lg:py-8 md:py-10 py-10'>
                          <img src={courseDetail?.thumbnail} alt="img..." className='rounded-lg object-fill' />
                          <button className='bg-slate-700 text-slate-300 font-bold rounded-sm  text-center py-2.5'>ENROLLED</button>
                          <button className='bg-yellow-300 text-slate-950 font-bold rounded-sm  text-center py-2.5 hover:cursor-pointer text-base'
                          onClick={()=>{
                            setPage("Lecture")
                          }}
                          >Continue Learning</button>
                          {/* <form className="bg-slate-950 text-slate-200 p-2">
                            Tomarrow create rating section
                          </form> */}
                          <div className="bg-slate-950 flex flex-col gap-5 md:gap-2 px-2 pt-5">
                            <div className="text-xl text-slate-100 font-bold">
                              Want to Review
                            </div>
                            <div className="flex flex-row gap-1 rounded-lg relative h-10 text-center">
                              {
                                emptyStarArray.map((_,index)=>{
                                  return <img src={emptyStar} alt="" key={index} className={`xl:w-12 lg:w-10 md:w-8 w-16 absolute left-${index}`}
                                  style={{ left: `${index * 18}%` }} 
                                  // here we use Style prop because tailwind does not support dynamic left 
                                  onClick={(e)=>{
                                    setFillStarArr(Array.from({length:index+1}))
                                  }}
                                  />
                                })
                              }
                              {
                                fillStarArr?.map((_,index)=>{
                                  return <img src={filledStar} alt="" key={index} className={`xl:w-12 lg:w-10 md:w-8 w-16  absolute left-${index}`}
                                  style={{ left: `${index * 18}%` }} 
                                  // here we use Style prop because tailwind does not support dynamic left 
                                  onClick={()=>{
                                  
                                    setFillStarArr(Array.from({length:index}))
                                  }}
                                  />
                                })
                              
                              }
                            </div>
                            <form className="w-[100%] py-2 flex flex-col gap-2 " 
                            onSubmit={(e)=>{
                              reviewHandler(e)
                            }}
                            >
                                <textarea 
                                  className="bg-slate-800 mx-auto p-1 rounded-sm mt-2 border-b-2 border-slate-600
                                  placeholder-slate-400 w-[100%] "
                                  rows={2}
                                  ref={reviewRef}
                                  onChange={(e)=>{
                                    reviewRef.current.review=e.target.value
                                  }}
                                  ></textarea>
                                  <button type="submit" className="bg-yellow-300 text-black py-1 font-bold px-2 hover:cursor-pointer rounded-sm w-fit">Submit</button>
                              </form>
                          </div>
                            
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>  
        )
      }
      {
        page==="Lecture" && (
          <div className="flex flex-col fixed inset-0 z-[10000]">
            <div className='text-2xl font-bold text-slate-100 bg-slate-900 flex flex-row gap-3 py-3 mb-2 items-center '>
              <MdKeyboardDoubleArrowLeft className="hover:cursor-pointer text-4xl font-bold text-red-400"
              onClick={()=>{
                setPage("Course-Desc")
              }}
              />
              <p>{courseDetail?.courseName}</p>
              </div>
            <div className="">
              <SectionsOfSingleCourse sections={courseDetail?.courseContent}></SectionsOfSingleCourse>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default EnrolledCourseSinglePage