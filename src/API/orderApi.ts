import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://redmangoapi.azurewebsites.net/api/";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl,
    prepareHeaders: (headers:Headers) => {
      const token = localStorage.getItem('token')
      token && headers.append("Authorization", "Bearer " + token)
    },
   }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderDetails) => ({
        url: "order",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: orderDetails,
      }),
      invalidatesTags: ["orders"],
    }),
    getAllOrder: builder.query({
      query: ({userId,searchString,status,pageSize,pageNumber}) => ({
        url: "order",
        method: "GET",
        params: {
          ...(userId && {userId}),
          ...(searchString && {searchString}),
          ...(pageSize && {pageSize}),
          ...(status && {status}),
          ...(pageNumber && {pageNumber}),
        },
      }),
      transformResponse(apiResponse: {result:any}, meta:any){
        return {
            apiResponse,
            totalRecords: meta.response.headers.get("X-Pagination")
        }
      },
      providesTags: ["orders"],
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `order/${id}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    updateOrderHeader: builder.mutation({
      query: (orderDetails) => ({
        url: `order/${orderDetails.orderHeaderId}`,
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: orderDetails,
      }),
      invalidatesTags:['orders']
    }),
  }),
});

export default orderApi;

export const useCreateOrderMutaion: typeof orderApi.endpoints.createOrder.useMutation =
  orderApi.endpoints.createOrder.useMutation;

export const useGetAllOrderQuery: typeof orderApi.endpoints.getAllOrder.useQuery =
  orderApi.endpoints.getAllOrder.useQuery;

export const useGetOrderDetailsQuery: typeof orderApi.endpoints.getOrderDetails.useQuery =
  orderApi.endpoints.getOrderDetails.useQuery;

export const useUpdateOrderHeaderMutation: typeof orderApi.endpoints.updateOrderHeader.useMutation =
  orderApi.endpoints.updateOrderHeader.useMutation;
