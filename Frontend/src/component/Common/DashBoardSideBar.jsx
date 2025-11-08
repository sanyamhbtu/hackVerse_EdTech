import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaCartPlus } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { MdCastForEducation } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import LogOut from "./LogOut";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../../slice/loaderANDlogout";
import { MdOutlineComputer } from "react-icons/md";
import { MdOutlineAdd } from "react-icons/md";
import SmallLoginSideBar from "../../pages/SmallLoginSideBar";

function DashBoardSideBar() {
  const location = useLocation();
  const sideTag = location.pathname.split("/");
  // console.log("Side tags are ",sideTag);
  const [activeLink, setActiveLink] = useState(sideTag);
  const { isLogOut } = useSelector((state) => state.loaderANDlogout);
  const { user } = useSelector((state) => state.profile);
  const location2 = useLocation();
  const isfixed=location2.pathname.startsWith('/dashboard');
  // console.log("Isfixes is in side bar",isfixed)
  const dispatch = useDispatch();
  const {token}=useSelector((state)=>state.auth)

  return (
    <div className="relative">
      {isLogOut ? (
        <LogOut></LogOut>
      ) : (
        <div className={`${isfixed?("md:flex flex-col gap-5 w-[18%] h-[100vh] bg-slate-950 pt-10 font-semibold md:fixed top-10 hidden md:visible "):
          ("fixed inset-0 z-[1000]  h-screen w-screen  overflow-auto bg-transparent backdrop-blur-[7px] ")}`}>
          <Link
            to={"/dashboard/my-profile"}
            className={`flex flex-row gap-1 px-4 py-2 w-[100%] items-center ${
              activeLink.at(-1) === "my-profile" || activeLink.at(-1) === "dashboard"
                ? "text-yellow-300 bg-yellow-900"
                : ""
            }`}
          >
            <CgProfile />
            <p className="lg:text-base text-[14px]">My Profile</p>
          </Link>
          <Link to={`${user?.accountType === "Instructor"?("/dashboard/courses"):(user?.accountType==="Student" ? "/dashboard/enrolled-courses" : "/dashboard")}
          `}>
            {user?.accountType === "Instructor" && (
              <div
                className={`flex flex-row gap-1 px-4 py-2 w-[100%] items-center ${
                  activeLink.at(-1) === "courses"
                    ? "text-yellow-300 bg-yellow-900"
                    : ""
                }`}
              >
                <MdOutlineComputer />
                <p className="lg:text-base text-[14px]">My Courses</p>
              </div>
            )}
            {user?.accountType === "Student" && (
              <div
                className={`flex flex-row gap-1 px-4 py-2 w-[100%] items-center ${
                  activeLink.includes("enrolled-courses")
                    ? "text-yellow-300 bg-yellow-900"
                    : ""
                }`}
              >
                <MdCastForEducation className="text-base"/>
                <p className="lg:text-base text-[13px]">Enrolled Courses</p>
              </div>
            )}
          </Link>
          <div>
            {
              user?.accountType==="Instructor" && (
                <Link 
                to={"/dashboard/add-course"}
                className={`flex flex-row gap-1 px-4 py-2 w-[100%] items-center ${
              (activeLink.at(-1) === "add-course" || activeLink.at(-2)==="add-course") ? "text-yellow-300 bg-yellow-900" : ""
            }`}>
                <MdOutlineAdd/>
                <p className="lg:text-base text-[14px]">Add Course</p>
                </Link>
              )
            }
            {
              user?.accountType==="Student" && (
                <Link 
                to={'/dashboard/cart'}
                className={`flex flex-row gap-1 px-4 py-2 w-[100%] items-center ${
              activeLink.at(-1) === "cart" ? "text-yellow-300 bg-yellow-900" : ""
            }`}>
                  <FaCartPlus />
                  <p className="lg:text-base text-[14px]">Cart</p>
                  
                </Link>
              )
            }
          </div>
          <div className="border-1 border-slate-600 w-[80%] mx-auto"></div>
          <Link
            to={"/dashboard/setting"}
            className={`flex flex-row gap-1 px-4 py-2 w-[100%] items-center ${
              activeLink.at(-1) === "setting" ? "text-yellow-300 bg-yellow-900" : ""
            }`}
          >
            <IoSettings />
            <p className="lg:text-base text-[14px]">Setting</p>
          </Link>
          <button
            // to={"/dashboard/setting"}
            className={`flex flex-row gap-1 px-4 py-2 w-[100%] items-center hover:cursor-pointer text-red-500`}
            onClick={() => {
              dispatch(setLogout(true));
            }}
          >
            <BiLogOut />
            <p className="lg:text-base text-[14px]">Log Out</p>
          </button>
        </div>
      )}
      {
        token && (
          <div className={`md:hidden visible absolute z-[1000]`}>
        <SmallLoginSideBar></SmallLoginSideBar>
      </div>
        )
      }
      
    </div>
  );
}

export default DashBoardSideBar;







      {/* <div className="flex flex-col gap-5 w-[20%] h-[100vh] bg-slate-950 pt-10 font-semibold fixed top-10">
        <Link
          to={"/dashboard/my-profile"}
          className={`flex flex-row gap-1 px-4 py-2 w-[100%] items-center ${
            activeLink === "My Profile" ? "text-yellow-300 bg-yellow-900" : ""
          }`}
          onClick={() => {
            setActiveLink("My Profile");
          }}
        >
          <CgProfile />
          <p>My Profile</p>
        </Link>
        <Link
          to={"/dashboard/courses"}
          className={`flex flex-row gap-1 px-4 py-2 w-[100%] items-center ${
            activeLink === "Courses" ? "text-yellow-300 bg-yellow-900" : ""
          }`}
          onClick={() => {
            setActiveLink("Courses");
          }}
        >
          <MdCastForEducation />
          <p>Enrolled Curses</p>
        </Link>
        <Link
          to={"/dashboard/cart"}
          className={`flex flex-row gap-1 px-4 py-2 w-[100%] items-center ${
            activeLink === "Cart" ? "text-yellow-300 bg-yellow-900" : ""
          }`}
          onClick={() => {
            setActiveLink("Cart");
          }}
        >
          <FaCartPlus />
          <p>Cart</p>
        </Link>
        <div className="border-1 border-slate-600 w-[80%] mx-auto"></div>
        <Link
          to={"/dashboard/setting"}
          className={`flex flex-row gap-1 px-4 py-2 w-[100%] items-center ${
            activeLink === "Setting" ? "text-yellow-300 bg-yellow-900" : ""
          }`}
          onClick={() => {
            setActiveLink("Setting");
          }}
        >
          <IoSettings />
          <p>Setting</p>
        </Link>
        <Link
          to={"/dashboard/setting"}
          className={`flex flex-row gap-1 px-4 py-2 w-[100%] items-center ${
            activeLink === "LogOut" ? "text-yellow-300 bg-yellow-900" : ""
          }`}
          onClick={setIslogOut}
        >
          <BiLogOut />
          <p>Log Out</p>
        </Link>
      </div> */}
