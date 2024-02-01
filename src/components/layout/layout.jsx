import React from 'react';
import AppNavBar from "./appNavBar.jsx";
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