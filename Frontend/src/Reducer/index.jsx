import {combineReducers} from "@reduxjs/toolkit"
import authReducer from "../slice/authSlice"
import profileReducer from "../slice/profileSlice"
import cartReducer from "../slice/cartSlice"
import loaderLoagoutReducer from "../slice/loaderANDlogout"
import courseReducers from "../slice/courseSlice"

const rootReducer = combineReducers({
  auth:authReducer,
  profile:profileReducer,
  cartAndEnrolledCourse:cartReducer,
  loaderANDlogout:loaderLoagoutReducer,
  courses:courseReducers
})

export default rootReducer