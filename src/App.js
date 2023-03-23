import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import VerifyEmail from './pages/VerifyEmail';


const App = () => {
  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path='/' element={<PublicRoutes><Login /></PublicRoutes>} />
          <Route path='/register' element={<PublicRoutes><Register /></PublicRoutes>} />
          <Route path='/dashboard' element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
          
          <Route path='/verify/:token' element={<PublicRoutes><VerifyEmail /></PublicRoutes>} />
          {/* the path should be same as the one defined inside nodemailer configuration in the server 
              side */}

        </Routes>

      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
    </>
  )
};


export default App;


export function ProtectedRoutes({ children }) {

  const authToken = localStorage.getItem('data');

  if (authToken) {

    return children;

  } else {

    return <Navigate to='/' />

  }

};


export function PublicRoutes({ children }) {

  const authToken = localStorage.getItem('data');

  if (authToken) {

    return <Navigate to='/dashboard' />

  } else {

    return children;

  }

};