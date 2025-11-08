import { createSlice } from "@reduxjs/toolkit";

const initailState={
  user:{
        firstName:"",
        lastName: "",
        email:"",
        dateOfBirth: "",
        contactNumber:"",
        about: "",
        gender: "",
        accountType:"",
      },
}

const profileSlice = createSlice({
  name:"profile",
  initialState:initailState,
  reducers:{
    setUser(state,value){
      state.user=value.payload
    }
  },

})

export const {setUser}=profileSlice.actions;
export default profileSlice.reducer;