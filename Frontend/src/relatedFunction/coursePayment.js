import toast from "react-hot-toast";
import { paymentApi } from "../services/api";
import { apiConnector } from "../services/apiConnector";


export const placeOrder=async (courseId)=>{
  try{
    const fd=new FormData();
    fd.append("courseId",courseId);
    const paymentRes=await apiConnector("POST",paymentApi.PLACEING_ORDER_API,fd);
    // console.log(paymentRes);
    if(!(paymentRes.status===200)){
      const errorData = await paymentRes.json();  // 👈 get message from backend
      throw new Error(errorData.message);
    }
    const data=paymentRes.data;
    const options={
      key:data.key,
      amount:data.price,
      name:"StudyNotion",
      description:"Testing purpose for the setup",
      order_id:data.orderId,
      handler:function (response){
        console.log("Payment Success",response);
      },
      prefill:{
        name:"Test User",
        email:"test@example.com",
        contact:"9043875403"
      },
      theme:{
        color:"#3399cc",
      },
    };
    const rzp=new window.Razorpay(options);
    rzp.open();

  }
  catch(err){
    console.log("Error in Placing Order");
    const msg=err?.response?.data?.message || "Error in Placing Order"
    toast.error(msg);
  }
}