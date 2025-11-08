import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import slogo from '../../assets/slogo.png'
import { apiConnector } from '../../services/apiConnector'
import {cartApi, categroyApi } from '../../services/api'
import { FaAlignJustify, FaCartPlus } from "react-icons/fa";
import { setTotalCartItems } from '../../slice/cartSlice';
import { fetchTotalCartItems } from '../../relatedFunction/cartFunction';
import NavItemNavbar from './NavBarComp/NavItemNavbar';
import NavItemLoginSup from './NavBarComp/NavItemLoginSup';
import SmallNav from './SmallNav';
import videoUrl from "../../assets/logo.mp4"
import { RxCross2 } from "react-icons/rx";
import toast from 'react-hot-toast';

function Navbar({isfixed}) {
  const {token}=useSelector((state)=>state.auth)
  // const {user}=useSelector((state)=>state.profile)
  const dispatch=useDispatch();
  const location=useLocation();

  const [subLinks , setSubLinks]=useState([]);
  const fetchCartItems=async ()=>{
    try{
        const result=await fetchTotalCartItems();
        dispatch(setTotalCartItems(result))
    }
    catch(err){
      const msg=err?.response?.data?.message || "Cart Item Fetch Error";
      console.log(msg)
      // toast.error(msg);
    }
  }
  const fetchSublinks = async()=>{
      try{
        const result =await apiConnector("GET",categroyApi.CATEGORY_API);
        setSubLinks(result.data.body);
        // setCategory(result.data.body);
      }
      catch(err){
        console.log("Could Not fetch the category there is some error")
      }
    }


  useEffect(()=>{
    fetchSublinks();
    if(token){
      fetchCartItems();
    }
    
  },[token])

  // const matchRoute=(route)=>{
  //   return matchPath({path:route},location.pathname)
  // }
  const [smallNavOpen,setSmallNavOpen]=useState(false);

  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-slate-700 ${isfixed?("md:fixed top-0 left-0 w-full z-50 bg-slate-950"):("relative")}`}>
     <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
     <Link to={"/"}>
     <div className='flex flex-row gap-x-2 items-center overflow-hidden'>
      <video src={videoUrl}
      muted
      loop
      autoPlay
      className=' sm:w-[45px] sm:h-[45px] w-[40px] h-[40px] rounded-full object-cover'
      ></video>
      <p className='sm:text-2xl text-xl text-white lg:text-3xl font-bold'>StudyNotion</p>
     </div>
      
     </Link>

   
     <div className='invisible md:visible'>
      <NavItemNavbar/>
     </div>
     

     <div className='flex flex-row gap-2 items-center'>
        <div className={`${isfixed?(""):("visible ")}`}>
          <NavItemLoginSup />
        </div>
        <div className={`md:hidden text-white visible ${isfixed ? (""):("")}`}>
          {
            !smallNavOpen ? (<FaAlignJustify className={`text-white text-2xl hover:cursor-pointer `}
            onClick={()=>{
              setSmallNavOpen(true)
            }}
            />
            ):
            (<RxCross2 className='text-white text-4xl relative hover:cursor-pointer font-bold' 
            onClick={()=>{
              setSmallNavOpen(false)
            }}
            />)
          }
          <SmallNav open={smallNavOpen} setSmallNavOpen={setSmallNavOpen}></SmallNav></div> 
      </div>
     </div>
     
    </div>
  )
}

export default Navbar







  {/* <nav className='lg:w-fit ]'>
      <ul className='lg:flex gap-x-6 text-white lg:visible hidden'>
        {
          NavbarLink.map((link,index)=>{
            return <li key={index}>
                {
                  link.title==="Catalog"?(
                  <div className='flex relative group gap-0.5 hover:cursor-pointer'> 
                  <div className='flex flex-row gap-0.5 items-center'>
                    <p>{link.title}</p>
                    <p><MdKeyboardArrowDown className='text-2xl' /></p>
                  </div>
                    
                    <div className='invisible absolute right-0 translate-x-[40%] top-10 flex flex-col rounded-md p-4 opacity-0 group-hover:visible group-hover:opacity-100 lg:w-[300px] transition-all duration-200 bg-white z-10 min-h-20
                    '>
                    <div className='absolute left-[44%] top-0 h-16 w-16 rotate-45 bg-white translate-x-1 z-0 rounded-[2px]'>
                    </div>
                    {subLinks.length===0 ? (<div></div>):(
                      subLinks.map((subLink,index)=>(
                        <Link to={`/catalog/${subLink.categoryName}`} key={index}
                        onClick={()=>{
                          categoryDetail(subLink._id);
                        }}
                        className=''
                        >
                          <p className='text-black w-11/12 bg-slate-100 rounded-sm relative font-semibold 
                          py-3 px-3 my-2 z-50 hover:bg-slate-300'>{subLink.categoryName}</p>
                        </Link>
                      ))
                    ) }
                    </div>

                  </div>)
                  :
                  (
                    <Link to={link?.path}>
                      <p
                      className={`${matchRoute(link?.path) ? "text-yellow-400" : "text-slate-200"}`}
                      >{link.title}</p>
                    </Link>
                  )
                }
              </li>
          }) 
        }
      </ul>
     </nav> */}



  // const categoryDetail=async(id)=>{
  //   try{
  //     const body={
  //       categoryId:id
  //     }
  //     const toastId=toast.loading("Loading...")
  //     const result=await apiConnector("POST",categroyApi.CATEGORY_DETAIL,body);
  //     dispatch(setCategory(result.data))
  //     toast.success("Courses Loaded",{id:toastId})
  //   }
  //   catch(err){
  //     console.log("There is some error in fetching course",err.message);
  //     toast.error("Course Fetching fails")
  //   }
  // }









     {/* login signup dashBoard */}
     {/* <div className='lg:flex gap-x-4 items-center hidden lg:visible'>
      {
        token !==null && (
          user&&user?.accountType != "Instructor" &&(
          <Link to={"dashboard/cart"} className='relative'> 
            <FaCartPlus className='text-slate-100 text-2xl absolute top-0 translate-y-[-10px] right-0'/>
            {
              cartItems &&  cartItems.length>0 &&(
                <span className='text-yellow-300 text-[12px] absolute right-0 bg-slate-800 font-extrabold rounded-full px-2'>
                  {cartItems.length}
                </span>
              )
            }
          </Link>
        )
        
        )
      }
      {
        token === null && (
          <Link
          to={"/login"}
          > <button className='px-2.5 py-1 rounded-lg text-white bg-slate-700 hover:cursor-pointer' >Log In</button></Link>
        )
      }
      {
        token===null && (
          <Link to={"/signup"}>
            <button className='px-2.5 py-1 rounded-lg text-white bg-slate-700 hover:cursor-pointer'>Sign Up</button>
          </Link>
        )
      }
      {
        token !==null && <ProfileDropDown/>
      }

     </div> */}