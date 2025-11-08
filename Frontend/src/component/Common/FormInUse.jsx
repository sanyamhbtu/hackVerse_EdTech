import React, { useRef, useState } from 'react'
import { sendMessage } from '../../relatedFunction/contact';

function FormInUse() {
  // const [formData,setFormData]=useState({
  //     firstName:"",
  //     lastName:"",
  //     email:"",
  //     phNumber:"",
  //     textarea:""
  //   })
    const formRef=useRef({
      firstName:"",
      lastName:"",
      email:"",
      phNumber:"",
      textarea:""
    })

    // function handleOnChange(e){
    //   setFormData((prev)=>{
    //     const {name,value}=e.target;
    //     return {...prev,[name]:value}
    //   })
    // }
    async function handleOnSubmit(e){
      e.preventDefault();
      // console.log("Form Data is ",formData);
      const data={
        firstName:formRef.current.firstName,
        lastName:formRef.current.lastName,
        email:formRef.current.email,
        phNumber:formRef.current.phNumber,
        textarea:formRef.current.textarea
      }
      // console.log("Data is ",data)
      await sendMessage(data);
      e.target.reset();
      // console.log("Form ref is")
      // console.log(formRef)
      // formRef.current.firstName=""
    }

  return (
    <div>
      <form className='flex flex-col md:gap-y-7 gap-y-3 px-2'
      onSubmit={(e)=>{handleOnSubmit(e)}}
      >
          <div className='flex flex-row gap-7 md:w-11/12 w-[97%]'>
          <label htmlFor="firstName" className='w-[50%]'>
            Fist Name
            <br />
            <input type="text" 
            className='bg-slate-800 md:px-3 md:py-4 px-1 py-2 rounded-lg mt-2 w-[100%] border-b-2 border-slate-600 placeholder-slate-400'
            placeholder='Enter first Name'
            // name='firstName'
            // value={formData.firstName}
            // onChange={handleOnChange}
            ref={formRef}
            onChange={(e)=>{
              formRef.current.firstName=e.target.value;
            }}
             />
          </label>
          <label htmlFor="lastName" className='w-[50%]'>
            LastName
            <br />
            <input type="text" 
            className="bg-slate-800 md:px-3 md:py-4 px-1 py-2 rounded-lg mt-2 w-[100%] border-b-2 border-slate-600
            placeholder-slate-400"
            placeholder='Enter last Name'
            // name='lastName'
            // value={formData.lastName}
            // onChange={handleOnChange}
            ref={formRef}
            onChange={(e)=>{
              formRef.current.lastName=e.target.value
            }}
             />
          </label>
          </div>
          <label htmlFor="email">
            Email Address
            <br />
            <input type="email"
            className="bg-slate-800 md:px-3 md:py-4 px-1 py-2 rounded-lg mt-2 md:w-11/12 w-[97%] mx-auto border-b-2 border-slate-600
            placeholder-slate-400" 
            placeholder='Enter email address'
            // name='email'
            // value={formData.email}
            // onChange={handleOnChange}
            ref={formRef}
            onChange={(e)=>{
              formRef.current.email=e.target.value
            }}
            />
          </label>
          <label htmlFor="phNumber">
            Phone Number
            <br />
            <input type="text"
            className="bg-slate-800 md:px-3 md:py-4 px-1 py-2 rounded-lg mt-2 md:w-11/12 w-[97%] mx-auto border-b-2 border-slate-600
            placeholder-slate-400"
            placeholder='12345 67890' 
            // name='phNumber'
            // value={formData.phNumber}
            // onChange={handleOnChange}
            ref={formRef}
            onChange={(e)=>{
              formRef.current.phNumber=e.target.value
            }}
            />
          </label>
          <label htmlFor="textarea">
            Message
            <br />
            <textarea name="textarea"  
            className="bg-slate-800 md:w-11/12 w-[97%] mx-auto md:px-3 md:py-4 px-1 py-2 rounded-lg mt-2 border-b-2 border-slate-600
            placeholder-slate-400"
            rows={8}
            // placeholder='Enter your message here' 
            // value={formData.textarea}
            // onChange={handleOnChange}
            ref={formRef}
            onChange={(e)=>{
              formRef.current.textarea=e.target.value
            }}
            ></textarea>
          </label>
          <button type='submit' className='w-11/12 text-black bg-yellow-400 rounded-lg p-3 hover:cursor-pointer'>Submit</button>
        </form>
    </div>
  )
}

export default FormInUse