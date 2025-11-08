import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashBoardSideBar from "../component/Common/DashBoardSideBar";
import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { profileApi } from "../services/api";
import { setLoading } from "../slice/loaderANDlogout";
import SingleCourse from "../component/Courses/SingleCourse";
import { useNavigate } from "react-router-dom";
import { deleteCourse } from "../relatedFunction/addCourse";

const headers = {
  "Content-Type": "application/json",
};
function Courses() {
  const { user } = useSelector((state) => state.profile);
  const { isLoading } = useSelector((state) => state.loaderANDlogout);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  async function get_Course() {
    try {
      dispatch(setLoading(true));
      const response = await apiConnector(
        "GET",
        profileApi.GET_MY_COURSES,
        null,
        headers
      );
      setCourses(response.data.data);
      dispatch(setLoading(false));
    } catch (err) {
      console.log("There is some error while fetching the courses");
      toast.error(err?.response?.data?.message||"Error in fetching Course");
    }
  }
  useEffect(() => {
    get_Course();
  }, []);
  async function deletecourse(id) {
    await deleteCourse(id);
    await get_Course();
  }

  return (
    <div>
      <div className="flex flex-row gap-0 bg-slate-900 text-white min-h-screen pb-52">
        <DashBoardSideBar />
        {isLoading ? (
          <div className="loader p-8 mx-auto h-fit lg:mt-[20%] mt-[10%]"></div>
        ) : (
          <div className=" flex flex-col md:gap-10 gap-5 md:w-[75%] w-[90%]  text-white relative md:left-[15%] lg:top-25 md:top-20 top-10 md:ml-20">
            <div className="md:text-4xl text-2xl text-white font-semibold flex flex-row justify-between px-5">
              <p>My Courses</p>
              {user?.accountType === "Instructor" && (
                <button
                  className="bg-yellow-300 text-base text-black font-semibold md:px-4 px-1.5 py-1 rounded-lg hover:cursor-pointer"
                  onClick={() => {
                    navigate("/dashboard/add-course");
                  }}
                >
                  Add Course +
                </button>
              )}
            </div>
            {courses.length === 0 ? (
              <div className="text-2xl text-slate-300 font-semibold mx-auto">
                There is no Course for this account yet
              </div>
            ) : (
              <div className="flex flex-col gap-5 w-[100%] px-5 font-semibold">
                <div className="flex flex-row justify-between">
                  <div className="md:w-[70%] w-[65%] text-xl">Courses</div>
                  <div className="sm:flex sm:flex-row hidden lg:w-[30%] md:w-[40%] w-[35%] justify-between md:text-base text-[14px]">
                    <p className="m-2">DURATION</p>
                    <p className="m-2">PRICE</p>
                    <p className="m-2"> ACTIONS</p>
                  </div>
                </div>
                {courses.map((obj, index) => (
                  <SingleCourse
                    obj={obj}
                    key={index}
                    deletecourse={deletecourse}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
