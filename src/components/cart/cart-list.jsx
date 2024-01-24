import React, {useEffect, useState} from 'react';
import cartStore from "../../store/CartStore.js";
import LegalContentSkeleton from "../../skeleton/legal-content-skeleton.jsx";
import CartSubmitButton from "./CartSubmitButton.jsx";


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


    return (
        <div>
            <ul>
                {
                    CartList.map((item,i)=>{
                        return(<li>
                                <p>{item['product']['title']}</p>
                                <p>{item['product']['price']}</p>
                        </li>)
                    })
                }
            </ul>
            <CartSubmitButton text="Check Out" onClick={async ()=>{await CreateInvoiceRequest()}} className="btn btn-success"/>

        </div>
    );
};

export default CartList;