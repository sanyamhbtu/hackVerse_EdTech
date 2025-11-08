import React, { useEffect, useState } from 'react'
import Footer from '../component/Common/Footer/Footer'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { apiConnector } from '../services/apiConnector';
import { cartApi, courseApi } from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../slice/loaderANDlogout';
import { setTotalCartItems } from '../slice/cartSlice';
import { fetchTotalCartItems } from '../relatedFunction/cartFunction';
import { placeOrder } from '../relatedFunction/coursePayment';
import { fetchCourseDetail } from '../relatedFunction/courses';

function CourseDetail() {
  const {isLoading}=useSelector((state)=>state.loaderANDlogout)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const location=useLocation();
  const courseId=location.pathname.split('/').at(-1);
  const [courseDetail,setCourseDetail]=useState(null);
  async function getCourseDetail() {
    const data=await fetchCourseDetail(courseId);
    setCourseDetail(data);

  }
  async function addToCart(id){
    try{
      const body={
        courseId:id
      }
      const toastid=toast.loading("Adding...")
      await apiConnector("POST",cartApi.ADD_TO_CART,body);
      const result=await fetchTotalCartItems();
      dispatch(setTotalCartItems(result))
      toast.success("Added to Cart",{id:toastid});
    }
    catch(err){
      console.log("There is error in adding in Cart",err.message);
      toast.error("Course Not Added")
    }
  }
  useEffect(()=>{
    getCourseDetail();
  },[])
  async function handleBuyNow(id){
    try{
      await placeOrder(id);
    }
    catch(err){
      console.log("There is some error in buy Now");
    }
  }

  return (

    <div>
      {
        isLoading ? (<div className="loader flex justify-center items-center p-8 mx-auto my-48"></div>):
        (
          <div className='my-20 flex md:flex-row gap-10 w-[85%] mx-auto flex-col-reverse'>
            <div className='md:w-[55%] lg:w-[65%] flex flex-col gap-15 px-5'>
              <div className='flex flex-col gap-5 text-slate-300 text-base'>
                <div className='text-3xl font-bold text-white'>{courseDetail?.courseName}</div>
                <div>{courseDetail?.courseDescription}</div>
                <div>Revewis are here </div>
                <div>{courseDetail?.instructor.firstName}</div>
                <div>Created At {new Date(courseDetail?.createdAt).toLocaleString()}</div>
              </div>
              <div className='flex flex-col gap-5'>
                <div className='border-slate-600 border-1 rounded-lg flex flex-col gap-10 px-10 py-8'>
                  <p className='text-2xl font-semibold text-slate-200 '>What you'll learn </p>
                  <p className='text-base text-slate-400 font-semibold'>{courseDetail?.whatYouWillLearn}</p>
                </div>
                <div className='flex flex-col gap-3 text-slate-100 font-semibold text-base'>
                  <div className='text-2xl text-slate-200 font-bold'>Course Content</div>
                  <div className='flex flex-row gap-2 text-slate-500'>{courseDetail?.courseContent?.length} Section,{courseDetail?.courseContent[0]?.subsection?.length} Lecture, Total time</div>
                  <div> Here there is the drop down section </div>
                  <div className='text-2xl text-slate-200 font-bold'>Author</div>
                  <div>Author Profile is here</div>
                  <div>{courseDetail?.instructor?.additionalDetal?.about}</div>
                </div>
              </div>
            </div>
            <div className=' lg:w-[30%] md:w-[40%] flex flex-col gap-5 p-5 bg-slate-800 h-fit rounded-lg'>
              <img src={courseDetail?.thumbnail} alt="image..." 
              className='object-cover rounded-lg h-fit '/>
              <div className='text-xl font-bold text-white'>Rs.{courseDetail?.price}</div>
              <button className="bg-yellow-400 text-black rounded-lg px-5 font-semibold py-2 hover:cursor-pointer "
              onClick={()=>{
                handleBuyNow(courseId);
                
              }}
              >
                Buy Now
              </button>
              <button className="bg-slate-700 text-slate-200 rounded-lg px-5 font-semibold py-2 hover:cursor-pointer "
              onClick={()=>{
                console.log("Course Id is ",courseId);
                addToCart(courseId);
              }}
              >
                Add to Cart
              </button>
              <div className='text-base text-slate-200 font-semibold mx-auto'>30-Day Money-Back Guarantee</div>
              <p className='text-2xl text-slate-200 font-bold'>This Course Includes:</p>
              <ul className='text-base text-slate-200 list-disc ml-5'>
                {/* These are the tags which we add later to this project */}
                <li>HTML</li>
                <li>CSS</li> 
                <li>JS</li>
              </ul>
            </div>
          </div>
        )
      }
      <Footer></Footer>
    </div>
  )
}

export default CourseDetail





// try{
    //   const newCourseId=courseId.toString();
    //   const body={
    //     courseId:newCourseId
    //   }
    //   dispatch(setLoading(true));
    //   const result= await apiConnector("POST",courseApi.SHOW_COURSE_DETAIL,body);
    //   if(!(result.status===200)){
    //   const errorData = await result.json();  // 👈 get message from backend
    //   throw new Error(errorData.message);
    // }
    //   setCourseDetail(result.data.body[0]);
    //   dispatch(setLoading(false));
    // }
    // catch(err){
    //   console.log("There is error in fetching Course Detail : ",err.message)
    //   toast.error("Course Detail not fetched")
    // }