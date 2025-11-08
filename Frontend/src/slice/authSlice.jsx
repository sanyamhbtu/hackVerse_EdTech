import {createSlice} from "@reduxjs/toolkit"


const initailState={
  token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")):null,
  // token:"lkjhgleiuhlkjsghoiewuyhkllluitowtheuhszndkljhoieu",

};


const authSlice = createSlice({
  name:"auth",
  initialState:initailState,
  reducers:{
    setToken(state,value){
      state.token=value.payload;
    },
    deleteToken(state){
      localStorage.removeItem("token");
      state.token=null;
    }
    // setInLocal(sta)
  },
})

export const {setToken,deleteToken}=authSlice.actions
export default authSlice.reducer;



// token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")):null,