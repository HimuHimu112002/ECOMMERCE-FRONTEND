import React, {useEffect} from 'react';
import ProductStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import Layout from "../components/layout/layout.jsx";
import ProductList from "../components/product/product-list.jsx";
import Categories from '../components/product/categories.jsx';

const ProductByCategory = () => {
    const {ListByCategoryRequest}=ProductStore();
    const {id}=useParams();

    useEffect(() => {
        (async ()=>{
            await ListByCategoryRequest(id)
        })()
    }, [id]);


    return (
        <Layout>
            <ProductList/>
            <Categories/>
        </Layout>
    );
};

export default ProductByCategory;