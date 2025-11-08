import React from 'react'
import { MdDelete } from "react-icons/md";
import img1 from "../../assets/about1.jpg"
import { useDispatch } from 'react-redux';
import { deleteFromCart, fetchTotalCartItems } from '../../relatedFunction/cartFunction';
import { setTotalCartItems } from '../../slice/cartSlice';

function SingleCartItem({obj}) {
  const dispatch=useDispatch();
  const deletionItemCart=async (id)=>{
    await deleteFromCart(id);
    const result=await fetchTotalCartItems();
    dispatch(setTotalCartItems(result));
  }

  return (
    <div className='flex flex-col gap-10 mb-7'>
      <div className='flex sm:flex-row flex-col justify-between gap-y-3'>
        <div className='flex sm:flex-row flex-col gap-5'>
          <img src={obj.thumbnail} alt="img.." 
          className=' rounded-lg xl:h-40 xl:w-60 lg:h-36 lg:w-52 md:h-36 md:w-52 sm:w-66 w-fit'
          />
          <div className='flex flex-col gap-1 text-base text-slate-500 font-bold'>
            <div className='text-xl text-slate-200 font-bold'>{obj.courseName}</div>
            <div className='text-base '>{obj.category.categoryName}</div>
            <div> Rating 5</div>
          </div>
        </div>
        <div className='flex flex-col gap-3 '>
          <div className='flex flex-row gap-1 bg-slate-700 px-3 py-2 text-pink-700 hover:cursor-pointer items-center rounded-sm'
          onClick={()=>{
            deletionItemCart(obj._id);
          }}
          >
            <MdDelete/>
            <p>Remove</p>
          </div>
          <div className='lg:text-2xl md:text-xl text-yellow-400'>Rs.{obj.price}</div>
        </div>
      </div>
      <div className="border-1 border-slate-500"></div>
    </div>
  )
}

export default SingleCartItem