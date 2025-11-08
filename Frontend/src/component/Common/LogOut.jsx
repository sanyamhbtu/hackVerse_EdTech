import React from "react";
import { useDispatch } from "react-redux";
import { setLogout } from "../../slice/loaderANDlogout";
import { useNavigate } from "react-router-dom";
import { deleteToken } from "../../slice/authSlice";
import toast from "react-hot-toast";
import { apiConnector } from "../../services/apiConnector";
import { userApi } from "../../services/api";

function LogOut() {

  const dispatch = useDispatch();
  const navigate=useNavigate();
  async function handleONclick(){
    let toastId;
    try{
      dispatch(deleteToken());
      toastId=toast.loading("Loging Out...")
      const res=await apiConnector("GET",userApi.LOG_OUT_API);
      if(!(res.status === 200)){
        const errData=await res.json();
        throw new Error(errData.message)
      }
      toast.success("Logged Out",{id:toastId});
      navigate("/")
      window.location.reload(true);
    }
    catch(err){
      console.log("There is some error in Logout");
      const msg=err?.response?.data?.message || "Log Out Error";
      toast.error(msg,{id:toastId});
    }
      
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 h-screen w-screen place-items-center overflow-auto bg-transparent backdrop-blur-sm flex justify-center items-center">
      <div className="w-[30%] md:min-w-[461px] md:min-h-[198px] min-w-[300px] min-h-[100px] md:h-[30%] h-[20%] flex flex-col gap-5 p-5 bg-slate-950 rounded-2xl">
        <div className="text-3xl text-white font-bold">Are You Sure</div>
        <div className="text-base text-slate-400 ">
          You Will be logged of your Account
        </div>
        <div className="flex flex-row gap-7">
          <button
            className="bg-yellow-500 text-black rounded-lg px-5 font-semibold py-1.5 hover:cursor-pointer"
            onClick={handleONclick} >
            Logout
          </button>
          <button
            className="bg-slate-500 text-black rounded-lg px-5 font-semibold py-1.5 
            hover:cursor-pointer"
            onClick={() => {
              dispatch(setLogout(false));
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogOut;
