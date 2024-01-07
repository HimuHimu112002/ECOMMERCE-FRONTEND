import React from 'react';
import AppNavBar from "./AppNavBar.jsx";
import Footer from "./Footer.jsx";

const Layout = (props) => {
    return (
        <>
            <AppNavBar/>
            {props.children}
            <Footer/>
        </>
    );
};

export default Layout;