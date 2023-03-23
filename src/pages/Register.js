import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import LoginImg from './../assets/loginimg.svg';
import { useState } from 'react';


const Register = () => {


  const { register, handleSubmit, formState: { errors } } = useForm();

  const [ isSendingDataToBackend, setIsSendingDataToBackend ] = useState();


  const onRegisterAccount = async (dataOfForm) => {


    if (dataOfForm.userPassword === dataOfForm.userConfirmPassword) {

      try {

        const userDetails = {
          userFullName: dataOfForm.userFullName,
          userEmailAddress: dataOfForm.userEmail,
          userPassword: dataOfForm.userPassword
        };

        setIsSendingDataToBackend(true);

        const { data } = await axios.post(`${process.env.BACKEND_API_URL}/auth/register`, userDetails);

        setIsSendingDataToBackend(false);

        toast.success(data?.message);

      } catch (error) {

        toast.error(error?.response?.data?.message);

      }

    } else {

      setIsSendingDataToBackend(false);

      toast.error('password and confirm password should match');

    }

  };


  return (
    <div className="row bgcolor p-4">

      <h2 className="text-white text-center">Create Account</h2>

      <div className="col-md-5 mx-auto mt-3 py-5 px-5">

        <div className="card p-3 bg-white">

          <h2 className="pt-2 px-4">Register</h2>

          <form onSubmit={handleSubmit(onRegisterAccount)} className='mt-5 mx-4'>

            <div className="form-group">
              <h5>Full Name</h5>
              <input
                type="text"
                className='form-control'
                placeholder='enter your fullname'
                autoFocus
                required
                {...register("userFullName", { required: true, minLength: 6 })}
              />
              {errors.userFullName && <p className='text-danger mt-1'>fullname should be of atleast 6 characters long</p>}
            </div>

            <div className="form-group mt-4">
              <h5>Email Address</h5>
              <input
                type="email"
                className='form-control'
                placeholder='enter your email'
                required
                {...register("userEmail", { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
              />
              {errors.userEmail && <p className='text-danger mt-1'>please enter a valid email address</p>}
            </div>

            <div className="form-group mt-4">
              <h5>Password</h5>
              <input
                type="password"
                className='form-control'
                placeholder='enter your password'
                required
                {...register("userPassword", { required: true, minLength: 8 })}
              />
              {errors.userPassword && <div className='text-danger mt-1'>
                <p>The length of password should be of atleast 8 characters long</p>
              </div>}
            </div>

            <div className="form-group mt-4">
              <h5>Confirm Password</h5>
              <input
                type="password"
                className='form-control'
                placeholder='confirm your password'
                required
                {...register("userConfirmPassword", { required: true, minLength: 8 })}
              />
              {errors.userConfirmPassword && <div className='text-danger mt-1'>
                <p>The length of password should be of atleast 8 characters long</p>
              </div>}
            </div>

            <div className="text-center">
              <button className='submit-btn mt-5' type='submit'>{isSendingDataToBackend ? 'Submitting...' : 'Submit'}</button>
            </div>

          </form>

          <NavLink to='/' className='text-center mt-3'>
            Already have an account? Login
          </NavLink>

        </div>

      </div>

      <div className="col-md-6">

        <img src={LoginImg} alt="loginimg" className='img-fluid mt-img-register' />

      </div>

    </div>
  )
};

export default Register;