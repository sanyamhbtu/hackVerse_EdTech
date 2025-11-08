import { createSlice } from "@reduxjs/toolkit";


const initialState={
  cartItems:null,
  enrolledCourses:[],
};

const cartSlice=createSlice({
  name:"cartAndEnrolledCourse",
  initialState:initialState,
  reducers:{
    setTotalCartItems(state,value){
      state.cartItems=value.payload;
    },
    setEnrolledCourses(state,value){
      state.enrolledCourses=value.payload;
    }
  }
});

export const {setTotalCartItems,setEnrolledCourses}=cartSlice.actions
export default cartSlice.reducer;