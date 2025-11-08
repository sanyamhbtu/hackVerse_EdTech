import toast from "react-hot-toast";
import { profileApi } from "../services/api";
import { apiConnector } from "../services/apiConnector";


export const fetchTotalUserDetial=async()=>{
  try{
    const response=await apiConnector("GET",profileApi.USER_DETAIL);
    if(!(response.status === 200)){
      const errorData = await result.json();  // 👈 get message from backend
      throw new Error(errorData.message);
    }
    const data=response.data.data;
    const userDetail={
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          dateOfBirth: data.additionalDetal.dateOfBirth,
          contactNumber: data.additionalDetal.contactNumber,
          about: data.additionalDetal.about,
          gender: data.additionalDetal.gender,
          accountType:data.accountType,
          imgUrl:data.image
        };
    return userDetail;
  }
  catch(err){
    console.log("There is some error while fetching User Detail")
    // const message=err?.response?.data?.message || "Error in fetching User Detail";
    const message="Please LogOut and again LogIn"
    toast.error(message);
    // if(message==="Invalid Token"){
    //   toast.
    // }
  }
}

export const profileChange=async(file)=>{
  try{
    const fd=new FormData();
    fd.append("profilePic",file);
    const toastId=toast.loading("Changing...")
    // console.log("I am here 1");
    const response=await apiConnector("PUT",profileApi.CHANGE_PROFILE_PIC,fd,{"Content-Type": "multipart/form-data"});
    // console.log("I am here 2");
    if(!(response.status===200)){
      const errData=await response.json();
      throw new Error(errData.message);
    }
    toast.success("Changed!! Please Reload",{id:toastId});
  }
  catch(err){
    const message=err?.response?.data?.message || "Profile pic not changed";
    toast.dismiss();
    toast.error(message);
  }
}

