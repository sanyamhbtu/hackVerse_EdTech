import toast from "react-hot-toast";
import { courseApi, profileApi, ratingApi } from "../services/api"
import { apiConnector } from "../services/apiConnector"

export const fetchEnrolledCourse=async()=>{
  try{
    const toastId=toast.loading("Loading..");
    const result=await apiConnector("GET",profileApi.GET_ENROLLED_COURSE);
    if(!(result.status===200)){
      const errorData = await result.json();
      throw new Error(errorData.message);
    }
    toast.dismiss(toastId);
    return result.data.data;
  }
  catch(err){
    const msg=err.response.data.message || "Error in fetching Enrolled Courses";
    toast.error(msg);
  }
}

export const fetchCourseDetail=async(courseId)=>{
  try{
    const toastId=toast.loading("Loading..");
    const fd=new FormData();
    fd.append("courseId",courseId);
    const result=await apiConnector("POST",courseApi.SHOW_COURSE_DETAIL,fd);
    if(!(result.status === 200)){
      const errData=await result.json();
      throw new Error(errData.message);
    }
    toast.dismiss(toastId);
    // console.log("Result of the courseDetail is",result.data.body[0]);
    return result.data.body[0];;
  }
  catch(err){
    const msg=err.response.data.message || "Error in fetching Course detail";
    toast.error(msg);
  }
}


export const getAllRating=async()=>{
  try{
    const result=await apiConnector("GET",ratingApi.GET_ALL_RATING);
    if(!(result.status === 200)){
      const errData=await result.json();
      throw new Error(errData.message);
    }
    return result.data.data;
  }
  catch(err){
    const message=err?.response?.data?.message || "Error Occured in Fetching Rating";
    toast.dismiss();
    toast.error(message);
  }
}

// let obj={
//     "courseId":"68864f67945493f3ae671118",
//     "rating":5,
//     "review":"I am Satya and review this as a best course across the globe"
// }
export const giveRating=async(id,review,rating)=>{
  try{
    const fd=new FormData();
    fd.append("courseId",id);
    fd.append("review",review);
    fd.append("rating",rating);
    const toastId=toast.loading("Submitting..");
    const response=await apiConnector("POST",ratingApi.CREATE_RATING,fd);
    if(!(response.status===200)){
      const errData=await response.json();
      throw new Error(errData.message);
    }
    toast.success("Saved",{id:toastId})
  }
  catch(err){
    toast.dismiss();
    const message=err?.response?.data?.message || "There is some Error in Giving Rating";
    toast.error(message);
  }
}
