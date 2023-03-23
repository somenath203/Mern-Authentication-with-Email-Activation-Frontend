import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";


const Dashboard = () => {

  const [userFullName, setUserFullName] = useState();

  const [userEmailAddress, setUserEmailAddress] = useState();

  const [ isSendingDataToBackend, setIsSendingDataToBackend ] = useState();


  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();


  const loadUserData = async () => {

    try {

      const userToken = JSON.parse(localStorage.getItem('data'));

      const { data } = await axios.post(`${process.env.BACKEND_API_URL}/auth/user-profile`, {}, {
        headers: {

          Authorization: `Bearer ${userToken}`

        }
      });

      setUserFullName(data?.fullname);

      setUserEmailAddress(data?.email);

    } catch (error) {

      toast.error(error?.response?.data?.message);

      navigate('/');

    }


  };

  useEffect(() => {
    loadUserData();
  }, [])



  const changePassword = async (formData) => {

    try {

      const userToken = JSON.parse(localStorage.getItem('data'));

      if (formData.userPassword === formData.userConfirmPassword) {

        setIsSendingDataToBackend(true);

        const { data } = await axios.post(`${process.env.BACKEND_API_URL}/auth/change-password`, { currentPassword: formData.userAlreadyPassword, newPassword: formData.userNewPassword }, {

          headers: {

            Authorization: `Bearer ${userToken}`

          }

        });

        setIsSendingDataToBackend(false);

        toast.success(data?.message);

      } else {

        toast.error('password and confirm password does not match');

      }

    } catch (error) {

      setIsSendingDataToBackend(false);

      toast.error(error?.response?.data?.message);

    }

  };


  const logoutUser = () => {

    localStorage.removeItem('data');

    toast.success('you are logged out successfully');

    navigate('/');

  }


  return (
    <div className="container">


      <div className="bg-success p-5">

        <h2 className="text-white text-center">Dashboard</h2>

      </div>


      <div className="mt-5 p-3">

        <button className="btn mt-3 btn-danger float-end" onClick={logoutUser}>Logout</button>

        <br />

        <h2 className="mt-5">Full Name: {userFullName}</h2>

        <h2 className="mt-4">Email: {userEmailAddress}</h2>

      </div>


      <div className="mt-4">

        <div className="col-md-5 mx-auto mt-3 py-5 p-5">

          <div className="card p-3 bg-white">

            <h3 className="pt-4 px-4 text-center">Update Password</h3>

            <form onSubmit={handleSubmit(changePassword)} className='mt-5 mx-4'>

              <div className="form-group mt-4">
                <h5>Fullname</h5>
                <input className="form-control bg-secondary text-white" type="text" value={userFullName} readOnly />
              </div>

              <div className="form-group mt-4">
                <h5>Email</h5>
                <input className="form-control bg-secondary text-white" type="email" value={userEmailAddress} readOnly />
              </div>

              <div className="form-group mt-4">
                <h5>Current Password</h5>
                <input
                  className="form-control"
                  type="password"
                  placeholder="enter your current password"
                  {...register("userAlreadyPassword", { required: true, minLength: 8 })}
                />
                {errors.userAlreadyPassword && <div className='text-danger mt-1'>
                  <p>The length of password should be of atleast 8 characters long</p>
                </div>}
              </div>

              <div className="form-group mt-4">
                <h5>New Password</h5>
                <input
                  className="form-control"
                  type="password"
                  placeholder="enter your new password"
                  {...register("userNewPassword", { required: true, minLength: 8 })}
                />
                {errors.userNewPassword && <div className='text-danger mt-1'>
                  <p>The length of password should be of atleast 8 characters long</p>
                </div>}
              </div>

              <div className="text-center">
                <button type="submit" className="submit-btn mt-5">{isSendingDataToBackend ? 'Submitting' : 'Submit'}</button>
              </div>

            </form>

          </div>

        </div>

      </div>

    </div>
  )
};

export default Dashboard;