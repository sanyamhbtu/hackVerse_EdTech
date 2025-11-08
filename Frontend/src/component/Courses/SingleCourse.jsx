import React from "react";
import { BiPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { deleteCourse } from "../../relatedFunction/addCourse";

function SingleCourse({obj,deletecourse}) {
  const date = new Date(obj.createdAt).toLocaleDateString();
  const navigate=useNavigate();

  return (
    <div className="flex flex-row sm:justify-between justify-center my-5 md:gap-x-5 ">
      <div className="lg:w-[70%] md:w-[80%] sm:w-[60%] w-[95%] flex lg:flex-row flex-col gap-5">
        <img src={obj.thumbnail} alt="Image is here..."
        className="lg:w-80 lg:h-64 md:w-74 md:h-48 rounded-xl sm:w-94 sm:h-62" />
        <div className="lg:w-[58%] md:w-[65%] flex flex-col lg:gap-5 md:gap-y-2 gap-3">
          <div className="text-xl font-bold">{obj.courseName}</div>
          <div className="lg:text-base md:text-[12px] md:line-clamp-2 line-clamp-2 ">{obj.courseDescription}</div>
          <div className="text-slate-300">{`Created: ${date}`}</div>
          {
            obj.isDraft ? (
              <div className="w-fit bg-slate-600 px-2  rounded-xl flex flex-row items-center text-base text-pink-500"> 
                <IoIosTimer className="mr-1 font-bold"/> 
                Drafted
              </div>
            ):(
              <div className="w-fit bg-slate-600 px-2  rounded-xl flex flex-row items-center text-base text-yellow-400"> 
                <IoIosTimer className="mr-1 font-bold"/> 
                Published
              </div>
            )
          }
          
        </div>
      </div>
      <div className="sm:flex sm:flex-row hidden lg:w-[30%] md:w-[40%] w-[35%] justify-between">
        <p>{`30 min`}</p>
        <p>{`Rs.${obj.price}`}</p>
        <p className="flex flex-row gap-2 items-start ">
          {
            obj.isDraft && 
            (
              <Link to={`/dashboard/add-course/${obj._id}`} >
               <BiPencil/>
             </Link>
            )
          }
          
          <button className="hover:cursor-pointer"
          onClick={()=>{
            deletecourse(obj._id);
            // console.log(obj._id);
          }}
          ><MdDelete/></button>
        </p>
      </div>
    </div>
  );
}

export default SingleCourse;
