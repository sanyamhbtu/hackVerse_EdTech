import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashBoardSideBar from "../component/Common/DashBoardSideBar";
import toast from "react-hot-toast";
import { apiConnector } from "../services/apiConnector";
import { profileApi } from "../services/api";
import { setLoading } from "../slice/loaderANDlogout";
import SingleCartItem from "../component/Common/SingleCartItem";

const headers = {
  "Content-Type": "application/json",
};
function Cart() {
  const { isLoading } = useSelector((state) => state.loaderANDlogout);
  const {cartItems}=useSelector((state)=>state.cartAndEnrolledCourse);
  // const [totalPrice,setTotalPrice]=useState(0);
  let sum=cartItems && cartItems.reduce((acc, obj) => acc + parseFloat(obj.price), 0);
  // if(cartItems.length>0){
  //   let sum = cartItems.reduce((acc, obj) => acc + obj.price, 0);
  //   setTotalPrice(sum);
  // }


  return (
    <div>
      <div className="flex flex-row gap-0 bg-slate-800 text-white min-h-screen pb-52">
        <DashBoardSideBar />
        {isLoading ? (
          <div className="loader p-8 mx-auto h-fit mt-[20%]"></div>
        ) : (
          <div className=" flex flex-col gap-5 xl:w-[75%] lg:w-[82%] md:w-[90%] w-[85%] text-white relative md:left-[20%] md:top-20 md:ml-20 mx-auto md:items-start items-center">
            <div className="text-4xl text-white font-semibold">Cart Items</div>
            <div className="flex flex-col gap-2 font-bold text-slate-400">
              {cartItems && cartItems.length>0?(""):(<div>0 courses in the cart</div>)}
              <div className="border-1 border-slate-500 w-[85%]"></div>
            </div>
            {cartItems && cartItems.length === 0 ? (
              <div className="text-2xl text-slate-300 font-semibold mx-auto">
                Your cart is empty
              </div>
            ) : (
              <div className="md:w-[80%] w-[90%]  flex lg:flex-row flex-col justify-between">
                <div className="flex flex-col xl:w-[70%] lg:w-[75%] md:w-[85%] w-[100%]">
                  {
                    cartItems && cartItems.map((obj,index)=>{
                      return <SingleCartItem key={index} obj={obj}></SingleCartItem>
                    })
                  }
                </div>
                <div className="flex flex-col gap-5 xl:w-[20%] w-[100%] md:w-[20%] ">
                  <div className="flex lg:flex-col flex-row gap-1">
                    <div className="text-2xl text-slate-300 font-bold">Total:</div>
                    <div className="text-2xl text-yellow-400">Rs.{sum}</div>
                  </div>
                  <button className="bg-yellow-400 text-black rounded-lg px-5 font-semibold py-2 hover:cursor-pointer ">
                    Buy Now
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default Cart;
