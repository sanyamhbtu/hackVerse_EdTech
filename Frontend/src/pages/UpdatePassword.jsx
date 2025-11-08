import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { apiConnector } from '../services/apiConnector';
import { resetPasswordApi } from '../services/api';
import { BiSolidHide, BiSolidShow } from 'react-icons/bi';

function UpdatePassword() {
  const [hideC,setHideC]=useState(true);
  const [hideN,setHideN]=useState(true);
  const location=useLocation();
  const token=location.pathname.split('/').at(-1);
  const formRef=useRef({
    confirmpassword:"",
    password:""
  })
  async function onSubmitForm(e){
    e.preventDefault();
    try{
      const fd=new FormData();
      fd.append("confirmpassword",formRef.current.confirmpassword);
      fd.append("password",formRef.current.password);
      fd.append("token",token)
      const toastId=toast.loading("Resetting Password");
      await apiConnector("POST",resetPasswordApi.RESET_PASSWORD,fd);
      toast.success("Password Changed",{id:toastId});
    }
    catch(err){
      console.log("Error in the Changing Password",err.message);
      toast.error("Error in Chnage pd",err.message)
    }
  }

  return (
    <div className='w-screen h-screen bg-slate-900 flex justify-center md:pt-15 pt-10'>
      <div className='xl:w-[40%] lg:w-[50%] md:w-[60%] sm:w-[80%] w-[90%] h-fit flex flex-col gap-3 md:px-5 md:py-10 p-2 bg-slate-950 rounded-lg'>
        <div className='lg:text-4xl text-slate-200 font-bold md:text-3xl text-2xl'>Enter the new Password</div>
        <form className='flex flex-col gap-3 ' onSubmit={onSubmitForm}>
          <div className="flex sm:flex-row flex-col sm:gap-7 gap-y-3 w-[100%] text-slate-400">
             <label htmlFor="password" className="sm:w-[50%] w-[100%]">
                New Password
                <br />
                <div className='relative'>
                  <input
                    type={`${hideC?("password"):("text")}`}
                    className="bg-slate-800 sm:px-3 sm:py-4 p-2 rounded-lg mt-2 w-[100%] border-b-2 border-slate-600
                    placeholder-slate-500"
                    placeholder="Enter new Password"
                    onChange={(e)=>{
                      formRef.current.password=e.target.value
                    }}
                  />
                  <p className='absolute sm:top-7 top-5  right-3 hover:cursor-pointer '
                    onClick={()=>{
                      setHideC(!hideC);
                    }}
                    >{hideC?(<BiSolidHide/>):(<BiSolidShow/>)}
                  </p>
                </div>
              </label>
              <label htmlFor="confirmpassword" className="sm:w-[50%] w-[100%]">
                Confirm Password
                <br />
                <div className="relative">
                  <input
                    type={`${hideN?("password"):("text")}`}
                    className="bg-slate-800 sm:px-3 sm:py-4 p-2 rounded-lg mt-2 w-[100%] border-b-2 border-slate-600 placeholder-slate-500"
                    placeholder="Confirm Password"
                    onChange={(e)=>{
                      formRef.current.confirmpassword=e.target.value
                    }}
                  />
                  <p className='absolute sm:top-7 top-5 right-3 hover:cursor-pointer '
                    onClick={()=>{
                      setHideN(!hideN);
                    }}
                    >{hideN?(<BiSolidHide/>):(<BiSolidShow/>)}
                  </p>
                </div>
              </label>
            </div>
            <button type='submit'
            className='bg-yellow-500 text-black rounded-lg sm:px-3 sm:py-4 p-2  font-semibold hover:scale-99 hover:cursor-pointer'
            > Save Changes</button>
        </form>
      </div>
    </div>
  )
}

export default UpdatePassword