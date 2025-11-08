import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { contactApi, profileApi } from "../services/api";


const headers = {
  "Content-Type": "application/json",
};

export const sendMessage=async(data)=>{
  try{
    const toastId=toast.loading("Submiting...")
    const response=await apiConnector("POST",contactApi.CONTACT_US,data,headers);
    if(!(response.status===200)){
      const errData=await response.json();
      console.log(errData);
      throw new Error(errData.message);
    }
    toast.success("Submitted",{id:toastId});
  }
  catch(err){
    // console.log(err);
    const message=err.response.data.messagae || "Contact Us Api not Worked"
    // console.log(err.response.data)
    toast.dismiss();
    toast.error(message);
  }
}

