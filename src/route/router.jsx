import {createBrowserRouter} from "react-router-dom";
import App from "@/App.jsx";
import ProductPage from "@/page/product-page.jsx";
import BrandPage from "@/page/brand-page.jsx";
import CategoryPage from "@/page/category-page.jsx";
import RegisterPage from "@/page/register-page.jsx";
import LoginPage from "@/page/login-page.jsx";
import CreatBrand from "@/components/brand/creatBrand.jsx";
import EditBrand from "@/components/brand/editBrand.jsx";
import CreatCategory from "@/components/category/creatCategory.jsx";
import UpdateCategory from "@/components/category/updateCategory.jsx";
import ProductListbyBrand from "@/components/brand/productListbyBrand.jsx";
import CategoryListbyproduct from "@/components/category/categoryListbyproduct.jsx";
import CreatProduct from "@/components/product/creatProduct.jsx";
import EditProduct from "@/components/product/editProduct.jsx";
import ProtectedRoute from "@/route/ProtectedRoute.jsx";


const router=createBrowserRouter([
    {
        path: "/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:(<ProtectedRoute><ProductPage/></ProtectedRoute>)
            },
            {
              path:'creat-product',
              element:(<ProtectedRoute><CreatProduct/></ProtectedRoute>)
            },
            {
              path:"/update-product/:id",
              element:(<ProtectedRoute><EditProduct/></ProtectedRoute>)
            },
            {
                path:"/brand",
                element:(<ProtectedRoute><BrandPage/></ProtectedRoute>)
            },
            {
              path:"/creat-brand",
              element:(<ProtectedRoute><CreatBrand/></ProtectedRoute>)
            },
            {
                path:"/edit-brand/:id",
                element:(<ProtectedRoute><EditBrand/></ProtectedRoute>)
            },
            {
              path:"/brand-list-byproduct/:brandID",
              element:(<ProtectedRoute><ProductListbyBrand/></ProtectedRoute>)
            },
            {
                path:"/category",
                element:(<ProtectedRoute><CategoryPage/></ProtectedRoute>)
            },
            {
                path:"/creat-category",
                element:(<ProtectedRoute><CreatCategory/></ProtectedRoute>)
            },
            {
                path:"/update-category/:id",
                element:(<ProtectedRoute><UpdateCategory/></ProtectedRoute>)
            },{
            path:"/category-list-byproduct/:categoryID",
                element:(<ProtectedRoute><CategoryListbyproduct/></ProtectedRoute>)
            }
        ]
    },
    {
        path:"/register",
        element:<RegisterPage/>
    },
    {
        path:"/login",
        element:<LoginPage/>
    }
])

export default router;