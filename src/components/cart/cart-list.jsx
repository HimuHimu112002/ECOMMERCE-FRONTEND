import React, { useEffect } from 'react'
import cartStore from "../../store/CartStore.js";
import LegalContentSkeleton from "../../skeleton/legal-content-skeleton.jsx";
import CartSubmitButton from "./CartSubmitButton.jsx";
import axios from "axios"
import { GetUserID, getToken } from '../../utility/utility.js';

const CartList = () => {
    const {CartListRequest,CartList,CreateInvoiceRequest}=cartStore();
    useEffect(() => {
        (async ()=>{
            await CartListRequest()
        })()
    }, []);
    
    if(CartList==null){
        return <LegalContentSkeleton/>
    }

    let handleDelete = async(id)=>{
        console.log(id)
        let token = getToken()
        const headers = {
            'token': token,
            'user_id': GetUserID(),
            'Content-Type': 'application/json',
        };
        await axios.post("http://localhost:5000/api/v1/RemoveCart",id,{headers})
    }
   
    return (
        
        <div>
            <ul>
                {
                    CartList.map((item,i)=>{
                        console.log(item)
                        return(
                            <div className='mb-5 border p-5 shadow-sm border-info' key={i}>
                                <div>
                                    <h5>Serial Number: - {i+1}</h5>
                                    <h2>Product Name: {item['product']['title']}</h2>
                                    <h5>Product Price: {item['product']['discountPrice']}</h5>
                                    <img className='w-25' src={item.product.image}></img>
                                </div>
                                <button onClick={()=>handleDelete(item._id)} type="primary">Delete Product</button>
                            </div>
                        )
                    })
                }
            </ul>
            <CartSubmitButton text="Check Out" onClick={async ()=>{await CreateInvoiceRequest()}} className="btn btn-success"/>
        </div>
    );
};

export default CartList;