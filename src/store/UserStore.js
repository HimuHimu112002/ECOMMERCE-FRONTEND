import create from 'zustand';
import axios  from "axios";
import {GetUserID, getEmail, getToken, setEmail, setUserID, unauthorized} from "../utility/utility.js";
import Cookies from "js-cookie";
const UserStore = create((set)=>({
  
    isLogin:()=>{
        return !!Cookies.get('token');
    },
    LoginFormData:{email:"mdhmaktaruzzaman9101@gmail.com"},
    LoginFormOnChange:(name,value)=>{
        set((state)=>({
            LoginFormData:{
                ...state.LoginFormData,
                [name]:value
            }
        }))
    },
    UserOTPRequest:async(email)=>{
        set({isFormSubmit:true})
        let res=await axios.post(`/api/v1/UserLogin/${email}`);
        setEmail(email);
        set({isFormSubmit:false})
        return res.data['status'] === "success";
    },


    UserLogoutRequest:async()=>{ 
        set({isFormSubmit:true})
        let res=await axios.post(`/api/v1/UserLogout`);
        set({isFormSubmit:false})
        return res.data['status'] === "success";
    },



    OTPFormData:{otp:""},
    OTPFormOnChange:(name,value)=>{
        console.log(value)
        set((state)=>({
            OTPFormData:{
                ...state.OTPFormData,
                [name]:value
            }
        }))
    },
    
    VerifyLoginRequest:async(otp)=>{
        set({isFormSubmit:true})
        let email= getEmail();
        let res=await axios.post(`/api/v1/OtpMatch/${email}/${otp}`);
        setUserID(res.data.user_id._id)
        set({isFormSubmit:false})
        return res.data['status'] === "success";
    },


    isFormSubmit:false,

    ProfileForm:{cus_add:"",cus_city:"",cus_country:"",cus_fax:"",cus_name:"",cus_phone:"",cus_postcode:"",cus_state:"",ship_add:"",ship_city:"",ship_country:"",ship_name:"",ship_phone:"",ship_postcode:"",ship_state:""},
    ProfileFormChange:(name,value)=>{
        set((state)=>({
            ProfileForm:{
                ...state.ProfileForm,
                [name]:value
            }
        }))
    },


    ProfileDetails:null,
    ProfileDetailsRequest:async()=>{
        try {
            const headers = {
                'user_id': GetUserID(),
                'Content-Type': 'application/json',
            };
            let res=await axios.get("/api/v1/ReadProfile", { headers });
            if(res.data['data'].length>0){
                set({ProfileDetails:res.data['data'][0]})
                set({ProfileForm:res.data['data'][0]})
            }else{
                set({ProfileDetails:[]})
            }
        }catch (e) {
            unauthorized(e.response.status)
        }
    },

    ProfileSaveRequest:async(PostBody)=>{
        try {

            let token = getToken()
            const headers = {
                'token': token,
                'user_id': GetUserID(),
                'Content-Type': 'application/json',
            };
            set({ProfileDetails:null})
            let res=await axios.post(`/api/v1/CreateUserProfile`,PostBody, { headers });
            return res.data['status'] === "success";
        }catch (e) {
           unauthorized(e.response.status)
        }
    }

}))

export default UserStore;