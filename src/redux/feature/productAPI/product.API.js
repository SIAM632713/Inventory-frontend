import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "@/utilitis/getBaseURL.js";

const productAPI=createApi({
    reducerPath:"productAPI",
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/api/product`,
        credentials:"include"
    }),
    tagTypes:['product'],
    endpoints:(builder)=>({
        getProduct:builder.query({
            query:()=>({
                url:"/get-product",
                method:"GET"
            })
        }),
        ListByKeywordService:builder.query({
            query:(keyword)=>({
                url:`/search-product?keyword=${encodeURIComponent(keyword)}`
            })
        }),
        deleteProduct:builder.mutation({
            query:(id)=>({
                url:`/delete-product/${id}`,
                method:"DELETE"
            })
        }),
        ListbyBrand:builder.query({
           query:(brandID)=>({
             url:`/get-ProductListByBrand/${brandID}`,
               method:"GET"
           })
        }),
        ListbyCategory:builder.query({
            query:(categoryID)=>({
                url:`/get-ProductListBycategory/${categoryID}`,
                method:"GET"
            })
        }),
        creatProduct:builder.mutation({
            query:(newProduct)=>({
                url:"/creat-product",
                method:"POST",
                body:newProduct
            })
        }),
        updateProduct: builder.mutation({
            query: ({ id, editProduct }) => ({
                url: `/update-product/${id}`,
                method: "POST",
                body: editProduct,
            }),
        }),
    })
})
export const {useGetProductQuery,useListByKeywordServiceQuery,useDeleteProductMutation,useListbyBrandQuery,useListbyCategoryQuery,useCreatProductMutation,useUpdateProductMutation}=productAPI;
export default productAPI;