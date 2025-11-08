import React, { useDebugValue, useEffect, useRef, useState } from 'react'
import user from "../../../assets/user.jpg"
import { Link } from 'react-router-dom'
import { IoSettings } from "react-icons/io5";
import { RiDashboard2Line } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { deleteToken } from "../../../slice/authSlice";
import { useDispatch, useSelector } from 'react-redux';
import { setUser} from "../../../slice/profileSlice";
import { profileApi, userApi } from '../../../services/api';
import { apiConnector } from '../../../services/apiConnector';
import LogOut from '../../Common/LogOut';
import toast from 'react-hot-toast';
import { fetchTotalUserDetial } from '../../../relatedFunction/profile';


const headers={
      'Content-Type': 'application/json',
      }

// If token is not null then we call the api to fetch the data of the user 
function ProfileDropDown() {
  const {user}=useSelector((state)=>state.profile);
  const [open ,setOpen]=useState(false);
  const [userDetail,setuserDetail]=useState({
    firstName:""
  })
  // const userDetail=user;
  const dropdownRef = useRef(null);
  const navigate=useNavigate();
  const dispatch=useDispatch()
  async function handleSignOutBTn(){
    // console.log("I am here")
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
        window.location.reload();
      }
      catch(err){
        console.log("There is some error in Logout");
        const msg=err?.response?.data?.message || "Log Out Error";
        toast.error(msg,{id:toastId});
      }
    }
  
  // console.log("user is ",userDetail)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the dropdown is open AND the click is outside the dropdownRef element
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false); // Close the dropdown
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
     return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  },[dropdownRef]);
  const toggleOnclick=()=>{
    setOpen(!open)
  }

  async function fetchUserDetial(){
    const result=await fetchTotalUserDetial();
    dispatch(setUser(result));
    setuserDetail(result);

  }

  useEffect(()=>{
    if(user?.email===""){
      fetchUserDetial();
    }
  },[dispatch]);

  return (


    <div className="relative" ref={dropdownRef}>
      {/* Profile photo/button to trigger the dropdown */}
      <button
        onClick={toggleOnclick}
        className="flex items-center md:space-x-2 hover:outline-none hover:ring-2 hover:ring-slate-500 hover:ring-opacity-50 rounded-full md:px-2 md:py-1 px-1 py-1 transition duration-200 ease-in-out hover:bg-slate-950 font-semibold hover:cursor-pointer md:ml-0 ml-3"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <img
          className='lg:w-[40px] lg:h-[40px] w-[30px] h-[30px] rounded-full text-white'
          src={userDetail?.imgUrl} // Placeholder image for user profile
          alt="img..."
        />
        <span className="text-white font-semibold hidden sm:block">{userDetail?.firstName}</span>
        {/* Dropdown arrow icon (optional, but good for UX) */}
      </button>

      {/* Profile dropdown menu, conditionally rendered */}
      {open && (
        <div
          className="absolute right-0 translate-x-4 mt-2 w-40 bg-slate-800 rounded-lg shadow-xl py-2 z-10 border border-slate-600 animate-fade-in-down"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          {/* Using Link tags here */}
          <Link
            to="/dashboard"
            onClick={() => setOpen(false)} // Close dropdown on click
            className="px-4 py-2 text-sm text-white font-semibold hover:bg-slate-700 hover:text-white rounded-md mx-2 my-1 transition duration-150 ease-in-out flex flex-row gap-1"
          >
            <RiDashboard2Line className='my-auto' />
            DashBoard
          </Link>
          <Link
            to={"/dashboard/setting"}
            onClick={() => setOpen(false)} // Close dropdown on click
            className=" px-4 py-2 text-sm text-white font-semibold hover:bg-slate-700 hover:text-white rounded-md mx-2 my-1 transition duration-150 ease-in-out flex flex-row gap-1"
          >
           <IoSettings className='my-auto' /> Settings
          </Link>
          <button
            onClick={() =>  {
              handleSignOutBTn()
              setOpen(false)
                }
            } // Close dropdown on click
            className="px-4 py-2 text-sm text-red-400 font-semibold hover:bg-slate-700 hover:text-red-500 rounded-md mx-2 my-1 transition duration-150 ease-in-out flex flex-row gap-1 w-[90%]"
          >
          <BiLogOut className='my-auto'/>
            Log Out
          </button>
        </div>
      )}

      
    </div>
  )
}

export default ProfileDropDown



// className="block px-4 py-2 text-sm text-red-400 font-semibold hover:bg-slate-700 hover:text-red-500 rounded-md mx-2 my-1 transition duration-150 ease-in-out flex flex-row gap-1 w-[90%]" >





    // <div className='text-white font-bold group relative' ref={dropdownRef}>
    //   <div className='flex flex-col hover:cursor-pointer'
    //   onClick={toggleOnclick}
    //   >
    //     <img src={user} className='lg:w-[40px] lg:h-[40px] rounded-full ' alt="profile picture loading" />
    //     <p className='absolute top-6 left-[-10px]'>_Satya81</p>
        
    //   </div>
    //   <div>
    //   {
    //     open && (
    //       <div className='flex flex-col bg-slate-900 py-3 px-1 absolute top-[100%] translate-y-[20%] translate-x-[-34%] rounded-lg transition duration-150 ease-in-out'>
    //       <Link to="/login" onClick={() => setOpen(false)}
    //       className='w-11/12 bg-slate-800 m-1 py-1 px-1.5 rounded-sm hover:bg-slate-900'
    //       >DashBoard
    //       </Link>
    //       <Link to="/signup" onClick={() => setOpen(false)}
    //       className='w-11/12 bg-slate-800 text-red-700 m-1 py-1 px-1.5 rounded-sm hover:cursor-pointer'
    //       >Log Out
    //       </Link>
    //     </div>
    //     )
    //   }
    //   </div>
    // </div>



        //   try{
    //     // dispatch(setLoading(true))
    //     const response=await apiConnector("GET",profileApi.USER_DETAIL);
    //     const data = response.data.data;
    //     // console.log("Data is ",data);
    //     const userDetail={
    //       firstName: data.firstName,
    //       lastName: data.lastName,
    //       email: data.email,
    //       dateOfBirth: data.additionalDetal.dateOfBirth,
    //       contactNumber: data.additionalDetal.contactNumber,
    //       about: data.additionalDetal.about,
    //       gender: data.additionalDetal.gender,
    //       accountType:data.accountType,
    //       imgUrl:data.image
    //     };
    //     dispatch(setUser(userDetail));
    //     setuserDetail(data)
    //     // console.log("User Detail is ",userDetail)
    //   }
    //   catch(err){
    //   console.log("There is some error while fetching User Detail")
    //   // const message=err.response.data.message;
    //   // toast.error(message);
    // }