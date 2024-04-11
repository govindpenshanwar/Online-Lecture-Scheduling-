import './App.css';
import Login from './Components/LoginPage/Login';
import Signup from './Components/SignupPage/Signup';
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './Context/UserContext';
import Admin from './Components/AdminPanel/Admin';
import Instructor from './Components/InstructorPanel/Instructor';
import AddCourse from './Components/AddCoursePage/AddCourse';
import AddInstructor from './Components/AddInstructorPage/AddInstructor';


function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: 'rgb(51,65,85)',
            color: 'white'
          }
        }} />

      <UserProvider>
        <Routes>
          <Route
            path='/'
            element={<Login />}
          />
          <Route
            path='/signup'
            element={<Signup />}
          />
          <Route
            path='/admin'
            element={<Admin />}
          />
          <Route
            path='/instructor'
            element={<Instructor />}
          />
          <Route
            path='/addCourse'
            element={<AddCourse />}
          />
          <Route
            path='/addInstructor'
            element={<AddInstructor />}
          />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
