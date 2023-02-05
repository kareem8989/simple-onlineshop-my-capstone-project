import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import LogoutButton from "./components/LogoutButton";
import ProductDetails from "./components/ProductDetails";
import React from "react";
import ShoppingCart from "./components/ShoppingCart";
import OrderedProducts from "./components/OrderedProducts";


export default function Root(){

    return(
        <>
            <Routes>
                <Route path={"/home-shopping-cart"} element={<ShoppingCart/>} />
                <Route path={"/ordered"} element={<OrderedProducts/>} />
                <Route path={"/"} element={<Home/>} />
                <Route path={"/login"} element={<LoginPage/> }
                />
                <Route path={"/"} element={<LogoutButton/>} />
                <Route path={"/details/:id"} element={<ProductDetails/>} />
            </Routes>

        </>
    )
}