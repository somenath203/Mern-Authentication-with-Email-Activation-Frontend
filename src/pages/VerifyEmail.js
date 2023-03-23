import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


const VerifyEmail = () => {


    const params = useParams();

    const navigate = useNavigate();

    const [ showMsgConditionally, setShowMsgConditionally ] = useState();


    const verifyTokenFunc = async () => {

        try {

            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/auth/verify-email`, { tokenFromFrontend: params.token });


            toast.success(data?.message);

            setShowMsgConditionally('Verification Successful... Redirecting you to Login Page');

            setTimeout(() => {
                navigate('/');
            },3500);
            
        } catch (error) {
            
            toast.error(error?.response?.data?.message);

            setShowMsgConditionally('Verification Failed... Redirecting you to Registration Page');

            setTimeout(() => {
                navigate('/register');
            },3500);

        }

    };


    useEffect(() => {
        verifyTokenFunc();
    }, []);

    return (
        <div className="container">
            <h3 className="mx-auto mt-5 text-center">{showMsgConditionally}</h3>
        </div>
    )
};


export default VerifyEmail;