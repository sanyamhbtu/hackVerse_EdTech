import {createSlice} from "@reduxjs/toolkit"

const initailState={
  categoriesDetail:{}
}

const courseSlice=createSlice({
  name:"courses",
  initialState:initailState,
  reducers:{
    setCategory(state,value){
      state.categoriesDetail=value.payload
    }
  }
})

export const {setCategory}=courseSlice.actions;
export default courseSlice.reducer;