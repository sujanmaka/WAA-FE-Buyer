
import { useSelector } from "react-redux";
import { Route, Routes,Navigate } from "react-router-dom"
import Address from "../../components/address/address";
import Login from "../../components/login/login";
import OrderDashboard from "../../components/order/orderDashboard";
import ProductDetail from "../../components/products/product-detail";

import ProductList from "../../components/products/products-list";
import Cart from "../../container/cart/cart";
import CheckBill from "../../container/cart/check";

import BuyerDashboard from "../../container/dashboard/buyerDashboard";
 

const BuyerRoutes = () => {

    const isAuthenticated = useSelector(state=>state.auth.isBuyerAuthenticated);


    return (
        <Routes>

            {/* Navigation Routes */}

            <Route path="/" element={<BuyerDashboard />} />
            <Route path="/login" element={(isAuthenticated) ?<BuyerDashboard/>:<Login />} />
            <Route path="/dashboard" element={<BuyerDashboard />} />
            <Route path="/products" element={<ProductList />}></Route>
            <Route path="/product/:productID" element={<ProductDetail />}></Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/check" element={(isAuthenticated) ?<CheckBill />:<Login/>} />
            <Route path="/orders" element={(isAuthenticated)?<OrderDashboard />:<Login/>} />
            <Route path="/orderdashboard" element={<Navigate replace to={"/orders"} />} />


            {/* Internal Routes */}

            <Route path="/billing" element={(isAuthenticated) ?<Address />:<Login/>} />

        </Routes>
    )
}
export default BuyerRoutes;