import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "@/utilitis/getBaseURL.js";


const brandAPI=createApi({
    reducerPath:"brandAPI",
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/api/brand`,
        credentials:"include"
    }),
    tagTypes:['brand'],
    endpoints:(builder)=>({
        getAllBrands:builder.query({
            query:()=>({
                url:"/get-brand",
                method:"GET"
            })
        }),
        deleteBrand:builder.mutation({
            query:(id)=>({
                url:`/delete-brand/${id}`,
                method:"DELETE"
            })
        }),
        creatBrand:builder.mutation({
            query:(newBrand)=>({
                url:"/creat-brand",
                method:"POST",
                body:newBrand
            })
        }),
        updateBrand:builder.mutation({
            query:({editBrand, id})=>({
                url:`/update-brand/${id}`,
                method:"POST",
                body:editBrand
            })
        }),
        ListByKeywordService:builder.query({
            query:(keyword)=>({
                url:`/search-brand?keyword=${encodeURIComponent(keyword)}`,
                method:"GET"
            })
        })
    })
})

export const {useGetAllBrandsQuery,useDeleteBrandMutation,useCreatBrandMutation,useUpdateBrandMutation,useListByKeywordServiceQuery}=brandAPI;
export default brandAPI;