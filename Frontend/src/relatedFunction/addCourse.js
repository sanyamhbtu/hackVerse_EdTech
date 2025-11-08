import toast from "react-hot-toast";
import { categroyApi, courseApi, sectionApi, subSectionApi } from "../services/api";
import { apiConnector } from "../services/apiConnector";

const headers = {
  "Content-Type": "application/json",
};
export const createCourse = async (formData)=>{
  let toastId;
  try{
      const fd = new FormData();
      fd.append("courseName", formData.courseName);
      fd.append("courseDescription", formData.courseDescription);
      fd.append("whatYouWillLearn", formData.whatYouWillLearn);
      fd.append("price", formData.price);
      fd.append("category", formData.category);
      fd.append("thumbnailImg", formData.thumbnailImg);
      toastId=toast.loading("Creating Course..")
      const response = await apiConnector("POST", courseApi.CREATE_COURSE, fd);
      // console.log(response);
      toast.success("Course created Successfully",{id:toastId});
      return response;
  }
  catch(err){
    console.log(err.message);
    toast.error("There is error in creating course");
  }
}

export const fetchSection = async (courseInfo)=>{
  try {
      if(!courseInfo){
        console.log("Coures Detail Not found")
        // toast.error("Course Detail Not found")
        return ;
      }
      // console.log(courseInfo._id);
      const body={
        courseId:courseInfo._id,
      }
      
      const result = await apiConnector("POST",courseApi.GET_ALL_SECTION,JSON.stringify(body),headers);
      // console.log("result is ");
      // console.log(result.data.data);
      return result.data.data;

    } catch (err) {
      console.log("There is some error in fetching section");
      toast.error("Some error occured during fetching Section");
    }
}

export const deleteSec=async (id,courseid)=>{
  try{
    const body={
      sectionId:id,
      courseId:courseid
    }
    // console.log("body of course id is ",body);
    const response=await apiConnector("DELETE",sectionApi.DELETE_SECTION,JSON.stringify(body),headers);
    // console.log(response);
    toast.success("Section deleted Successfully");
  }
  catch(err){
    console.log("There is some error in Deletion of this Section")
    toast.error("Section not deleted");
  }
}

export const fetchDraftCousr=async (id)=>{
  try{
    const body={
      courseId:id
    }
    const response=await apiConnector("POST",courseApi.GET_DRAFT_COURSE,JSON.stringify(body),headers);
    const data=await response.data.data;
    return data;

  }
  catch(err){
    console.log("There is no course related to that Id");
    toast.error("No Course with given Id");
  }
}

export const updateCourse=async (formData)=>{
  try{
      const fd = new FormData();
      fd.append("courseId",formData.courseId);
      fd.append("courseName", formData.courseName);
      fd.append("courseDescription", formData.courseDescription);
      fd.append("whatYouWillLearn", formData.whatYouWillLearn);
      fd.append("price", formData.price);
      fd.append("category", formData.category);
      const response = await apiConnector("PUT", courseApi.UPDATE_COURSE, fd);
      // console.log(response);
      // return response;
  }
  catch(err){
    console.log("There is some error in updating Course",err.message);
    toast.error("Course updation not success");
  }
}

// For adding lecture to the section 
export const addLecture=async (formData)=>{
  try{
    const fd=new FormData();
    fd.append("title",formData.lectureTitle);
    fd.append("description",formData.lectureDesc)
    fd.append("videoFile",formData.videoUrl)
    fd.append("sectionId",formData.sectionId)
    const toastId= toast.loading("Lecture Uploading..")
    const response= await apiConnector("POST",subSectionApi.ADD_SUBSECTION,fd);
    if(!(response.status === 200)){
      const errData=await result.json();
      throw new Error(errData.message);
    }
    toast.success("Lecture Uploaded",{id:toastId});

  }
  catch(err){
    const msg=err.response.data.message || "Lecture Not Added";
    toast.error(msg);
  }
}


//THis is for fetching the subsection to the particular section 
export const fetchSubSection=async (sectionId)=>{
  try{
    const fd=new FormData();
    fd.append("sectionId",sectionId);
    const result=await apiConnector("POST",sectionApi.FETCH_SEBSECTION,fd);
    // console.log("subsection Details are ",result.data.body);
    return result.data.body;
  }
  catch(err){
    console.log("There is some error in fetching subsection",err.message);
    toast.error("SubSection not fetched Successfully");
  }
}

export const deleteSubSection=async (sectionId,subSectionId)=>{
  let toastId;
  try{
    const body={
      sectionId:sectionId,
      subsectionId:subSectionId
    }
    // console.log(body);
    toastId=toast.loading("Lecture Dele...")
    const response=await apiConnector("DELETE",subSectionApi.DELETE_SUBSECTION,body,headers);
    toast.success("Lecture Deleted",{id:toastId});
    // toast.success("Lecture Deleted");

  }
  catch(err){
    console.log("There is the error in deletion ",err.message);
    toast.error("Lecture not Deleted",{toastId});
  }
}

export const fetchSubSectionDetail=async (subsectionId)=>{
  try{
    const body={
      subsectionId:subsectionId
    }
    const result=await apiConnector("POST",subSectionApi.GET_SUBSECTION_DETAIL,body,headers);
    return result.data.body;
    
  }
  catch(err){
    console.log("The error in fetching lecture detail is ",err.message);
    toast.error("Lecture detail fetching failed ")
  }
}

export const makeCoursePublish=async (courseId)=>{
  try{
    const body={
      courseId:courseId
    }
    let toastId=toast.loading("Lecture Publishing..")
    await apiConnector("PUT",courseApi.UPDATE_DRAFTED_COURES,body,headers);
    toast.success("Lecture Published",{id:toastId});

  }
  catch(err){
    console.log("The error in making the course publis",err.message);
    toast.error("Course Does Not publish");
  }
}

export const deleteCourse=async (courseId)=>{
  try{
    const body={
      courseId:courseId
    }
    let toastId=toast.loading("Course deletion ..")
    await apiConnector("DELETE",courseApi.DELETE_COURSE,body,headers);
    toast.success("Course Deleted",{id:toastId})
  }
  catch(err){
    console.log("There error in deletion of course",err.message);
    toast.error("Course is not deleted")
  }
}

export  const FetchCategoryDetail=async(id)=>{
    try{
      const body={
        categoryId:id
      }
      const toastId=toast.loading("Loading...")
      const result=await apiConnector("POST",categroyApi.CATEGORY_DETAIL,body);
      toast.success("Courses Loaded",{id:toastId})
      return result.data
    }
    catch(err){
      console.log("There is some error in fetching course",err.message);
      toast.error("Course Fetching fails")
    }
  }