import toast from "react-hot-toast";
import { cartApi } from "../services/api";
import { apiConnector } from "../services/apiConnector";


export  const fetchTotalCartItems=async ()=>{
    try{
      const result=await apiConnector("GET",cartApi.GET_CART_ITEMS);
      if(!(result.status === 200)){
        const errData=await result.json();
        throw new Error(errData.message);
      }
      if(result){
        return result.data.body.courseIds;
      }
    }
    catch(err){
      const msg=err.message;
      console.log("Error in fetching Cart",msg)
    }
  }

export const deleteFromCart=async (id)=>{
  try{
    const body={
      courseId:id
    }
    const toastId=toast.loading("Deleting...")
    await apiConnector("DELETE",cartApi.DELETE_FROM_CART,body);
    toast.success("Item Removed",{id:toastId})

  }
  catch(err){
    console.log("Error in deletion from Cart",err.message);
  }
}