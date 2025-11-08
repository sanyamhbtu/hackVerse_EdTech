import React, { useEffect, useState } from 'react'
import { useDispatch} from 'react-redux';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { fetchTotalCartItems } from '../../../relatedFunction/cartFunction';
import { setTotalCartItems } from '../../../slice/cartSlice';
import { apiConnector } from '../../../services/apiConnector';
import { categroyApi } from '../../../services/api';
import toast from 'react-hot-toast';
import { MdKeyboardArrowDown } from 'react-icons/md';
import {NavbarLink} from "../../../data/NavbarLink"
import { FetchCategoryDetail } from '../../../relatedFunction/addCourse';
import { setCategory } from '../../../slice/courseSlice';

function NavItemNavbar() {
  const dispatch=useDispatch();

  const location=useLocation();

  const [subLinks , setSubLinks]=useState([]);
  // const fetchCartItems=async ()=>{
  //   const result=await fetchTotalCartItems();
  //   dispatch(setTotalCartItems(result))
  // }
  const fetchSublinks = async()=>{
      try{
        const result =await apiConnector("GET",categroyApi.CATEGORY_API);
        setSubLinks(result.data.body);
      }
      catch(err){
        console.log("Could Not fetch the category there is some error")
      }
    }
  const categoryDetail=async(id)=>{
    const result=await FetchCategoryDetail(id)
    dispatch(setCategory(result))
  }
  useEffect(()=>{
    fetchSublinks();
    // fetchCartItems();
  },[])

  const matchRoute=(route)=>{
    return matchPath({path:route},location.pathname)
  }
  // 
  return (
    <nav className='md:w-fit ]'>
      <ul className='md:flex gap-x-6 text-white '>
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
                    
                    <div className='invisible absolute right-0 translate-x-[40%] top-10 flex flex-col rounded-md p-4 opacity-0 group-hover:visible group-hover:opacity-100 md:w-[300px] transition-all duration-200 bg-white z-10 min-h-20
                    '>
                    <div className='absolute left-[44%] top-0 h-16 w-16 rotate-45 bg-white translate-x-1 z-0 rounded-[2px]'>
                    </div>
                    {subLinks && subLinks.length===0 ? (<div >
                      <p className='text-black w-11/12 bg-slate-100 rounded-sm relative font-semibold py-3 px-3 my-2 z-50'>
                        No Category Found
                      </p>
                      </div>):(
                      subLinks &&  subLinks.map((subLink,index)=>(
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
     </nav>
  )
}

export default NavItemNavbar