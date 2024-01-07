import create from 'zustand';
import axios  from "axios";

const ProductStore=create((set)=>({
    // done ===================
    BrandList:null,
    BrandListRequest:async()=>{
        let res=await axios.get(`/api/v1/GetProductBrandList`);
        if(res.data['status']==="success"){
            set({BrandList:res.data['data']})
        }
    },

    // done =====================
    CategoryList:null,
    CategoryListRequest:async()=>{
        let res=await axios.get(`/api/v1/GetAllProductCategoryList`);
        if(res.data['status']==="success"){
            set({CategoryList:res.data['data']})
        }
    },

    // done ========================
    SliderList:null,
    SliderListRequest:async()=>{
        let res = await axios.get(`/api/v1/GetProductSliderList`);
        if(res.data['status']==="success"){
            set({SliderList:res.data['data']})
        }
    },

    // done ==========================
    ListByRemark:null,
    ListByRemarkRequest:async()=>{
        set({ListByRemark:null})
        let res=await axios.get(`/api/v1/GetAllProduct`);
        if(res.data['status']==="success"){
            set({ListByRemark:res.data['data']})
        }
    },

    ListProduct:null,
    ListByBrandRequest:async(BrandID)=>{
        set({ListProduct:null})
        let res=await axios.get(`/api/v1/ProductListByBrand/${BrandID}`);
        if(res.data['status']==="success"){
            set({ListProduct:res.data['data']})
        }
    },

    ListByCategoryRequest:async(CategoryID)=>{
        console.log(CategoryID)
        set({ListProduct:null})
        let res=await axios.get(`/api/v1/ProductListByCategory/${CategoryID}`);
        if(res.data['status']==="success"){
            set({ListProduct:res.data['data']})
        }
    },
    
    ListByKeywordRequest:async(Keyword)=>{
        set({ListProduct:null})
        let res=await axios.get(`/api/v1/ProductListByKeyword/${Keyword}`);
        if(res.data['status']==="success"){
            set({ListProduct:res.data['data']})
        }
    },

    // ListByFilterRequest:async(postBody)=>{
    //     set({ListProduct:null})
    //     let res=await axios.post(`/api/v1/ProductListByFilter`,postBody);
    //     if(res.data['status']==="success"){
    //         set({ListProduct:res.data['data']})
    //     }
    // },

    SearchKeyword:"",
    SetSearchKeyword:async(keyword)=>{
        set({SearchKeyword:keyword})
    },


    // done =========================
    Details:null,
    DetailsRequest:async(ProductID)=>{
        console.log("kkkk",ProductID)
        let res=await axios.get(`/api/v1/ProductDetails/${ProductID}`);
        if(res.data['status']==="success"){
            set({Details:res.data['data']})
        }
    },

    ReviewList:null,
    ReviewListRequest:async(id)=>{
        let res=await axios.get(`/api/v1/ProductReviewList/${id}`);
        if(res.data['status']==="success"){
            set({ReviewList:res.data['data']})
        }
    },


}))

export default ProductStore;