import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoSidebarCollapse } from "react-icons/go";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import {
  MdCastForEducation,
  MdOutlineAdd,
  MdOutlineComputer,
} from "react-icons/md";
import { FaCartPlus } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { setLogout } from "../slice/loaderANDlogout";

export default function SmallLoginSideBar() {
  const { token } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  let touchStartX = 0;

  // Swipe detection
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      const touchEndX = e.touches[0].clientX;
      if (touchEndX - touchStartX > 100) {
        // swipe right
        setIsOpen(true);
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);
  const location = useLocation();
  const sideTag = location.pathname.split("/");
  const [activeLink, setActiveLink] = useState(sideTag);
  const { isLogOut } = useSelector((state) => state.loaderANDlogout);
  const { user } = useSelector((state) => state.profile);
  const location2 = useLocation();
  // const isfixed=location2.pathname.startsWith('/dashboard');
  // console.log("Isfixes is in side bar",isfixed)
  const dispatch = useDispatch();

  return (
    <>
      {/* Button to open */}
      <RiArrowRightDoubleFill
        className="text-5xl font-bold z-100 hover:cursor-pointer translate-x-[-2] translate-y-[-8] px-2 py-0 rounded-sm bg-slate-900 text-yellow-300 "
        onClick={() => {
          setIsOpen(true);
        }}
      />

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-transparent backdrop-blur-[3px]  duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-slate-950 shadow-lg transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
         `}
      >
        <div className="p-4 flex justify-between items-center border-b ">
          <h2 className="text-lg font-bold">StudyNotion</h2>
          <button
            className="hover:cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            ❌
          </button>
        </div>
        <div
          className="flex flex-col gap-5 h-[100vh] bg-slate-950 pt-10 font-semibold "
        >
          <Link
            to={"/dashboard/my-profile"}
            className={`flex flex-row gap-1 px-4 py-2 w-[100%] items-center ${
              activeLink.at(-1) === "my-profile" ||
              activeLink.at(-1) === "dashboard"
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
            {user?.accountType === "Instructor" && (
              <Link
                to={"/dashboard/add-course"}
                className={`flex flex-row gap-1 px-4 py-2 w-[100%] items-center ${
                  activeLink.at(-1) === "add-course" ||
                  activeLink.at(-2) === "add-course"
                    ? "text-yellow-300 bg-yellow-900"
                    : ""
                }`}
              >
                <MdOutlineAdd />
                <p className="lg:text-base text-[14px]">Add Course</p>
              </Link>
            )}
            {user?.accountType === "Student" && (
              <Link
                to={"/dashboard/cart"}
                className={`flex flex-row gap-1 px-4 py-2 w-[100%] items-center ${
                  activeLink.at(-1) === "cart"
                    ? "text-yellow-300 bg-yellow-900"
                    : ""
                }`}
              >
                <FaCartPlus />
                <p className="lg:text-base text-[14px]">Cart</p>
              </Link>
            )}
          </div>
          <div className="border-1 border-slate-600 w-[80%] mx-auto"></div>
          <Link
            to={"/dashboard/setting"}
            className={`flex flex-row gap-1 px-4 py-2 w-[100%] items-center ${
              activeLink.at(-1) === "setting"
                ? "text-yellow-300 bg-yellow-900"
                : ""
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
      </div>
    </>
  );
}
