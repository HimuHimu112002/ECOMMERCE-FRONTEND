import create from 'zustand';
import axios  from "axios";
import {getToken, unauthorized} from "../utility/utility.js";

const CartStore=create((set)=>({

    isWishSubmit:false,

    WishSaveRequest:async(productID)=>{
        try {
            set({isWishSubmit:true})
            let token = getToken()
            const headers = {
                'token': token,
                'Content-Type': 'application/json',
            };
            let res=await axios.post("/api/v1/SaveWishList",{productID:productID},{ headers });
            return res.data['status'] === "success";
        }catch (e) {
            unauthorized(e.response.status)
        }finally {
            set({isWishSubmit:false})
        }
    },


    WishList:null,
    WishCount:0,
    WishListRequest:async()=>{
        try {
            let token = getToken()
            const headers = {
                'token': token,
                'Content-Type': 'application/json',
            };
            let res = await axios.get("/api/v1/WishList",{headers});
            set({WishList:res.data['data']})
            set({WishCount:(res.data['data']).length})
        }catch (e) {
            unauthorized(e.response.status)
        }finally {
            set({isWishSubmit:false})
        }
    },

}))

export default CartStore;