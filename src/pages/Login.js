/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from 'axios';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import LoginImg from './../assets/loginimg.svg';


const Login = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [ isSendingDataToBackend, setIsSendingDataToBackend ] = useState();



  const navigate = useNavigate();


  const onSubmitForm = async (e) => {

    e.preventDefault();

    try {

      setIsSendingDataToBackend(true);

      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/auth/login`, { email: email, password: password });

      setIsSendingDataToBackend(false);

      localStorage.setItem('data', JSON.stringify(data?.userData?.token));

      toast.success(data?.message);

      navigate('/dashboard');

    } catch (error) {

      setIsSendingDataToBackend(false);

      toast.error(error?.response?.data?.message);
    }

  };

  return (
    <div className="row bgcolor py-4">

      <h2 className="text-white text-center">Welcome Back</h2>


      <div className='col-md-6'>

        <img src={LoginImg} className='img-fluid' alt="login image" />

      </div>

      <div className="col-md-5 py-5 mt-3">

        <div className='card p-3 bg-white'>

          <h2 className='mx-4'>Login</h2>

          <form onSubmit={onSubmitForm} className='mt-5 mx-4'>

            <div className='form-group'>

              <h5>Email Address</h5>

              <input
                type="email"
                className='form-control'
                placeholder='enter your email'
                required
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>

            <div className='form-group mt-4'>

              <h5>Password</h5>

              <input
                type="password"
                className='form-control'
                placeholder='enter your password'
                required
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>

            <div className='text-center'>
              <button type='submit' className='mt-5 submit-btn'>{isSendingDataToBackend ? 'Submitting' : 'Submit'}</button>
            </div>

          </form>

          <NavLink to='/register' className='text-primary text-center my-3'>
            Don't have an account? Click Here
          </NavLink>

        </div>

      </div>

    </div>
  )
};


export default Login;