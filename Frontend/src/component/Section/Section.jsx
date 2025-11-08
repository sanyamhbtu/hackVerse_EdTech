import React, { useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { ImParagraphJustify } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import SubSection from "../Common/SubSection/SubSection";
import { RxCross1 } from "react-icons/rx";
import { addLecture, deleteSubSection, fetchSubSection } from "../../relatedFunction/addCourse";
import toast from "react-hot-toast";


function Section({ obj, handleDeleteSec }) {
  const [isToggle, setToggle] = useState(false);
  const [lectureForm, setLectureFrom] = useState(false);
  const [videoFile,setVideoFile]=useState(false);

  const [subsection,setSubSection]=useState([]);
  const [videoUrl,setVideoUrl]=useState(null);
  const formRef=useRef({
    lectureTitle:"",
    lectureDesc:""
  })

  function handleVideoUrlOnchange(e){
    setVideoUrl(e.target.files[0]);
    setVideoFile(true);
    // console.log(e.target)
    // console.log(videoUrl);
  }
  async function handleFormSubmit(e){
    e.preventDefault();
    const formData=formRef.current;
    formData.videoUrl=videoUrl;
    formData.sectionId=obj._id;
    await addLecture(formData);
    setLectureFrom(false);
    const result=await fetchSubSection(obj._id);
    setSubSection(result);
    e.target.reset();

  }
  async function handleDeleteSubSec(id){
    await deleteSubSection(obj._id,id);
    const result=await fetchSubSection(obj._id);
    setSubSection(result);
  }

  useEffect(()=>{
    const run =async()=>{
      const result = await fetchSubSection(obj._id);
      setSubSection(result);
    }
    run();
  },[])

  return (
    <div>
      <div
        className={`fixed inset-0 z-[1000] !mt-0 h-screen w-screen place-items-center overflow-auto bg-transparent backdrop-blur-sm ${
          lectureForm ? "" : "hidden"
        }
        `}
      >
        <div className="w-full lg:max-w-[50%] sm:max-w-[75%] max-w-[90%] rounded-lg shadow-lg relative mx-auto mt-[5%]
        flex flex-col gap-0 bg-slate-950">
          <div className="flex p-5 flex-row justify-between p- bg-slate-800 rounded-t-lg">
            <h1 className="font-semibold text-2xl">Adding Lecture</h1>
            <h2
            onClick={() => {
              setLectureFrom(false);
            }}
          >
            <RxCross1 className="bg-slate-800 text-white w-fit h-fit hover:cursor-pointer text-xl font-bold"/>
          </h2>
          </div>   
          <div className="p-5">
            <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
              <div className="min-h-[250px] bg-slate-800 rounded-lg">
                {
                  videoFile?(
                  <div>
                    <video src={`${URL.createObjectURL(videoUrl)}`}
                    className="object-fill"
                    loop
                    autoPlay
                    muted
                    ></video>
                    {/* <img src={`${URL.createObjectURL(videoUrl)}`} alt="Image is loading..." 
                    className="object-fill"/> */}
                  </div>):
                  (
                    <div className="flex flex-col gap-10 items-center justify-center p-5 min-h-76">
                      <div className="flex flex-col gap-1">
                        <input type="file" className="text-yellow-300 cursor-pointer"
                        name="videoUrl"
                        // value="videoUrl"
                        onChange={handleVideoUrlOnchange}
                        />
                        <p>click to browse file</p>
                      </div>
                      <div>
                        <ul className=" flex flex-row list-disc gap-10" >
                          <li>Aspect Ratio 16:9</li>
                          <li>Recommended size 1024x576</li>
                        </ul>
                      </div>
                    </div>
                  )
                }

              </div>
              <label htmlFor="lectureTitle">
                Lecture Title
                <input type="text" 
                className="bg-slate-800 px-3 py-4 rounded-lg mt-2 w-[100%] border-b-2 border-slate-600
                  placeholder-slate-500"
                placeholder="Enter lecture Title"
                // name="lectureTitle"
                // value={form.lectureTitle}
                // onChange={handleOnChange}
                onChange={(e)=>{
                  formRef.current.lectureTitle=e.target.value
                }}
                />
              </label>
              <label htmlFor="lectureDesc">
                Lecture Description
                <textarea 
                id="lectureDesc"
                className="bg-slate-800 px-3 py-4 rounded-lg mt-2 w-[100%] border-b-2 border-slate-600
                placeholder-slate-500"
                placeholder="Enter Lecture Description"
                rows={4}
                // name="lectureDesc" 
                // value={form.lectureDesc}
                // onChange={handleOnChange}
                onChange={(e)=>{
                  formRef.current.lectureDesc=e.target.value
                }}
                />
              </label>
              <button type="submit"
              className="px-4 py-2 bg-yellow-300 text-black font-bold w-fit rounded-lg ml-[91%] hover:cursor-pointer"
              >Save</button>
            </form>
          </div>

          
        </div>
      </div>

{/* This is the part of the in which subsection is shown and when click on the add lecture then lecture form open  */}
      <div>
        <div className="flex flex-col gap-1 bg-slate-800 text-slate-400 w-[100%] mx-auto rounded-sm px-5 py-5">
          <div
            className={`flex flex-row px-3 justify-between items-center  hover:cursor-pointer`}
            onClick={() => {
              setToggle(!isToggle);
            }}
          >
            <div className="flex flex-row gap-2">
              <div className="flex flex-row gap-1 items-center">
                <FaCaretDown />
                <ImParagraphJustify />
              </div>
              <div className="text-base text-slate-400">{obj.sectionName}</div>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <FaPen />
              <MdDelete
                className="hover:cursor-pointer"
                onClick={() => {
                  handleDeleteSec(obj._id);
                }}
              />
              <div className="border-1 border-slate-400 w-[2px] h-8"></div>
              <FaCaretDown />
            </div>
          </div>
          <div className="border-1 border-slate-500 "></div>
          <div className={`${isToggle ? "hidden" : ""}`}>
            {
              // Here we need to render the subsection based on the subsection array of the state vgalue 
              subsection?.length > 0 &&  subsection.map((obj,index)=>(
                <SubSection obj={obj} 
                handleDeleteSubSec={handleDeleteSubSec}
                key={index}/>
              ))
            }
          </div>
          <div
            className={`flex flex-row gap-1 items-center hover:cursor-pointer w-fit ${
              isToggle ? "hidden" : ""
            } pl-5 `}
            onClick={() => {
              setLectureFrom(true);
            }}
          >
            <p className="text-2xl text-yellow-300 font-bold">+</p>
            <p className="text-base text-yellow-300 font-semibold">Add Lecture</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section;
