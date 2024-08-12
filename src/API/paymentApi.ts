import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://redmangoapi.azurewebsites.net/api/";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers: Headers) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),

  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
      query: (userId) => ({
        url: "Payment",
        method: "POST",
        params: {
          userId: userId,
        },
      }),
    }),
  }),
});

export default paymentApi;

export const useInitiatePaymentMutaion: typeof paymentApi.endpoints.initiatePayment.useMutation =
  paymentApi.endpoints.initiatePayment.useMutation;
