import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {fetchSubSection, fetchSubSectionDetail } from "../../relatedFunction/addCourse";
import { RxCross1 } from "react-icons/rx";

function LectureUpdateForm({obj,canceltheUpdate}) {
  const [videoFile,setVideoFile]=useState(true);
  const [videoUrl,setVideoUrl]=useState(null);
  // const formRef=useRef({
  //                   lectureTitle:"hii title",
  //                   lectureDesc:" hi desc "
  //                   })
  function handleVideoUrlOnchange(e){
    setVideoUrl(e.target.files[0]);
    setVideoFile(true);
  }
  const [form,setform]=useState({
    lectureTitle:"",
    lectureDesc:""
})
  const isLocalFile = videoUrl instanceof File || videoUrl instanceof Blob;
  function handleOnChange(e){
    setform((prev)=>{
      const {name,value}=e.target;
      return ({...prev,[name]:value})
    })
  }
  
  async function handleFormSubmit(e){
    e.preventDefault();
    canceltheUpdate(false);
    toast.success("No changes made")
  //   const formData=formRef.current;
  //   formData.videoUrl=videoUrl;
  //   formData.sectionId=obj._id;
  //   const toastId= toast.loading("Lecture Uploading..")
  //   await addLecture(formData);
  //   toast.success("Lecture Uploaded",{id:toastId});
  //   setLectureFrom(false);
  //   const result=await fetchSubSection(obj._id);
  //   setSubSection(result);

  }

  useEffect(()=>{
      const run =async()=>{
        const data = await fetchSubSectionDetail(obj._id);
        // console.log("the data is ",data)
        setVideoUrl(data.videoUrl);
        setform({
          lectureTitle: data.title,
          lectureDesc: data.description
        });
      }
      if(obj){
        run();
      }
      // run();
    },[])

  return (
    <div
      className={`fixed inset-0 z-[1000] !mt-0 h-screen w-screen place-items-center overflow-auto bg-transparent backdrop-blur-sm`}
    >
      <div
        className="w-full max-w-[50%] rounded-lg shadow-lg relative mx-auto mt-[5%]
            flex flex-col gap-0 bg-slate-950 text-slate-50"
      >
        <div className="flex p-5 flex-row justify-between p- bg-slate-800 rounded-t-lg">
          <h1 className="font-semibold text-2xl">Review Lecture</h1>
          <h2>
            <RxCross1 className="bg-slate-800 text-white w-fit h-fit hover:cursor-pointer text-xl font-bold" 
            onClick={()=>{
              canceltheUpdate(false);
            }}
            />
          </h2>
        </div>
        <div className="p-5">
          <form className="flex flex-col gap-5" onSubmit={handleFormSubmit} >
            <div className="min-h-[250px] bg-slate-800 rounded-lg">
              {videoFile ? (
                <div>
                  <video src={isLocalFile ? URL.createObjectURL(videoUrl) : videoUrl}
                        className="object-fill"
                        loop
                        autoPlay
                        muted
                        ></video>
                  {/* <img
                  
                    src={isLocalFile ? URL.createObjectURL(videoUrl) : videoUrl}
                    alt="Image is loading..."
                    className="object-fill"
                  /> */}
                </div>
              ) : (
                <div className="flex flex-col gap-10 items-center justify-center p-5 min-h-76">
                  <div className="flex flex-col gap-1">
                    <input
                      type="file"
                      className="text-yellow-300 cursor-pointer"
                      name="videoUrl"
                      // value="videoUrl"
                      onChange={handleVideoUrlOnchange}
                    />
                    <p>click to browse file</p>
                  </div>
                  <div>
                    <ul className=" flex flex-row list-disc gap-10">
                      <li>Aspect Ratio 16:9</li>
                      <li>Recommended size 1024x576</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <label htmlFor="lectureTitle">
              Lecture Title
              <input
                type="text"
                className="bg-slate-800 px-3 py-4 rounded-lg mt-2 w-[100%] border-b-2 border-slate-600
                      placeholder-slate-500"
                placeholder="Enter lecture Title"
                name="lectureTitle"
                value={form.lectureTitle}
                onChange={handleOnChange}
                // ref={(title)=>(formRef.current.lectureTitle=title)}
                // value={formRef.current.lectureTitle}
                // onChange={(e) => {
                //   formRef.current.lectureTitle = e.target.value;
                // }}
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
                name="lectureDesc"
                value={form.lectureDesc}
                onChange={handleOnChange}
                // ref={(desc)=>(formRef.current.lectureDesc=desc)}
                // value={formRef.current.lectureDesc}
                // onChange={(e) => {
                //   formRef.current.lectureDesc = e.target.value;
                // }}
              />
            </label>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-300 text-black font-bold w-fit rounded-lg ml-[91%] hover:cursor-pointer"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LectureUpdateForm;
