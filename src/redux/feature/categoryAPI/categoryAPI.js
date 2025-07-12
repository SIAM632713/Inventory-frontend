import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getBaseURL} from "@/utilitis/getBaseURL.js";


const categoryAPI=createApi({
    reducerPath:"categoryAPI",
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseURL()}/api/category`,
        credentials:"include"
    }),
    tagTypes:['category'],
    endpoints:(builder)=>({
        getAllCategory:builder.query({
            query:()=>({
                url:"/get-category",
                method:"GET"
            })
        }),
        deleteCategory:builder.mutation({
            query:(id)=>({
                url:`/delete-category/${id}`,
                method:"DELETE"
            })
        }),
        creatCategory:builder.mutation({
            query:(newData)=>({
                url:"/creat-category",
                method:"POST",
                body:newData
            })
        }),
        updateCategory:builder.mutation({
            query:({id,editData})=>({
                url:`/update-category/${id}`,
                method:"POST",
                body:editData
            })
        }),
        ListByKeywordService:builder.query({
            query:(keyword)=>({
                url:`/search-category?keyword=${encodeURIComponent(keyword)}`,
                method:"GET"
            })
        })
    })
})

export const {useGetAllCategoryQuery,useDeleteCategoryMutation,useCreatCategoryMutation,useUpdateCategoryMutation,useListByKeywordServiceQuery}=categoryAPI;
export default categoryAPI;