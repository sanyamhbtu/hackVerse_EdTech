import axios from "axios"

// export const axiosInstance = axios.create({});
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL, // backend URL
  withCredentials: true, // allow sending cookies/auth headers if needed
});


export const apiConnector = (method , url , bodyData , headers , params)=>{
  return axiosInstance({
    method:`${method}`,
     url:`${url}`,
     data:bodyData?bodyData:null,
     headers:headers?headers:null,
     params:params?params:null,
  })
  

}
// baseURL:"http://localhost:4000/api/v1",