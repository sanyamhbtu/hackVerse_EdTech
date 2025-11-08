import React from 'react'
import about1 from "../assets/about1.jpg"
import about2 from "../assets/about2.jpg"
import about3 from "../assets/about3.jpg"
import about4 from "../assets/about4.jpg"
import HighlightText from '../component/core/Homepage/HighlightText'
import Button from '../component/core/Homepage/Button'
import ReviewFromOther from '../component/Common/ReviewFromOther'
import FormInUse from '../component/Common/FormInUse'
import Footer from '../component/Common/Footer/Footer'


function AboutUs() {
  return (
    <div className='flex flex-col w-[100%]'>
      {/* Section one  */}
      <div className='relative flex flex-col bg-slate-800 items-center'>
        <div className='w-[50%] flex flex-col gap-5 justify-center items-center mx-auto mt-15'>
          <div className='md:text-4xl text-2xl text-white font-semibold text-center'>
            Driving Innovation in Online Eduction for a <HighlightText text={"Brighter Future"}/>
          </div>
          <div className='text-base text-slate-400 w-[80%] text-center lg:mb-56 sm:mb-64 mb-90'>
            CodePlay is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
          </div>
        </div>
        <div className='flex flex-row flex-wrap md:gap-12 gap-7 w-11/12 justify-center items-center absolute top-[60%]'>
          <img src={about1} alt="image is loading" className='lg:w-[320px] lg:h-[300px] w-[250px] h-[220px]' />
          <img src={about2} alt="Image is loading" className='lg:w-[320px] lg:h-[300px] w-[250px] h-[220px]'/>
          <img src={about3} alt="Image is loading" className='lg:w-[320px] lg:h-[300px] w-[250px] h-[220px] invisible lg:visible'/>
        </div>
      </div>
      <div className='md:text-4xl text-2xl font-bold flex justify-center lg:mt-44 sm:mt-28 mt-24'>
        <div className='text-center text-white w-[70%]'>
          We are passionate about revolutionizing the way we learn. Our innovative platform 
          <span><HighlightText text={"combines technology"}/></span>, expertise, and community to create an 
          <span className='text-yellow-600'><HighlightText text={"unparalleled educational experience"}/></span>.
        </div>
      </div>

      <div className='w-[100%] border-slate-700 border-1 my-15'></div>

      {/* Section 2 */}

      <div className='flex flex-col gap-15'>
        <div className='w-[80%] flex md:flex-row flex-col justify-between items-center mx-auto gap-y-5'>
          <div className='flex flex-col md:gap-10 md:w-[50%] w-[95%] gap-y-3 '>
            <div className='md:text-4xl text-2xl text-red-700 font-semibold'>
              Our Founding Story
            </div>
            <div className='text-base text-slate-400'>
              Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
            </div>
            <div className='md:text-base  text-slate-400'>
              As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
            </div>
          </div>
          <div className='sm:w-[450px] sm:h-[300px] w-[300px] h-[200px] shadow-xl shadow-red-300 '>
            <img src={about4} alt="image loading.." className='sm:w-[450px] sm:h-[300px] w-[300px] h-[200px]' />
          </div>
        </div>
        <div className='w-[80%] flex md:flex-row flex-col justify-between items-center mx-auto gap-15 md:my-32 my-10'>
          <div className='flex flex-col md:gap-10 gap-5 md:w-[50%] w-[95%]' >
               <div className='text-4xl text-yellow-700 font-semibold'>
                  Our Founding Story
                </div>
                <div className='text-base text-slate-400'>
                  With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                </div>
          </div>
          <div className='flex flex-col md:gap-10 gap-5 md:w-[50%] w-[95%]' >
               <div className='md:text-4xl text-2xl text-sky-700 font-semibold'>
                  Our Mission
                </div>
                <div className='text-base text-slate-400'>
                  Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                </div>
          </div>
        </div>
        </div>

      {/* Section 3 */}
      <div className='w-[100%] bg-slate-800'>
        <div className='w-[90%] flex flex-row flex-wrap justify-evenly mx-auto '>
          <div className='flex flex-col md:p-10 p-3'>
            <div className='md:text-3xl text-2xl text-white font-bold'>5K</div>
            <div className='md:text-xl text-base text-slate-400'>Active Student</div>
          </div>
          <div className='flex flex-col md:p-10 p-3'>
            <div className='md:text-3xl text-2xl text-white font-bold'>10+</div>
            <div className='md:text-xl text-base text-slate-400'>Mentors</div>
          </div>
          <div className='flex flex-col md:p-10 p-3'>
            <div className='md:text-3xl text-2xl text-white font-bold'>200+</div>
            <div className='md:text-xl text-base text-slate-400'>Courses</div>
          </div>
          <div className='flex flex-col md:p-10 p-3'>
            <div className='md:text-3xl text-2xl text-white font-bold'>50+</div>
            <div className='md:text-xl text-base text-slate-400'>Awards</div>
          </div>

        </div>
      </div>
      <div className=''>
        <div className="grid lg:grid-cols-4 lg:grid-rows-2 gap-0 md:w-[85%] w-[95%] mx-auto my-15
        ">
        <div className="flex flex-col gap-5 col-span-2"> 
          <div className='md:text-4xl text-2xl w-[80%] text-white font-semibold'>World-Class Learning for Anyone, Anywhere</div>
          <div className='text-base text-slate-500 w-[70%]'>CodePlay partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.
          </div>
          <div className='w-fit'><Button active={true} >Learn More</Button></div>
        </div>
        <div className="bg-slate-700 md:p-10 p-3 flex flex-col md:gap-10 gap-2">
          <div className='text-2xl text-white w-[90%] font-semibold'>Curriculum Based on Industry Needs</div>
          <div className='text-base text-slate-400 font-bold'>Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.</div>
        </div>
        <div className="bg-slate-800 md:p-10 p-3 flex flex-col md:gap-10 gap-2">
          <div className='text-2xl text-white w-[90%] font-semibold'>Our Learning Methods</div>
          <div className='text-base text-slate-400 font-bold'>CodePlay partners with more than 275+ leading universities and companies to bring.</div>
        </div>
        <div ></div>
        <div className="bg-slate-700 md:p-10 p-3 flex flex-col md:gap-10 gap-2">
          <div className='text-2xl text-white w-[90%] font-semibold'>Certification</div>
          <div className='text-base text-slate-400 font-bold'>CodePlay partners with more than 275+ leading universities and companies to bring</div>
        </div>
        <div className="bg-slate-800 md:p-10 p-3 flex flex-col md:gap-10 gap-2">
          <div className='text-2xl text-white w-[90%] font-semibold'>Rating "Auto-grading"</div>
          <div className='text-base text-slate-400 font-bold'>CodePlay partners with more than 275+ leading universities and companies to bring.</div>
        </div>
        <div className="bg-slate-700 md:p-10 p-3 flex flex-col md:gap-10 gap-2">
          <div className='text-2xl text-white w-[90%] font-semibold'>Ready to Work</div>
          <div className='text-base text-slate-400 font-bold'>CodePlay partners with more than 275+ leading universities and companies to bring</div>
        </div>
        </div>
      </div>
      <div className='md:w-[50%] w-[100%] flex flex-col gap-5 justify-center items-center mx-auto'>
        <div className='md:text-3xl text-2xl text-white text-center font-bold'>Get In Touch</div>
        <div className='text-base text-slate-500 text-center'> We'd love to here for you, Please fill out this form. 
        </div>
        <div className='text-white'>
        <FormInUse></FormInUse>
      </div>

      </div>
      
      
      <ReviewFromOther/>
      <Footer/>
    </div>
  )
}

export default AboutUs