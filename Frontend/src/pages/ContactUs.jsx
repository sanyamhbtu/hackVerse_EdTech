import React, { useState } from 'react'
import ReviewFromOther from '../component/Common/ReviewFromOther';
import FormInUse from '../component/Common/FormInUse';
import Footer from '../component/Common/Footer/Footer';

function ContactUs() {

  return (
    <div className='flex flex-col gap-8 w-[100%]'>
    <div className='text-white flex md:flex-row flex-col gap-10 justify-center mt-13 items-center md:items-start'>
      <div className='flex flex-col gap-8 md:w-[30%] w-[80%] py-7 pl-6 h-fit bg-slate-800
      rounded-lg
      '>
        <div>
        <div className='text-2xl font-bold'>Chat on us</div>
        <div className='w-[60%] pr-4 text-base text-slate-200'>Our friendly team is here to help info@codeplay.com</div>
        </div>
        <div>
        <div className='text-2xl font-bold'>Visit us</div>
        <div className='w-[80%] pr-4 text-base text-slate-200'>Come and say hello at our office HQ. Codeplay office ,Bhopal-462022</div>
        </div>
        <div>
        <div className='text-2xl font-bold'>Call us</div>
        <div className='w-[50%] pr-4 text-base text-slate-200'>Mon-Fri from 8am to 5pm +123 456 7890</div>
        </div>
      </div>

      <div className='flex flex-col gap-6 gap-y-8 justify-center md:w-[50%] w-[80%] border-1 border-slate-500 rounded-xl md:p-14 px-1 py-3'>
        <div className='flex flex-col gap-2'>
          <div className='md:text-3xl text-2xl font-bold md:w-[70%] w-[80%] text-center md:text-start'>Got a Idea ? We've got the skills Let's team up</div>
          <div className='text-base text-slate-400'>Tell us more about yourself and what you're got in mind</div>
        </div>
        <div>
          <FormInUse></FormInUse>
        </div>
      </div>
    </div>

    <ReviewFromOther></ReviewFromOther>
    <Footer/>
    </div>
  )
}

export default ContactUs