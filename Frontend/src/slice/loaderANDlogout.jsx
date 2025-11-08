import { createSlice } from "@reduxjs/toolkit";


const initailState={
  isLogOut:false,
  isLoading:false
}

const loaderAndLogoutslice=createSlice({
  name:"loaderANDlogout",
  initialState:initailState,
  reducers:{
    setLogout(state,value){
      state.isLogOut=value.payload
    },
    setLoading(state,value){
      state.isLoading=value.payload
    }
  }
})

export const {setLoading,setLogout}=loaderAndLogoutslice.actions;
export default loaderAndLogoutslice.reducer