import React, { useState } from "react";
import Button from "../component/core/Homepage/Button";
import DashBoardSideBar from "../component/Common/DashBoardSideBar";
import { useSelector } from "react-redux";
import { profileApi, userApi } from "../services/api";
import { apiConnector } from "../services/apiConnector";
import toast from "react-hot-toast";
import { setUser } from "../slice/profileSlice";
import { useDispatch } from "react-redux";
import userimg from "../assets/user.jpg";
import { BiSolidHide } from "react-icons/bi";  //This below two is for the hide and unhide the password
import { BiSolidShow } from "react-icons/bi"; 
import { fetchTotalUserDetial, profileChange } from "../relatedFunction/profile";

const headers = {
  "Content-Type": "application/json",
};
function Setting() {
  const [hideC,setHideC]=useState(true);
  const [hideN,setHideN]=useState(true);
  const { user } = useSelector((state) => state.profile);
  // console.log(user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    about: "",
  });
  function handleOnChange(e) {
    setFormData((prev) => {
      const { name, value } = e.target;
      return { ...prev, [name]: value };
    });
  }
  const [profilePic,setProfilePic]=useState(null);

  const [formdata2, setformdata2] = useState({
    oldPassword: "",
    newPassword: "",
  });
  function handleOnChange2(e) {
    setformdata2((prev) => {
      const { name, value } = e.target;
      return { ...prev, [name]: value };
    });
  }
  async function handleOnClick(e) {
    try {
      if (formData.firstName === "") {
        formData.firstName = user?.firstName;
      }
      if (formData.lastName === "") {
        formData.lastName = user?.lastName;
      }
      const result = await apiConnector(
        "PUT",
        profileApi.UPDATE_PROFILE,
        JSON.stringify(formData),
        headers
      );
      // console.log(result);
      // const response = await apiConnector("GET", profileApi.USER_DETAIL);
      // const data = response.data.data;
      // const userDetail = {
      //   firstName: data.firstName,
      //   lastName: data.lastName,
      //   email: data.email,
      //   dateOfBirth: data.dateOfBirth,
      //   contactNumber: data.contactNumber,
      //   about: data.about,
      //   gender: data.gender,
      // };
      const userDetail=await fetchTotalUserDetial(); 
      dispatch(setUser(userDetail));
      toast.success("Profile Updated Successfully Kindly reload");
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.message);
    }
    // console.log(formData);
  }
  async function handleOnClick2() {
    try{
      formdata2.email=user?.email;
      console.log(formdata2)
      const response=await apiConnector("POST",userApi.CHANGE_PASSWORD_API,JSON.stringify(formdata2),headers);
      console.log(response);
      toast.success("Password Change !! Next time Use New")
    }
    catch(err){
      console.log(err.message);
      toast.error(err.response.data.message);
    }
  }
  async function changeProfileHandler(e){
    e.preventDefault();
    console.log("Profile pic is",profilePic)
    await profileChange(profilePic);
    setProfilePic(null);
    const userDetail=await fetchTotalUserDetial(); 
    dispatch(setUser(userDetail));
  }

  // const

  return (
    <div className="flex flex-row gap-0 bg-slate-800 text-white relative min-h-screen pb-52 ">
      <DashBoardSideBar />
      <div className="flex flex-col gap-10 w-[80%] items-center justify-start mx-auto text-white relative md:left-[10%] md:top-16">
        <div className="md:w-[80%] w-[100%] text-white font-bold text-4xl pt-10 relative ">
          Edit Profile
        </div>
        <div className="md:w-[80%] w-[100%] flex flex-row gap-5 bg-slate-950 md:px-10 md:py-5 px-5 py-3 rounded-xl items-center">
          <img
            className="lg:w-[65px] lg:h-[65px] w-[60px] h-[60px] rounded-full"
            src={user?.imgUrl} // Placeholder image for user profile
            alt="User Profile"
          />
          <div className="flex flex-col gap-2">
            <div className="font-semibold">Change Profile Picture</div>
            {/* <div className="flex flex-row gap-3"> */}
            <form className="flex flex-row gap-3"
            onSubmit={(e)=>{changeProfileHandler(e)}}
            >
              {
                !profilePic && 
                (
                  <input type="file" className="bg-slate-700 text-slate-200 rounded-lg px-2 font-semibold py-1.5 
                  hover:cursor-pointer  hover:bg-slate-800 md:w-50 w-20"
                  onChange={(e)=>{
                    setProfilePic(e.target.files[0]);
                    // console.log("FIle is",e.target.files[0]);
                  }}
                  />
                )
              }
              {
                profilePic && 
                (
                  <div className="flex flex-row gap-2">
                    <div className="text-base text-slate-200">{profilePic?.name}</div>
                    <button className="bg-slate-800 text-slate-300 rounded-lg px-5 font-semibold py-1 hover:cursor-pointer"
                    onClick={()=>{
                      setProfilePic(null);
                    }}
                    >
                      Cancel
                    </button>
                  </div>
                    
                )
              }
              <button className="bg-yellow-500 text-black rounded-lg px-5 font-semibold py-1.5 hover:scale-95 hover:cursor-pointer"
              type="submit"
              >
                Upload
              </button>
            </form>
{/*               
            </div> */}
          </div>
        </div>

        <div className="md:w-[80%] w-[100%] flex flex-col sm:gap-10 gap-5 bg-slate-950 rounded-xl px-10 py-5 ">
          <div className="text-xl font-bold ">Profile Information</div>
          <form className="flex flex-col gap-3 ">
            <div className="flex sm:flex-row flex-col gap-7 w-[100%]">
              <label htmlFor="firstName" className="sm:w-[50%] w-[100%]">
                Fist Name
                <br />
                <input
                  type="text"
                  className="bg-slate-800 sm:px-3 sm:py-4 p-2 rounded-lg mt-2 w-[100%] border-b-2 border-slate-600
                  placeholder-slate-500"
                  name="firstName"
                  placeholder={`${
                    user?.firstName === "" ? "Enter first Name" : user?.firstName
                  }`}
                  value={formData.firstName}
                  onChange={handleOnChange}
                />
              </label>
              <label htmlFor="lastName" className="sm:w-[50%] w-[100%]">
                LastName
                <br />
                <input
                  type="text"
                  className="bg-slate-800 sm:px-3 sm:py-4 p-2 rounded-lg mt-2 w-[100%] border-b-2 border-slate-600
                  placeholder-slate-500"
                  name="lastName"
                  placeholder={`${
                    user?.lastName === "" ? "Enter last Name" : user?.lastName
                  }`}
                  value={formData.lastName}
                  onChange={handleOnChange}
                />
              </label>
            </div>
            <div className="flex sm:flex-row flex-col gap-7 w-[100%]">
              <label htmlFor="dateOfBirth" className="sm:w-[50%] w-[100%]">
                Date Of Birth
                <br />
                <input
                  type="date"
                  className="bg-slate-800 sm:px-3 sm:py-4 p-2 rounded-lg mt-2 w-[100%] border-b-2 border-slate-600
                  placeholder-slate-500"
                  name="dateOfBirth"
                  placeholder="Enter Your DOB"
                  value={formData.dateOfBirth}
                  onChange={handleOnChange}
                />
              </label>
              <label htmlFor="gender" className="sm:w-[50%] w-[100%]">
                Gender
                <br />
                <input
                  type="text"
                  className="bg-slate-800 sm:px-3 sm:py-4 p-2 rounded-lg mt-2 w-[100%] border-b-2 border-slate-600
                  placeholder-slate-500"
                  name="gender"
                  placeholder="Enter you gender"
                  value={formData.gender}
                  onChange={handleOnChange}
                />
              </label>
            </div>
            <div className="flex sm:flex-row flex-col gap-7 w-[100%]">
              <label htmlFor="contactNumber" className="sm:w-[50%] w-[100%]">
                Contact Number
                <br />
                <input
                  type="text"
                  className="bg-slate-800 sm:px-3 sm:py-4 p-2 rounded-lg mt-2 w-[100%] border-b-2 border-slate-600
                  placeholder-slate-500"
                  name="contactNumber"
                  placeholder="Kindly give the Contact No."
                  value={formData.contactNumber}
                  onChange={handleOnChange}
                />
              </label>
              <label htmlFor="about" className="sm:w-[50%] w-[100%]">
                About
                <br />
                <input
                  type="text"
                  className="bg-slate-800 sm:px-3 sm:py-4 p-2 rounded-lg mt-2 w-[100%] border-b-2 border-slate-600
                  placeholder-slate-500"
                  name="about"
                  placeholder="Tell us about yourself"
                  value={formData.about}
                  onChange={handleOnChange}
                />
              </label>
            </div>
          </form>
          <div className="flex justify-end">
            <div className="flex flex-row  gap-2 w-fit">
              <button className="bg-slate-700 text-slate-200 rounded-lg px-5 font-semibold py-1.5 hover:scale-95">
                Cancel
              </button>
              <button
                className="bg-yellow-500 text-black rounded-lg px-5 font-semibold py-1.5 hover:scale-95"
                onClick={handleOnClick}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-[80%] w-[100%] flex flex-col sm:gap-10 gap-5 bg-slate-950 rounded-xl px-10 py-5 ">
          <div className="text-xl font-bold ">Password</div>
          <form className="flex flex-col gap-3 ">
            <div className="flex sm:flex-row flex-col gap-7 w-[100%]">
              <label htmlFor="oldPassword" className="sm:w-[50%] w-[100%]">
                Current Password
                <br />
                <div className='relative'>
                  <input
                    type={`${hideC?("password"):("text")}`}
                    className="bg-slate-800 sm:px-3 sm:py-4 p-2 rounded-lg mt-2 w-[100%] border-b-2 border-slate-600
                    placeholder-slate-500"
                    name="oldPassword"
                    placeholder="Enter current Password"
                    value={formdata2.oldPassword}
                    onChange={handleOnChange2}
                  />
                  <p className='absolute top-7 right-10 hover:cursor-pointer '
                    onClick={()=>{
                      setHideC(!hideC);
                    }}
                    >{hideC?(<BiSolidHide/>):(<BiSolidShow/>)}
                  </p>
                </div>
              </label>
              <label htmlFor="newPassword" className="sm:w-[50%] w-[100%]">
                New Password
                <br />
                <div className="relative">
                  <input
                    type={`${hideN?("password"):("text")}`}
                    className="bg-slate-800 sm:px-3 sm:py-4 p-2 rounded-lg mt-2 w-[100%] border-b-2 border-slate-600 placeholder-slate-500"
                    name="newPassword"
                    placeholder="Enter New Password"
                    value={formdata2.newPassword}
                    onChange={handleOnChange2}
                  />
                  <p className='absolute top-7 right-10 hover:cursor-pointer '
                    onClick={()=>{
                      setHideN(!hideN);
                    }}
                    >{hideN?(<BiSolidHide/>):(<BiSolidShow/>)}
                  </p>
                </div>
              </label>
            </div>
          </form>
          <div className="flex justify-end">
            <div className="flex flex-row  gap-2 w-fit">
              <button className="bg-slate-700 text-slate-200 rounded-lg px-5 font-semibold py-1.5 hover:scale-95">
                Cancel
              </button>
              <button className="bg-yellow-500 text-black rounded-lg px-5 font-semibold py-1.5 hover:scale-95 hover:cursor-pointer"
              onClick={handleOnClick2}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
