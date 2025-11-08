import React, { useDebugValue, useEffect, useRef, useState } from 'react'
import { Link, matchPath, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import NavItemNavbar from './NavBarComp/NavItemNavbar';
import NavItemLoginSup from './NavBarComp/NavItemLoginSup';
import { FaAlignJustify } from "react-icons/fa";
import {NavbarLink} from "../../data/NavbarLink"
import { FetchCategoryDetail } from '../../relatedFunction/addCourse';
import { setCategory } from '../../slice/courseSlice';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { categroyApi } from '../../services/api';
import { apiConnector } from '../../services/apiConnector';

function SmallNav({open,setSmallNavOpen}) {
  const {token}=useSelector((state)=>state.auth)
  const dispatch=useDispatch()
  const location=useLocation();
  const [subLinks , setSubLinks]=useState([]);
  const matchRoute=(route)=>{
    return matchPath({path:route},location.pathname)
  }
  const categoryDetail=async(id)=>{
      const result=await FetchCategoryDetail(id)
      dispatch(setCategory(result))
    }
  const fetchSublinks = async()=>{
        try{
          const result =await apiConnector("GET",categroyApi.CATEGORY_API);
          setSubLinks(result.data.body);
        }
        catch(err){
          console.log("Could Not fetch the category there is some error",err.message)
        }
      }
  useEffect(()=>{
      fetchSublinks();
      // fetchCartItems();
    },[])
  return (
    <div>
      {
        open && (
           <div className="fixed inset-0 z-[1000] mt-10 h-screen w-screen  overflow-auto bg-transparent backdrop-blur-[7px] ">
            <div className='flex flex-col items-center '>
                <ul className='flex-col gap-x-6 text-white text-base font-bold '>
                {
                  NavbarLink.map((link,index)=>{
                    return <li key={index}
                    onClick={()=>{
                      setSmallNavOpen(false);
                    }}
                    className='mt-5 pt-1 rounded-sm '
                    >
                        {
                          link.title==="Catalog"?(
                          <div className='flex relative group gap-0.5 hover:cursor-pointer'> 
                          <div className='flex flex-row gap-0.5 items-center'>
                            <p>{link.title}</p>
                            <p><MdKeyboardArrowDown className='text-2xl' /></p>
                          </div>
                            
                            <div className='invisible absolute right-0 translate-x-[37%] top-10 flex flex-col rounded-md p-4 opacity-0 group-hover:visible group-hover:opacity-100 md:w-[300px] w-[260px] transition-all duration-200 bg-white z-10 min-h-20
                            '>
                            <div className='absolute left-[44%] top-0 h-16 w-16 rotate-45 bg-white translate-x-1 z-0 rounded-[2px]'>
                            </div>
                            {subLinks.length===0 ? (<div>No Category Found</div>):(
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
                
                {
                !token && <li onClick={()=>{
                      setSmallNavOpen(false);
                    }}
                    className='mt-5 pt-1 rounded-sm '>
                   <Link to={"/login"}> 
                   <button className='px-2.5 py-1 rounded-lg text-white bg-slate-800 hover:cursor-pointer' >
                      Log In
                    </ button>
                    </Link>
                </li>}
                {
                !token && <li onClick={()=>{
                      setSmallNavOpen(false);
                    }}
                    className='mt-5 pt-1 rounded-sm'>
                  <Link to={"/signup"}>
                      <button className='px-2.5 py-1 rounded-lg text-white bg-slate-800 hover:cursor-pointer'>
                        Sign Up
                      </button>
                    </Link>
                </li>}
              </ul>
            </div>
          </div>
        )
      }
          
    </div>
  )
}

export default SmallNav



