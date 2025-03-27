import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import LoginWithOtp from "../pages/LoginWithOtp";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword"; 
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders";
import Address from "../pages/Address";
import Banner from "../pages/Banners";
import CategoryPage from "../pages/CategoryPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import AdminPermision from "../layouts/AdminPermision";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import SubCategoryProductPage from "../pages/SubCategoryProductPage"; 
import CartMobile from "../pages/CartMobile";
import CheckoutPage from "../pages/CheckoutPage";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import WishlistPage from "../components/DisplayWishListItem"; // Add this import

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "search",
                element: <SearchPage />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "login-with-otp",
                element: <LoginWithOtp/>
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "verification-otp",
                element: <OtpVerification />
            },
            {
                path: "reset-password",
                element: <ResetPassword />
            },
            {
                path: "user",
                element: <UserMenuMobile />
            },
            {
                path: "dashboard",
                element: <Dashboard />,
                children: [
                    {
                        path: "profile",
                        element: <Profile />
                    },
                    {
                        path: "myorders",
                        element: <MyOrders />
                    },
                    {
                        path: "address",
                        element: <Address />
                    },
                    {
                        path: "wishlist",
                        element: <WishlistPage />
                    },
                    {
                        path: 'banner',
                        element: <AdminPermision><Banner /></AdminPermision>
                    },
                    {
                        path: 'category',
                        element: <AdminPermision><CategoryPage /></AdminPermision>
                    },
                    {
                        path: "subcategory",
                        element: <AdminPermision><SubCategoryPage /></AdminPermision>
                    },
                    {
                        path: 'upload-product',
                        element: <AdminPermision><UploadProduct /></AdminPermision>
                    },
                    {
                        path: 'product',
                        element: <AdminPermision><ProductAdmin /></AdminPermision>
                    }
                ]
            },
            {
                path: ":category",
                children: [
                    {
                        path: ":subCategory",
                        element: <ProductListPage />
                    }
                ]
            },
            {
                path: "product/:product",
                element: <ProductDisplayPage />
            },
            {
                path: ":subCategory",
                element: <ProductListPage />
            },
            {
                path: 'cart',
                element: <CartMobile />
            },
            {
                path: "wishlist",
                element: <WishlistPage />
            },
            {
                path: "checkout",
                element: <CheckoutPage />
            },
            {
                path: "success",
                element: <Success />
            },
            {
                path: 'cancel',
                element: <Cancel />
            }
        ]
    }
]);

export default router;