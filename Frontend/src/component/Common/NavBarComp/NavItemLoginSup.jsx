import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, matchPath } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import ProfileDropDown from '../../core/auth/ProfileDropDown';
import { fetchTotalCartItems } from '../../../relatedFunction/cartFunction';
import { setTotalCartItems } from '../../../slice/cartSlice';

function NavItemLoginSup() {
  const {cartItems}=useSelector((state)=>state.cartAndEnrolledCourse);
  const {token}=useSelector((state)=>state.auth)
  const {user}=useSelector((state)=>state.profile)
  const dispatch=useDispatch();
  const fetchCartItems=async ()=>{
      const result=await fetchTotalCartItems();
      dispatch(setTotalCartItems(result))
    }
// console.log("This is Cart Items : " , cartItems);
  useEffect(()=>{
    if(token){
      fetchCartItems();
    }
    },[])

  // console.log("Token is ",token)
  return (
    <div className='md:flex md:gap-x-4 items-center '>
      {
        token !==null && (
          user&&user?.accountType != "Instructor" &&(
          <Link to={"dashboard/cart"} className='relative'> 
            <FaCartPlus className='text-slate-100 text-2xl absolute top-0 md:translate-y-[-10px] translate-y-[11px] right-0'/>
            {
              cartItems &&  cartItems?.length>0 &&(
                <span className='text-yellow-300 text-[12px] absolute right-0 top-6 md:top-0 bg-slate-800 font-extrabold rounded-full px-2'>
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
          > <button className='px-2.5 py-1 rounded-lg text-white bg-slate-700 hover:cursor-pointer md:visible invisible' >Log In</button></Link>
        )
      }
      {
        token===null && (
          <Link to={"/signup"}>
            <button className='px-2.5 py-1 rounded-lg text-white bg-slate-700 hover:cursor-pointer md:visible invisible'>Sign Up</button>
          </Link>
        )
      }
      {
        token !==null && <ProfileDropDown/>
      }

     </div>
  )
}

export default NavItemLoginSup