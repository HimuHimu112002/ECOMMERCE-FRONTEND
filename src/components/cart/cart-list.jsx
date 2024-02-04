import React, { useEffect } from 'react'
import cartStore from "../../store/CartStore.js";
import LegalContentSkeleton from "../../skeleton/legal-content-skeleton.jsx";
import CartSubmitButton from "./CartSubmitButton.jsx";
import toast from "react-hot-toast";

const CartList = () => {
    const {CartListRequest,CartList,CreateInvoiceRequest,RemoveCart}=cartStore();
    useEffect(() => {
        (async ()=>{
            await CartListRequest()
        })()
    }, []);
    
    if(CartList==null){
        return <LegalContentSkeleton/>
    }

    const handleDelete = async (productID) => {
        let res=await RemoveCart(productID);
        if(res){
            toast.success("Cart Item Delete");
            await  CartListRequest();
        }else{
            toast.success("Cart Item Delete fail");
        }
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
                                <button className='btn btn-success my-2' onClick={()=>handleDelete(item._id)} type="primary">Delete Product</button>
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