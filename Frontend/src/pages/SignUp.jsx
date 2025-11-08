import React, { useState } from "react";
import HighlightText from "../component/core/Homepage/HighlightText";
import login from "../assets/login.jpg";
import login2 from "../assets/login2.jpg";
import { userApi } from "../services/api";
import { apiConnector } from "../services/apiConnector";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { BiSolidHide } from "react-icons/bi";  //This below two is for the hide and unhide the password
import { BiSolidShow } from "react-icons/bi"; 


const headers={
      'Content-Type': 'application/json',
      }
function SignUp() {
  const [hideC,setHideC]=useState(true);
  const [hideN,setHideN]=useState(true);
  const navigate=useNavigate();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phNumber: "",
    createPasswd: "",
    cnfPasswd: "",
    otp: "",
  });
  const [active, setActive] = useState("");
  const [otpSection, setOtpSection] = useState(false);

  function onchangeHandler(e) {
    setValues((prev) => {
      const { name, value } = e.target;
      return { ...prev, [name]: value };
    });
    // console.log(values);
  }
  async function handleOnSubmit(e) {
    e.preventDefault();
    console.log("Hello jii");
    try {

      const newvalue={
        email:values.email
      }
      console.log(newvalue);
      console.log(userApi.SEND_OTP_API)
      const result=await apiConnector("POST",userApi.SEND_OTP_API,JSON.stringify(newvalue),headers);
      if(!(result.status===200)){
        const errorData = await result.json();  // 👈 get message from backend
        throw new Error(errorData.message);
    }
      setOtpSection(true);
      toast.success("Successfully send OTP")
    } 
    catch (err) {
      console.log("There is some error while sign up", err.message);
      const msg=err?.response?.data?.message || "Could Not Send OTP"
      toast.error(msg);
      navigate("/signup");
    }
  }
  async function finalOnSubmit(e) {
    try{
      e.preventDefault();
    // console.log("I am here2");
    console.log(values);
    const data={
      firstName:values.firstName,
      lastName:values.lastName,
      email:values.email,
      password:values.createPasswd,
      confirmPasseord:values.cnfPasswd,
      accountType:values.rollType,
      otp:values.otp
    }
    const result=await apiConnector("POST",userApi.SIGN_UP_API,JSON.stringify(data),headers);
    if(!(result.status===200)){
      const errorData = await result.json();  // 👈 get message from backend
      throw new Error(errorData.message);
    }
    toast.success("Successfully SignUP on the Website Please LogIn")
    // console.log(result);
    navigate("/login");

    }
    catch(err){
      console.log("SomeThing Bad happens while SignUp",err.message);
      const msg=err?.response?.data?.message || "Error in SignUp"
      toast.error(msg);
      navigate("/signup")
    }
    
  }

  return (
    <div className="bg-slate-950 w-[100%] h-[fit]">
      {otpSection ? 
      (
        <div className="w-[40vw] h-[40vh] bg-slate-900 flex flex-col gap-10 justify-center items-center p-5 mx-auto mt-15 rounded-2xl">
          <div className="text-4xl font-bold text-white">
            Enter OTP to verify
          </div>
          <div className="text-base font-semibold text-slate-400 text-center">
            In the below field enter the otp which has been send to your Gmail
            account . After successfull match of otp acount will be created
          </div>
          <div>
            <form className="flex flex-col gap-5" onSubmit={finalOnSubmit}>
              <input
                type="text"
                placeholder="Enter the otp"
                className="placeholder-slate-400 bg-slate-700 w-11/12 p-2 rounded-xl text-white"
                name="otp"
                onChange={onchangeHandler}
                value={values.otp}
              />
              <input
                type="submit"
                value="Verify & SignUp"
                className="bg-yellow-400 text-black font-semibold rounded-lg w-11/12 py-1.5 placeholder-slate-400 hover:cursor-pointer"
              />
            </form>
          </div>
        </div>
      ) : 
      (
        <div className="w-11/12 flex lg:flex-row flex-col-reverse gap-16 lg:justify-center mx-auto sm:mx-auto mt-10 lg:items-start items-center">
          <div className='flex flex-col gap-2 lg:w-[35%] w-[90%] lg:mt-0 md:mt-92  sm:mt-88 mt-40 '>
            <div className="text-3xl text-slate-200 font-bold">
              Welcome Back
            </div>
            <div className="text-slate-400">
              Build skills for today ,tomorrow and beyond.{" "}
              <HighlightText
                text={"Education to future proof your carrer"}
              ></HighlightText>
            </div>
            <div className="bg-slate-700 flex flex-row gap-4 w-fit py-1 px-4 rounded-2xl">
              <p
                onClick={() =>
                  setValues((prev) => {
                    setActive("Student");
                    // console.log(values);
                    return { ...prev, rollType: "Student" };
                  })
                }
                className={`text-white rounded-xl m-0.5 px-1.5 py-0.5 ${
                  active === "Student" ? "bg-slate-900" : "bg-slate-700"
                }`}
              >
                Student
              </p>
              <p
                onClick={() =>
                  setValues((prev) => {
                    setActive("Instructor");
                    // console.log(values);
                    return { ...prev, rollType: "Instructor" };
                  })
                }
                className={`text-white rounded-xl m-0.5 px-1.5 py-0.5 ${
                  active === "Instructor" ? "bg-slate-900" : "bg-slate-700"
                }`}
              >
                Instructor
              </p>
            </div>
            <form
              action="submit"
              className="text-white flex flex-col"
              onSubmit={handleOnSubmit}
            >
              <div className="flex flex-row gap-2 justify-between">
                <label htmlFor="firstName">
                  First Name
                  <br />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter First Name here"
                    value={values.firstName}
                    onChange={onchangeHandler}
                    className="bg-slate-700 p-2 mb-3 w-[90%] mt-1 rounded-lg placeholder-slate-400"
                  />
                </label>
                <label htmlFor="lastName">
                  Last Name
                  <br />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter Last Name here"
                    value={values.lastName}
                    onChange={onchangeHandler}
                    className="bg-slate-700 p-2 mb-3 w-[90%] mt-1 rounded-lg placeholder-slate-400"
                  />
                </label>
              </div>

              <label htmlFor="email">
                Email Address
                <br />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email here"
                  value={values.email}
                  onChange={onchangeHandler}
                  className="bg-slate-700 p-2 mb-3 mt-1 w-[96%] rounded-lg placeholder-slate-400"
                />
              </label>

              <label htmlFor="phNumber">
                Phone Number
                <br />
                <input
                  type="text"
                  name="phNumber"
                  placeholder="0123456789"
                  value={values.phNumber}
                  onChange={onchangeHandler}
                  className="bg-slate-700 p-2 mb-3 mt-1 w-[96%] rounded-lg placeholder-slate-400"
                />
              </label>

              <div className="flex flex-row gap-2 justify-between">
                <label htmlFor="createPasswd">
                  Create Password
                  <br />
                  <div className='relative'>
                    <input
                      type={`${hideC?("password"):("text")}`}
                      name="createPasswd"
                      placeholder="Enter First Name here"
                      value={values.createPasswd}
                      onChange={onchangeHandler}
                      className="bg-slate-700 p-2 mb-3 w-[90%] mt-1 rounded-lg placeholder-slate-400"
                    />
                    <p className='absolute top-4 right-8 hover:cursor-pointer '
                      onClick={()=>{
                        setHideC(!hideC);
                      }}
                      >{hideC?(<BiSolidHide/>):(<BiSolidShow/>)}
                    </p>
                  </div>
                </label>
                <label htmlFor="cnfPasswd">
                  Confirm Password
                  <br />
                  <div className='relative'>
                    <input
                      type={`${hideN?("password"):("text")}`}
                      name="cnfPasswd"
                      placeholder="Enter Last Name here"
                      value={values.cnfPasswd}
                      onChange={onchangeHandler}
                      className="bg-slate-700 p-2 mb-3 w-[90%] mt-1 rounded-lg placeholder-slate-400"
                    />
                    <p className='absolute top-4 right-8 hover:cursor-pointer '
                      onClick={()=>{
                        setHideN(!hideN);
                      }}
                      >{hideN?(<BiSolidHide/>):(<BiSolidShow/>)}
                    </p>
                  </div>
                </label>
              </div>

              <input
                type="submit"
                value="Create Account"
                className="bg-yellow-400 text-black font-semibold rounded-lg py-1.5 mt-8 w-[96%] placeholder-slate-400 hover:cursor-pointer"
              />
            </form>
          </div>
          <div className="lg:w-[50%] md:w-[75%] w-[85%] relative">
            <img
              src={login2}
              alt="Image is loaing"
              className="absolute left-[3%] top-[6%]"
            />
            <img src={login} alt="image is loading" className="absolute " />
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
