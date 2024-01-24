import React, { useState } from 'react';
import UserSubmitButton from "./UserSubmitButton.jsx";
import UserStore from "../../store/UserStore.js";
import ValidationHelper from "../../utility/ValidationHelper.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
const LoginForm = () => {

    let navigate=useNavigate();
    // let {LoginFormData,LoginFormOnChange,UserOTPRequest}=UserStore();
    // console.log(LoginFormData)
    // const onFormSubmit=async ()=>{
    //     if(!ValidationHelper.IsEmail(LoginFormData.email)){
    //         toast.error("Valid Email Address Required")
    //     }else {
    //         let res=await UserOTPRequest(LoginFormData.email);
    //         res?navigate("/otp"):toast.error("Something Went Wrong !")
    //     }
    // }

    const [fromData, setFromData] = useState({
        email: "mdhmaktaruzzaman9101@gmail.com",
      })

    let onFormSubmit= async () =>{
        await axios.post("http://localhost:5000/api/v1/UserLogin",
        {
          email: fromData.email,
        }).then(()=>{
            navigate(`/OtpMatch/${fromData.email}`)
            
        })
    }
    let handleFromdata =(e)=>{
        setFromData({...fromData, [e.target.name]:e.target.value})
      }

    return (
        <div className="container section">
            <div className="row d-flex justify-content-center">
                <div className="col-md-5">
                    <div className="card p-5">
                        <h4>Enter Your Email</h4>
                        <p>A verification code will be sent to the email address you provide</p>
                        <input name='email' onChange={handleFromdata} placeholder="Email Address" type="email" className="form-control"/>
                        <UserSubmitButton onClick={onFormSubmit} className="btn mt-3 btn-success" text="Next"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;