import React, { useEffect, useState } from "react";
import Button from "../component/core/Homepage/Button";
import { FaRegEdit } from "react-icons/fa";
import { profileApi } from "../services/api"
import { apiConnector } from "../services/apiConnector";
import toast from "react-hot-toast";
import DashBoardSideBar from "../component/Common/DashBoardSideBar";
import { useDispatch, useSelector } from "react-redux";
import { setUser} from "../slice/profileSlice";
import { setLoading } from "../slice/loaderANDlogout";
import { fetchTotalUserDetial } from "../relatedFunction/profile";


const headers={
      'Content-Type': 'application/json',
      }

function DashBoard() {
  const {user}=useSelector((state)=>state.profile);
  const {isLoading}=useSelector((state)=>state.loaderANDlogout);
  const dispatch=useDispatch();
  const userDetail=user;
  // const [activeLink, setActiveLink] = useState("My Profile");
  
  async function fetchUserDetial(){
    const result=await fetchTotalUserDetial();
    dispatch(setUser(result));
    dispatch(setLoading(false))
    // try{
    //   dispatch(setLoading(true))
    //   const response=await apiConnector("GET",profileApi.USER_DETAIL);
    //   if(!(response.status === 200)){
    //     const errorData = await result.json();  // 👈 get message from backend
    //     throw new Error(errorData.message);
    //   }
    //   const data = response.data.data;
    //   // console.log(data);
    //   const userDetail={
    //     firstName: data.firstName,
    //     lastName: data.lastName,
    //     email: data.email,
    //     dateOfBirth: data.additionalDetal.dateOfBirth,
    //     contactNumber: data.additionalDetal.contactNumber,
    //     about: data.additionalDetal.about,
    //     gender: data.additionalDetal.gender,
    //     accountType:data.accountType,
    //   };
    //   dispatch(setUser(userDetail));
    //   dispatch(setLoading(false))

    // }
    // catch(err){
    //   console.log("There is some error while fetching User Detail")
    //   const message=err?.response?.data?.message || "Error in fetching User Detail";
    //   toast.error(message);
    // }
  }

  useEffect(()=>{
    if(user?.email===""){
      fetchUserDetial();
    }
    // intitalState="my-profile"
  },[dispatch]);

  return (
    <div>
    {
      isLoading ? 
      ( <div className="loader flex justify-center items-center p-8 mx-auto mt-56"></div> ):
      (<div className="flex flex-row gap-0 bg-slate-800 text-white min-h-screen pb-52">
      <DashBoardSideBar/>
      <div className=" flex flex-col gap-10 w-[100%] items-center justify-start mx-auto text-white relative md:left-[10%] md:top-12 ">
        <div className="text-4xl text-white md:w-[80%] w-[100%] mx-auto mt-10 font-bold text-center">
          My Profile
        </div>
        <div className="flex flex-col gap-10 md:w-[80%] w-[100%] items-center justify-center mx-auto">
          <div className="bg-slate-950 md:w-[80%] w-[90%] mx-auto md:p-10 p-7 rounded-2xl ">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <img src="#" alt="" />
                <p className="text-white text-base font-bold">{`${userDetail?.firstName} ${userDetail?.lastName}`}</p>
                <p className="text-slate-500 text-base">{`${userDetail?.email}`}</p>
              </div>
              <Button linkto={"/dashboard/setting"} active={true}>
                <div className="flex flex-row gap-0.5">
                  <p>Edit</p> <FaRegEdit />{" "}
                </div>
              </Button>
            </div>
          </div>
          <div className="bg-slate-950 md:w-[80%] w-[90%] mx-auto md:p-10 p-7 rounded-2xl  ">
            <div className="flex flex-row justify-between ">
              <div className="flex flex-col">
                <p className="text-white text-base font-bold">About</p>
                <p className="text-slate-500 text-base">{`${!userDetail?.about?("Enter about yourself"):
                  (userDetail?.about)}`}</p>
              </div>
              <Button linkto={"/dashboard/setting"} active={true}>
                <div className="flex flex-row gap-0.5">
                  <p>Edit</p> <FaRegEdit />{" "}
                </div>
              </Button>
            </div>
          </div>
          <div className="bg-slate-950 md:w-[80%] w-[90%] mx-auto md:p-10 p-7 rounded-2xl">
            <div className="flex flex-col gap-5">
              <div className="flex flex-row justify-between md:pb-8 pb-3">
                <p className="text-2xl text-white font-bold">Personal Detail</p>
                <Button linkto={"/dashboard/setting"} active={true}>
                  <div className="flex flex-row gap-0.5">
                    <p>Edit</p> <FaRegEdit />{" "}
                  </div>
                </Button>
              </div>
              <div className="lg:w-[70%] md:w-[90%] flex sm:flex-row flex-col justify-between">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col p-3 sm:m-2">
                    <p className="text-slate-400">First Name</p>
                    <p className="text-white font-semibold">
                      {userDetail?.firstName}
                    </p>
                  </div>
                  <div className="flex flex-col p-3 sm:m-2">
                    <p className="text-slate-400">Email</p>
                    <p className="text-white font-semibold">
                      {userDetail?.email}
                    </p>
                  </div>
                  <div className="flex flex-col p-3 sm:m-2">
                    <p className="text-slate-400">Gender</p>
                    <p className="text-white font-semibold">
                      {`${!userDetail?.gender?("Enter Your Gender"):(userDetail?.gender)}`}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-5 ">
                  <div className="flex flex-col p-3 sm:m-2">
                    <p className="text-slate-400">Last Name</p>
                    <p className="text-white font-semibold">
                      {userDetail?.lastName}
                    </p>
                  </div>
                  <div className="flex flex-col p-3 sm:m-2">
                    <p className="text-slate-400">Phone Number</p>
                    <p className="text-white font-semibold">
                      {`${!userDetail?.contactNumber ?("Enter Your P. No."):(userDetail?.contactNumber)}`}
                    </p>
                  </div>
                  <div className="flex flex-col p-3 sm:m-2">
                    <p className="text-slate-400">Date of Birth</p>
                    <p className="text-white font-semibold">{`${!userDetail?.dateOfBirth ?("Enter Your DOB"):(userDetail?.dateOfBirth)}`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
    }
    </div>
  );
}

export default DashBoard;

