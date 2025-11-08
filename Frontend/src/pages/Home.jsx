import { FaArrowRight, FaCircleArrowRight } from "react-icons/fa6";
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HighlightText from "../component/core/Homepage/HighlightText";
import Button from "../component/core/Homepage/Button";
import CodeBlocks from "../component/core/Homepage/CodeBlocks";
import TimelineSection from "../component/core/Homepage/TimelineSection";
import LearningLanguageSection from "../component/core/Homepage/LearningLanguageSection";
import section3img from '../assets/sectin3img.jpg'
import Review from "../component/core/Homepage/Review";
import ExploreMore from "../component/core/Homepage/ExploreMore";
import Footer from "../component/Common/Footer/Footer"
import ReviewFromOther from "../component/Common/ReviewFromOther";

function Home() {

  const navigate=useNavigate();
  

  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto flex flex-col text-white items-center ">
        <Link to={"/signup"}>
        <div className="mx-auto rounded-full bg-slate-700 font-bold text-gray-300 transition-all duration-200 hover:scale-95 my-2 z-0">
          <div className="mt-8 flex flex-row items-center justify-center px-2" >
            <p className="m-1">Become an Instructor</p>
            <FaCircleArrowRight/>
          </div>
        </div>
        </Link>
        <div className="font-bold text-3xl lg:flex lg:flex-row flex-col justify-center mx-2 text-center">
          Empower Your Future with 
          <HighlightText text={"Coding Skills"}/>
        </div>

        <div className="w-[60%] text-center text-lg font-black text-gray-500">
           With our coding course, you can learn at your own pace, from anywhere in the world,and get access to a wealth resources, including hands on projects ,quizzes and personalized feedback from Instructor
        </div>

        <div className="flex flex-row gap-7 my-8">
        <Button active={true} linkto={"/signup"}>Learn More</Button>
         <Button active={false} linkto={"/signup"}>Book a demo</Button>
        </div> 

        <div className="shadow-blue-200 lg:w-[70%] w-[80%]  lg:h-[450px] h-auto  m-4 flex justify-center shadow-[12px_12px_5px_rgba(0,0,0,0.2)]">
          <video
          loop
          autoPlay
          muted
          src="Banner.mp4" className="w-full h-full object-cover"></video>
        </div>

        {/* code section 1 */}

        <div>
          <CodeBlocks 
             position={"lg:flex-row "}
             heading={
              <div>
                Unlock Your <HighlightText text={"coding potential"}/>
                with our onlinr courses
              </div>
             }
             subheading={
              "Our courses are designed and taught by industry experts who have years of experience in come with them"
             }
             btn1={
              { text:"try it youself",
                linkto:"/signup",
                active:true
              }
              }
              btn2={
                {
                  text:"Learn More",
                  linkto:"/login",
                  active:false
                }
              }
              codeblock={
                         `<!DOCTYPE html>\n\
                          <html lang="en">\n\
                          <head>\n\
                            <meta charset="UTF-8">\n\
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">\n\
                            <title>My Page</title>\n\
                          </head>\n\
                          <body>\n\
                            <h1>Hello, World!</h1>\n\
                            <p>This is a sample page.</p>\n\
                          </body>\n\
                          </html>`
                       }
              codecolor={`text-blue-300`}
          ></CodeBlocks>
        </div>

        {/* code section 2 */}
        <div>
          <CodeBlocks 
             position={"lg:flex-row-reverse"}
             heading={
              <div>
                Unlock Your <HighlightText text={"coding potential"}/>
                with our onlinr courses
              </div>
             }
             subheading={
              "Our courses are designed and taught by industry experts who have years of experience in come with them"
             }
             btn1={
              { text:"try it youself",
                linkto:"/signup",
                active:true
              }
              }
              btn2={
                {
                  text:"Learn More",
                  linkto:"/login",
                  active:false
                }
              }
              codeblock={
                         `<!DOCTYPE html>\n\
                          <html lang="en">\n\
                          <head>\n\
                            <meta charset="UTF-8">\n\
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">\n\
                            <title>My Page</title>\n\
                          </head>\n\
                          <body>\n\
                            <h1>Hello, World!</h1>\n\
                            <p>This is a sample page.</p>\n\
                          </body>\n\
                          </html>`
                       }
              codecolor={`text-blue-300`}
          ></CodeBlocks>
        </div>
        <ExploreMore/>
      
      </div>

      {/* Section 2 */}

      <div className="bg-white text-black">
         <div className="homepage_bg h-[333px]">
          <div className="w-11/12 max-w-maxContent flex justify-center items-center gap-5 mx-auto">
          <div className="flex md:flex-row flex-col md:gap-7 gap-y-3 text-white my-36 ">
            <Button active={true} linkto={"signup"}>
              <div className="flex items-center gap-3">
                Explore full catalog
                <FaArrowRight></FaArrowRight>
              </div>
            </Button>
            <Button active={false} linkto={"/signup"}>
            <div>Learn More</div></Button>
          </div>
          </div>
         </div>

         <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-center">
          <div className="flex md:flex-row flex-col gap-5 md:mt-24 mt-10 items-center">
            <div className="text-4xl font-semibold md:w-[45%] w-[65%]">
              Get the Skills you need for a <HighlightText text={"Job that is in demand"} /> 
            </div>
            <div className="flex flex-col md:w-[45%] w-[65%] items-start">
              <div className="text-[16px] font-bold mb-5">
               The modern StudyNotion is the dictates its own terms, Today, to be a competitive specialist requires more than professional skills.
              </div>
                <Button active={true} linkto={"signup"}>
                Learn More
              </Button>
            </div>
          </div>
         </div>

         <TimelineSection/>
         <LearningLanguageSection />

      </div>

      {/* Section 3 */}
      <div className="w-11/12 md:my-20 my-20">
       <div className="flex md:flex-row flex-col md:gap-12 gap-y-5 mx-auto w-[90%]  ">
        <div className="md:w-[50%] w-[100%] flex justify-end">
          <img src={section3img} alt="" 
          className="w-[90%] h-fit object-cover shadow-[-14px_-15px_0px_rgba(225,225,225)]"/>
        </div>
        <div className="md:w-[40%] w-[100%] flex flex-col gap-4 items-start justify-center">
          <div className="md:text-4xl text-2xl font-bold text-white md:w-[70%] w-[100%]"
          >Become an <HighlightText text={"Instructor"}/></div>
          <div className="text-base text-slate-500">
            Insrtuction from around the world tech million of students on StudyNotion. We provide skill and tool to teach what you love.
          </div>
          
            <Button active={true} linkto={"/signup"}>
            <div className="flex flex-row items-center justify-center">
            <span className="mx-1">Start teching today </span>
            <FaArrowRight/>
            </div>
            </Button>
          
        </div>
       </div>
      </div>
      {/* This below div is for the lining */}
      <div className="w-[100%] border-sky-400 border-2 "></div>
      <ReviewFromOther></ReviewFromOther>

      <Footer></Footer>
    </div>
  )
}

export default Home
