import React, { useEffect, useRef, useState } from "react";
import DashBoardSideBar from "../component/Common/DashBoardSideBar";
import { categroyApi, sectionApi } from "../services/api";
import { apiConnector } from "../services/apiConnector";
import toast from "react-hot-toast";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../slice/loaderANDlogout";
import Section from "../component/Section/Section";
import { createCourse,deleteSec,fetchDraftCousr,fetchSection, makeCoursePublish, updateCourse } from "../relatedFunction/addCourse";
import { useLocation, useNavigate } from "react-router-dom";

const headers = {
  "Content-Type": "application/json",
};

function AddCourse() {
  const [level, setLevel] = useState("course-information");
  const location=useLocation();
  const path=location.pathname.split('/');
  const { isLoading } = useSelector((state) => state.loaderANDlogout);
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);
  const [courseInfo,setCourseInfo]=useState(null);
  const [sections,setSections]=useState([]);
  const [file, setFile] = useState(null);
  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
    whatYouWillLearn: "",
    price: "",
    category: "",
  });

  function handleOnfileChange(e) {
    setFile(e.target.files[0]);
  }
  // const formRef=useRef({
  //   courseName: "",
  //   courseDescription: "",
  //   whatYouWillLearn: "",
  //   price: "",
  //   category: "",
  // })
  
  async function fetchCategory() {
    try {
      const result = await apiConnector("GET", categroyApi.CATEGORY_API);
      setCategory(result.data.body);
    } catch (err) {
      console.log("There is some error in fetching category");
      toast.error("Some error occured during fetching Category");
    }
  }
  
  useEffect(() => {
    fetchCategory();
    if(path.at(-1) !=="add-course"){
      const fetchdraft=async ()=>{
        const data = await fetchDraftCousr(path.at(-1));
        // console.log(data[0]);
        setFormData(data[0]);
        setFile(data[0].thumbnail)
        setCourseInfo(data[0]);
      }
      fetchdraft()
    }
  }, []);

  const isLocalFile = file instanceof File || file instanceof Blob;

  useEffect(()=>{
    const run=async ()=>{
    const secs=await fetchSection(courseInfo)
    setSections(secs);
    }
    run();
    
    
  },[level])

  function handleOnChange(e) {
    setFormData((prev) => {
      const { name, value } = e.target;
      return { ...prev, [name]: value };
    });
  }

  async function handleONsubmitCourseInfo(e) {
    e.preventDefault();
    dispatch(setLoading(true));
    if(path.at(-1) !=="add-course"){
      // console.log(formData);
      formData.courseId=courseInfo._id;
      updateCourse(formData);
      dispatch(setLoading(false));
      setLevel("course-builder");
      return ;
    }
    formData["thumbnailImg"] = file; //here this file is stored into other state variable of name file 
    const response= await createCourse(formData);
    if(!response){
      toast.error("Some error occured in creating course")
      dispatch(setLoading(false));
      return ;
    }
    setCourseInfo(response.data.body);
    dispatch(setLoading(false));
    setLevel("course-builder");
    e.target.reset();
  }
  const [sectionForm,setSectionForm]=useState({
    sectionName:"",
  })
  const sectionRef=useRef({
    sectionName:""
  })
  function onChangeSection(e){
    setSectionForm((prev)=>{
      const {name,value}=e.target;
      return {...prev,[name]:value}
    })
  }
  async function onSubmitSection(e){
    e.preventDefault();
    console.log(sectionRef.current.sectionName)
    try{
      let obj={
        "courseId":courseInfo._id,
        "sectionName":sectionRef.current.sectionName
      }
      sectionForm["courseId"]=courseInfo._id;
      // const response=await apiConnector("POST",sectionApi.ADD_SECTION,JSON.stringify(sectionForm),headers);
      const response=await apiConnector("POST",sectionApi.ADD_SECTION,JSON.stringify(obj),headers);
      toast.success("Section Created Successfully");
      const data =await fetchSection(courseInfo);
      // console.log("data ",data)
      setSections(data);
      sectionRef.current.value=""
    }
    catch(err){
      console.log("There is some error",err.message);
      toast.error("Section not created");
    }
    e.target.reset();
  }
 
  async function handleDeleteSec(id){
    const courseid=courseInfo._id;
    await deleteSec(id,courseid);
    const data =await fetchSection(courseInfo);
    setSections(data);
  }
  async function handlePubllishbtn(id){
    await makeCoursePublish(id);
    navigate("/dashboard/courses");
  }
  

  return (
    <div className="flex flex-row gap-0 bg-slate-900 text-white relative min-h-screen pb-52 ">
      <DashBoardSideBar></DashBoardSideBar>
      {isLoading ? (
       <div className="loader flex justify-center items-center p-8 mx-auto mt-56 h-fit"></div>
      ) : (
        <div className="md:w-[80%] w-[90%] bg-slate-90 mx-auto relative min-h-screen  md:top-12 top-8 flex flex-col items-center">
          <div className="flex flex-col gap-10 lg:w-[50%] md:w-[85%] w-[100%] bg-slate-950 relative lg:left-[-10%] lg:top-[5%] py-5 rounded-xl md:left-[10%] md:top-[3%]">
            <div className="text-3xl px-4 font-bold">Add Course</div>
            <div className="relative">
              <div className="flex flex-row gap-1 justify-center">
                <div className={`relative border-2 border-dashed  top-5 w-[45%] ${(level==='course-builder' ||level==='course-publish') ? ("border-yellow-300"):("border-gray-700")}`}></div>
                <div className={`relative border-2 border-dashed  top-5 w-[45%] ${(level==='course-publish') ? ("border-yellow-300"):("border-gray-700")}`}></div>
              </div>
              {/* <div className="relative border-2 border-dashed border-gray-700 top-5 w-[95%] mx-auto"></div> */}
              <div className="relative flex flex-row justify-between">
                <div className={`flex flex-col gap-1 px-3 `}>
                  <button className={`font-bold rounded-full px-2 bg-slate-900 w-[40px] h-[40px] ${(level==='course-builder' || level==='course-information' || level==='course-publish') ? ("text-yellow-300 bg-yellow-900"):("")}`}>
                    1
                  </button>
                  <p>Course Information</p>
                </div>
                <div className={`flex flex-col gap-2 `}>
                  <button className={`font-bold rounded-full p-2 bg-slate-900 w-[40px] h-[40px] ${(level==='course-builder' || level==='course-publish') ? ("text-yellow-300 bg-yellow-900"):("")}`}>
                    2
                  </button>
                  <p>Course Builder</p>
                </div>
                <div className={`flex flex-col gap-2 `}>
                  <button className={`font-bold rounded-full p-2 bg-slate-900 w-[40px] h-[40px] ${(level==='course-publish')? ("text-yellow-300 bg-yellow-900"):("")}`}>
                    3
                  </button>
                  <p>Publish</p>
                </div>
              </div>
            </div>
            {level === "course-information" && (
              <div className="p-5">
                <form
                  className="flex flex-col md:gap-10 gap-7 "
                  onSubmit={handleONsubmitCourseInfo}
                >
                  <label htmlFor="courseName"
                  >
                    Course Title *
                    <input
                      type="text"
                      name="courseName"
                      placeholder="Enter course title "
                      value={formData.courseName}
                      onChange={handleOnChange}
                      className="bg-slate-800 px-3 py-4 rounded-lg mt-2 w-[100%] border-b-2 border-slate-600
                      placeholder-slate-500"
                    />
                  </label>
                  <label htmlFor="courseDescription">
                    Course Short Description *
                    <textarea
                      type="text"
                      rows={6}
                      name="courseDescription"
                      placeholder="Enter Description"
                      value={formData.courseDescription}
                      onChange={handleOnChange}
                      className="bg-slate-800 px-3 py-4 rounded-lg mt-2 w-[100%] border-b-2 border-slate-600
                      placeholder-slate-500"
                    />
                  </label>
                  <label htmlFor="whatYouWillLearn">
                    Benefits of the course *
                    <textarea
                      type="text"
                      rows={5}
                      name="whatYouWillLearn"
                      placeholder="Benefits of the Course"
                      onChange={handleOnChange}
                      value={formData.whatYouWillLearn}
                      className="bg-slate-800 px-3 py-4 rounded-lg mt-2 w-[100%] border-b-2 border-slate-600
                      placeholder-slate-500"
                    />
                  </label>
                  <label htmlFor="price">
                    Course Price *
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleOnChange}
                      placeholder="Enter price "
                      className="bg-slate-800 px-3 py-4 rounded-lg mt-2 w-[100%] border-b-2 border-slate-600
                      placeholder-slate-500"
                    />
                  </label>
                  <label htmlFor="category">
                    Course Category *
                    <select
                      name="category"
                      id="category"
                      value={formData.category}
                      onChange={handleOnChange}
                      className="bg-slate-800 px-3 py-4 rounded-lg mt-2 w-[100%] border-b-2 border-slate-600
                      placeholder-slate-500 pr-2"
                    >
                      {category.map((valueis, index) => (
                        <option value={valueis._id} key={index}>
                          {valueis.categoryName}
                        </option>
                      ))}
                    </select>
                  </label>
                  {
                    !file && (
                      <label htmlFor="thumbnailImg">
                        Course Thumbnail *
                        <div className="flex flex-col w-[100%] h-48 bg-slate-800 items-center mt-2 rounded-lg justify-center">
                          Select Image of 4 : 6
                          <input
                            type="file"
                            name="thumbnailImg"
                            // value={file}
                            onChange={handleOnfileChange}
                            className="bg-yellow-400 px-1 py-1 rounded-lg mt-2 border-b-2 border-slate-600
                            hover:cursor-pointer w-[30%] text-black font-semibold"
                          />
                        </div>
                      </label>
                    )
                  }
                  {
                    file && (
                      <img src={isLocalFile ? URL.createObjectURL(file) : file} alt="Image is loading..." 
                    className="object-fill rounded-lg"/>
                    )
                  }
                  <button
                    type="submit"
                    className="bg-yellow-300 text-black px-4 py-2 rounded-sm w-fit ml-[85%] font-semibold hover:cursor-pointer"
                    // onClick={handleClickCouseInfo}
                  >
                    Next
                  </button>
                </form>
              </div>
            )}
            {level === "course-builder" && (
              <div className="flex flex-col gap-10 w-[90%] mx-auto pb-10">
                <div className="text-2xl text-white font-bold ">
                  Course Builder
                </div>
                <form className="flex flex-col gap-3"
                onSubmit={onSubmitSection}>
                  <label htmlFor="sectionName">
                    Section Name
                    <input
                      type="text"
                      // name="sectionName"
                      // value={sectionForm.sectionName}
                      // onChange={onChangeSection}
                      onChange={(e)=>{
                        sectionRef.current.sectionName=e.target.value;
                      }}
                      ref={sectionRef}
                      placeholder="Add a section to build your course "
                      className="bg-slate-800 px-3 py-3 rounded-lg mt-2 w-[100%] border-b-2 border-slate-600
                placeholder-slate-500"
                    />
                  </label>
                  <button 
                  type="submit"
                  className="text-yellow-300 font-semibold border-1 border-yellow-300 rounded-lg px-2 py-2.5 bg-slate-950 w-fit hover:cursor-pointer">
                    Create Section +
                  </button>
                </form>
                <div className="flex flex-row gap-3 w-[100%] justify-end">
                  <button className="text-black font-semibold  rounded-lg px-5 py-2.5 bg-slate-600 w-fit hover:cursor-pointer"
                  onClick={()=>{
                    setLevel("course-information")
                  }}>
                    Back
                  </button>
                  <button className="text-black font-semibold rounded-lg px-5 py-2.5 bg-yellow-300 w-fit flex flex-row gap-1 items-center justify-center hover:cursor-pointer"
                  onClick={()=>{
                      setLevel("course-publish")
                    }}
                  >
                    Next <BiArrowFromLeft />
                  </button>
                </div>
                <div className="flex flex-col gap-2 bg-slate-800 rounded-xl">
                  {
                   (sections?.length > 0 )&& (
                      sections?.map((obj,index)=>{
                        return <Section obj={obj} key={index} handleDeleteSec={handleDeleteSec}></Section>
                      })
                    )
                  }
                </div>
              </div>
            )}
            {/* Here is the publish section and we create this  */}
            {
              level === "course-publish" && (
                <div className="flex flex-col gap-10 w-[90%] mx-auto p-10 bg-slate-900 rounded-sm">
                  <div className="text-2xl text-slate-50 font-semibold">Publish Setting</div>
                  <div className="flex flex-row gap-5 w-[60%] text-black font-bold text-base">
                    <button className="text-black font-semibold rounded-lg px-5 py-2.5 bg-slate-600 w-fit flex flex-row gap-1 items-center justify-center hover:cursor-pointer"
                    onClick={()=>{
                      setLevel("course-builder")
                    }}
                    >Back</button>
                    <button className="text-black font-semibold rounded-lg px-5 py-2.5 bg-yellow-300 w-fit flex flex-row gap-1 items-center justify-center hover:cursor-pointer"
                    onClick={()=>{
                      handlePubllishbtn(courseInfo._id);
                      // console.log(courseInfo._id)
                    }}
                    >Publish</button>
                  </div>
                </div>
              )
            }
          </div>
          <div className="fixed hidden w-[25%] bg-slate-950 lg:flex flex-col gap-3 text-white p-5 right-[10%] top-[25%] rounded-2xl">
            <p className="text-xl">⚡ Course Upload Tips</p>
            <ul className="p-3 list-disc">
              <li className="py-1.5 text-[14px]">
                Set the Course Price option or make it free.
              </li>
              <li className="py-1.5 text-[14px]">
                Standard size for the course thumbnail is 1024x576.
              </li>
              <li className="py-1.5 text-[14px]">
                Video section controls the course overview video.
              </li>
              <li className="py-1.5 text-[14px]">
                Course Builder is where you create & organize a course.
              </li>
              <li className="py-1.5 text-[14px]">
                Add Topics in the Course Builder section to create lessons,
                quizzes, and assignments.
              </li>
              <li className="py-1.5 text-[14px]">
                Information from the Additional Data section shows up on the
                course single page.
              </li>
              <li className="py-1.5 text-[14px]">
                Make Announcements to notify any important
              </li>
              <li className="py-1.5 text-[14px]">
                Notes to all enrolled students at once.
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCourse;
