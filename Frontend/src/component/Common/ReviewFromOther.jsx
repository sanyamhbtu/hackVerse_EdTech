import React, { useEffect, useState } from 'react'
import Review from '../core/Homepage/Review'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // core styles
import 'swiper/css/free-mode'; // optional
import 'swiper/css/pagination'; // optional
import { FreeMode } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import { getAllRating } from '../../relatedFunction/courses';


function ReviewFromOther() {

  const [ratings,setRatings]=useState([]);
  // console.log("RATING IS ",ratings);


  async function getFullRating() {
    const result=await getAllRating();
    setRatings(result);
    // console.log("Rating rsult is",result);
  }
  useEffect(()=>{
    getFullRating();
  },[])
  return (
    <div className="w-11/12 mx-auto flex flex-col items-center">
      <div className="md:text-4xl text-2xl text-white font-bold my-10 text-center "> Review from other learners</div>
       <Swiper

       slidesPerView={1}
       spaceBetween={20}
       freeMode={true}
       loop={true}
       modules={[Autoplay]}
       autoplay={{
         delay: 2000,     // time between slides (ms)
         disableOnInteraction: false, // keeps autoplay after user interacts
        }}
        speed={1000}
        className="md:w-[90vw] lg:w-[60vw] mb-5 w-[80vw]"
       breakpoints={{
    // Mobile devices (width < 640px)
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        440:{
          slidesPerView:2,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        // Large devices (lg)
        1024: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
       }}
       >
        {
          ratings && ratings.map((obj,index)=>(
            <div className='md:w-[90%] flex flex-row gap-7 py-5'>
            <SwiperSlide key={index}>
              <Review img={obj?.user?.image} name={obj?.user?.firstName} description={obj?.review} rate={obj?.rating} />
            </SwiperSlide>
            </div>
          ))
        }


       </Swiper>
      </div>
  )
}

export default ReviewFromOther





// <div className="flex flex-col gap-4 items-center">
//         <div className="text-4xl text-white font-bold my-10"> Review from other learners</div>
//         <div className="w-[100%] flex flex-row gap-7 py-5">
//           {arr.map((obj,index)=>{
//             return <Review img={obj.img} name={obj.name} description={obj.description} rate={obj.rate} key={index} />
//           })}
//         </div>
//         </div>