import React from 'react'
import Button from './Button'
import HighlightText from './HighlightText'
import { FaArrowRight } from 'react-icons/fa6'
import {TypeAnimation} from 'react-type-animation'

function CodeBlocks({position,heading,subheading,btn1,btn2,codeblock,codecolor}) {
  return (
    <div className={`flex ${position} my-10 justify-between gap-8 lg:min-w-[1000px] lg:max-w-[1000px] flex-col items-center`}>
      <div className='md:w-[50%] w-[80%] min-w-0 flex flex-col gap-8 '>
        {heading}
        <div className='text-slate-500 font-bold'>{subheading}</div>
        <div className='flex md:flex-row flex-col md:gap-7 gap-y-3 m-2'>
          
          <Button active={btn1.active} linkto={btn1.linkto}>
            <div className='flex flex-row gap-2 items-center'>
              {btn1.text}
              <FaArrowRight/>
            </div>
          </Button>
          <Button active={btn2.active} linkto={btn2.linkto}>
            <div className='flex flex-row gap-2 items-center'>
              {btn2.text}
            </div>
          </Button>
        </div>
      </div>

      <div className='md:w-[50%] w-[80%] min-w-0 flex text-[14px] h-fit lg:max-w-50% '>
          {/* Background gradient  */}
          <div className='text-center flex flex-col w-[10%] text-slate-500 font-bold'>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>
        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codecolor}`}>
          <TypeAnimation
          sequence={[codeblock,1000,""]}
          repeat={Infinity}
          cursor={true}
          omitDeletionAnimation={true}
          style={
            {
              display:"block",
              whiteSpace:"pre-line"
            }
          }
          />

        </div>
      </div>
      
    </div>
  )
}

export default CodeBlocks