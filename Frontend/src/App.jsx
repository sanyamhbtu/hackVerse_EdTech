import './App.css'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './component/Common/Navbar'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import DashBoard from './pages/DashBoard'
import Setting from './pages/Setting'
import { useLocation } from 'react-router-dom';
import Courses from './pages/Courses'
import Cart from './pages/Cart'
import Catalog from './pages/Catalog'
import AddCourse from './pages/AddCourse'
import CourseDetail from './pages/CourseDetail'
import UpdatePassword from './pages/UpdatePassword'
import NotFound from './pages/NotFound'
import EnrolledCourses from './pages/EnrolledCourses'
import EnrolledCourseSinglePage from './pages/EnrolledCourseSinglePage'


function App() {
  const location = useLocation();
  const isfixed=location.pathname.startsWith('/dashboard');

  return (
  <div className='w-[100%] min-h-screen flex flex-col bg-slate-950 '>
    
    <Navbar isfixed={isfixed} ></Navbar>
    <Routes>
      <Route path='/' element={<Home></Home>}/>  
      <Route path='/login' element={<Login></Login>}/>
      <Route path='/signup' element={<SignUp></SignUp>}/>
      <Route path='/about' element={<AboutUs></AboutUs>}/>
      <Route path='/contact' element={<ContactUs></ContactUs>}/>
      <Route path='/dashboard' element={<DashBoard></DashBoard>}/>
      <Route path='/dashboard/my-profile' element={<DashBoard></DashBoard>}/>
      <Route path='/dashboard/setting' element={<Setting></Setting>}/>
      <Route path='/dashboard/courses' element={<Courses></Courses>}/>
      <Route path='/dashboard/cart' element={<Cart></Cart>}/>
      <Route path='/catalog/*' element={<Catalog></Catalog>}/>
      <Route path='/dashboard/add-course' element={<AddCourse></AddCourse>}/>
      <Route path='/dashboard/add-course/*' element={<AddCourse></AddCourse>}/>
      <Route path='/courses/*' element={<CourseDetail></CourseDetail>}/>
      <Route path='/updatePassword/*' element={<UpdatePassword></UpdatePassword>}/>
      <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses></EnrolledCourses>}/>
      <Route path='/dashboard/enrolled-courses/singleEnrolled/*' element={<EnrolledCourseSinglePage></EnrolledCourseSinglePage>}/>


      {/* This is the last page Not Found wala  */}
      <Route path="*" element={<NotFound></NotFound>} /> 
    </Routes>  


  </div>
  )
}

export default App
