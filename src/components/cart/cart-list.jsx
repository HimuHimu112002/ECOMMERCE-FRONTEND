import React, {useEffect} from 'react';
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
                        return(<div className='mb-5 border p-5 shadow-sm' key={i}>
                                <h5>Serial Number: - {i+1}</h5>
                                <h2>Product Name: {item['product']['title']}</h2>
                                <h5>Product Price:{item['product']['price']}</h5>
                                <img className='w-25' src={item.product.image}></img>
                        </div>)
                    })
                }
            </ul>
            <CartSubmitButton text="Check Out" onClick={async ()=>{await CreateInvoiceRequest()}} className="btn btn-success"/>

        </div>
    );
};

export default CartList;