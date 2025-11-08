import React from 'react'
import HighlightText from './HighlightText'
import img1 from '../../../assets/leraningLanguagesec/img1.jpg'
import img2 from '../../../assets/leraningLanguagesec/img2.jpg'
import img3 from '../../../assets/leraningLanguagesec/img3.jpg'
import Button from './Button'

function LearningLanguageSection() {
  return (
    <div>
      <div className='flex flex-col gap-5'>
        <div className='md:text-4xl text-3xl font-semibold text-center mt-10'>
          Your Swiss Knife for 
          <HighlightText text={"learning any language"}></HighlightText>
        </div>
        <div className='text-center text-black mx-auto w-[40%] font-bold'>
          Using spin making learning multiple languages easy, with 20+ realistic voice-over , progress tracking , custom schedule and more.
        </div>

        <div className='relative flex md:flex-row flex-col items-center justify-center my-16 md:gap-72 gap-y-85'>
          <img src={img1} alt="img.." className='md:w-[20%] md:h-[300px] h-[200px] absolute rotate-[-13deg] shadow-[12px_12px_0px_rgba(107,114,128,0.5)]' />
          <img src={img2} alt="img.." className='md:w-[20%] md:h-[300px] h-[200px] rotate-[22deg] shadow-[12px_12px_0px_rgba(107,114,128,0.5)]' />
          <img src={img3} alt="img.." className='md:w-[20%] md:h-[300px] h-[200px] rotate-[12deg] shadow-[12px_12px_0px_rgba(100,110,125,0.5)]' />
        </div>
        <div className='w-fit mx-auto mb-12'>
          <Button active={true} linkto={"signup"}>Learn More</Button>
        </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection