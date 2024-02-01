import React, { useEffect } from 'react'
import WishStore from '../../store/WishStore.js'
import LegalContentSkeleton from '../../skeleton/legal-content-skeleton.jsx';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Wishlist = () => {

    const {WishListRequest,WishList}=WishStore();
    useEffect(() => {
        (async ()=>{
            await WishListRequest()
        })()
    }, []);
    
    if(WishList==null){
        return <LegalContentSkeleton/>
    }
   
    return (
        
        <div>
            <ul>
                {
                    WishList.map((item,i)=>{
                        console.log(item)
                        return(
                            <div className='mb-5 border p-5 shadow-sm border-info' key={i}>
                                <div>
                                    <h5>Serial Number: - {i+1}</h5>
                                    <h2>Product Name: {item['product']['title']}</h2>
                                    <h5>Product Price: {item['product']['discountPrice']}</h5>
                                    <img className='w-25' src={item.product.image}></img>
                                </div>
                            </div>
                        )
                    })
                }
            </ul>
            <Link className='py-4 mx-4' to="/">
                <Button>Back Home</Button>
            </Link>
        </div>
    );
}

export default Wishlist