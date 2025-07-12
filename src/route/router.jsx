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


const router=createBrowserRouter([
    {
        path: "/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<ProductPage/>
            },
            {
              path:'creat-product',
              element:<CreatProduct/>
            },
            {
              path:"/update-product/:id",
              element:<EditProduct/>
            },
            {
                path:"/brand",
                element:<BrandPage/>
            },
            {
              path:"/creat-brand",
              element:<CreatBrand/>
            },
            {
                path:"/edit-brand/:id",
                element:<EditBrand/>
            },
            {
              path:"/brand-list-byproduct/:brandID",
              element:<ProductListbyBrand/>
            },
            {
                path:"/category",
                element:<CategoryPage/>
            },
            {
                path:"/creat-category",
                element:<CreatCategory/>
            },
            {
                path:"/update-category/:id",
                element:<UpdateCategory/>
            },{
            path:"/category-list-byproduct/:categoryID",
                element:<CategoryListbyproduct/>
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