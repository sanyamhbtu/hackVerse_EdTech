const BASE_URL = import.meta.env.VITE_APP_BASE_URL 


export const categroyApi={
  CATEGORY_API : "/course/showAllCategory",
  CATEGORY_DETAIL:"/course/categoryPageDetail"
}

export const userApi={
  LOGIN_API:"/auth/login",
  SIGN_UP_API:"/auth/signup",
  SEND_OTP_API:"/auth/sendotp",
  LOG_OUT_API:"/auth/logOut",
  CHANGE_PASSWORD_API:"/auth/changepassword",
}

export const profileApi={
  USER_DETAIL:"/profile/getUserDetail",
  UPDATE_PROFILE:"/profile/updateProfile",
  DELETE_PROFILE:"/profile/deleteProfile",
  GET_ENROLLED_COURSE:"/profile/getEnrolledCourse",
  GET_MY_COURSES:"/profile/getMyCourses",
  CHANGE_PROFILE_PIC:"/profile/changeProfilePic"
}

export const courseApi={
  CREATE_COURSE:"/Course/createCourse",
  SHOW_ALL_COURSE:"/Course/showAllCourses",
  SHOW_COURSE_DETAIL:"/Course/showCourseDetail",
  GET_DRAFT_COURSE:"/Course/draftCourseDetail",
  UPDATE_COURSE:"/Course/updateCourse",
  GET_ALL_SECTION:"/Course/getAllSection",
  UPDATE_DRAFTED_COURES:"/Course/updateDrafCourse",
  DELETE_COURSE:"/Course/deleteCourse"
}

export const sectionApi={
  ADD_SECTION:"/Course/addSection",
  DELETE_SECTION:"/Course/deleteSection",
  UPDATE_SECTION:"/Course/updateSection",
  FETCH_SEBSECTION:"/Course/getSubSections"
}
export const subSectionApi={
  ADD_SUBSECTION:"/Course/addSubSection",
  DELETE_SUBSECTION:"/Course/deleteSubSection",
  UPDATE_SUBSECTION:"/Course/updateSubSection",
  GET_SUBSECTION_DETAIL:"/Course/getSubSectionDetail"
}

export const cartApi={
  GET_CART_ITEMS:"/Course/getAllCartItems",
  ADD_TO_CART:"/Course/addToCart",
  DELETE_FROM_CART:"/Course/deleteFromCart"
}

export const resetPasswordApi={
  RESET_PASSWORD_TOKEN:"/auth/reset-password-token",
  RESET_PASSWORD:"/auth/reset-password"
}

export const paymentApi={
  PLACEING_ORDER_API:"/Payment/capturePayment",
}

export const contactApi={
  CONTACT_US:"/contact/sendContactMessage"
}

export const ratingApi={
  GET_ALL_RATING:"/course/getAllRating",
  GET_AVERAGE_RATING:"/course/averageRating",
  CREATE_RATING:"/course/createRating",
  GET_COURSE_RATING:"/course/getCourseRating"
}

