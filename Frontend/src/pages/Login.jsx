import React, { useState } from 'react'
import HighlightText from "../component/core/Homepage/HighlightText";
import { Link } from 'react-router-dom';
import login from '../assets/login.jpg'
import login2 from '../assets/login2.jpg'
import { resetPasswordApi, userApi } from "../services/api";
import { apiConnector } from "../services/apiConnector";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { setToken } from '../slice/authSlice';
import { useDispatch } from 'react-redux';
import { BiSolidHide } from "react-icons/bi";  //This below two is for the hide and unhide the password
import { BiSolidShow } from "react-icons/bi"; 


const headers={
      'Content-Type': 'application/json',
      }
function Login() {
  const [values,setValues]=useState({email:"",passwd:""})
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [hide,setHide]=useState(true);

  function onchangeHandler(e){
    setValues((prev)=>{
      const {name,value}=e.target;
      return {...prev,[name]:value};
    })
  }
  async function handleOnSubmit(e){
    e.preventDefault();
    // console.log(values)
    try{
      const data={
        email:values.email,
        password:values.passwd
      }
      const toastId=toast.loading("Loading..");
      const result=await apiConnector("POST",userApi.LOGIN_API,JSON.stringify(data),headers)
      if (!(result.status === 200)) {
        const errorData = await result.json();  // 👈 get message from backend
        throw new Error(errorData.message);
      }
      toast.success("Log In Successfully",{id:toastId});
      console.log("Token came is ",result.data)
      dispatch(setToken(result.data.token))
      localStorage.setItem("token",JSON.stringify(result.data.token))
      navigate("/");
      
    }
    catch(err){
      toast.dismiss();
      console.log("There is some error While login")
      if(!(err.response)){
        toast.error("Log In Error");
        return;
      }
      const msg=err.response.data.message;
      toast.error(msg)
    }
  }
  async function handleForgotPasswd(){
    try{
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(values.email)) {
        toast.error("Invalid email!");
        return;
      }
      const fd=new FormData();
      fd.append("email",values.email);
      await apiConnector("POST",resetPasswordApi.RESET_PASSWORD_TOKEN,fd);
      toast.success("Email Send to Your mail");
    }
    catch(err){
      console.log("Error in Resetting Passwd",err.message);
      toast.error("Error in sending link");
      toast.error(err.message);
    }
  }

  return (
    <div className='bg-slate-950 w-[100%] h-fit mb-16'>    
      <div className='w-11/12 flex lg:flex-row flex-col-reverse gap-16 lg:justify-center mx-auto mt-10 lg:items-start items-center'>
      <div className='flex flex-col gap-2 lg:w-[35%] w-[80%] lg:mt-0 md:mt-92  sm:mt-88 mt-32 '
      >
        <div className='md:text-3xl text-2xl text-slate-200 '>Welcome Back</div>
        <div className='text-slate-400 mb-5'>Build skills for today ,tomorrow and beyond. <HighlightText text={"Education to future proof your carrer"}></HighlightText></div>
        <form onSubmit={handleOnSubmit} 
        className='text-white flex flex-col'>
          <label htmlFor="email">Email Address
            <br />
              <input type="email" 
              name='email'
              placeholder='Enter email here'
              value={values.email}
              onChange={onchangeHandler}
              className='bg-slate-700 p-2 mb-3 w-11/12 mt-1 rounded-lg placeholder-slate-400'
              />
          </label>
          <label htmlFor="passwd">
            Password
            <br />
            <div className='relative'>
              <input type={`${hide?("password"):("text")}`}
              name="passwd" id="passwd" 
              value={values.passwd}
              placeholder='Enter password here'
              onChange={onchangeHandler}
              className='bg-slate-700 p-2 w-11/12 mt-1 rounded-lg placeholder-slate-400'
              />
              <p className='absolute top-4 right-14 hover:cursor-pointer '
              onClick={()=>{
                setHide(!hide);
              }}
              >{hide?(<BiSolidHide/>):(<BiSolidShow/>)}</p>
            </div>
          </label>
          <div className='w-11/12 text-[13px] flex justify-end '>
            <button
            type='button'
            className='mt-1 text-blue-600 hover:cursor-pointer hover:underline'
            onClick={handleForgotPasswd}
            > Forgot Password</button>
          </div>
          
          <input type="submit" 
        value='Sign In' 
        className='bg-yellow-400 text-black font-semibold rounded-lg py-1.5 w-11/12 mt-8
        hover:cursor-pointer 
        '
        />
        </form>
      </div>
      <div className='lg:w-[50%] md:w-[75%] w-[85%] relative '>
        <img src={login2} alt="Image is loaing" 
        className='absolute left-[3%] top-[6%]'
        />
        <img src={login} alt="image is loading" 
        className='absolute '
        />
      </div>
    </div>
   </div>

  )
}

export default Login