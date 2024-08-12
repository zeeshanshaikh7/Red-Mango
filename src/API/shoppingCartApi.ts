import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://redmangoapi.azurewebsites.net/api/";

const shoppingCartApi = createApi({
  reducerPath: "shoppingCart",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  tagTypes: ["shoppingCarts"],
  endpoints: (builder) => ({
    getShoppingCart: builder.query({
      query: (userId) => ({
        url: `shoppingcart`,
        params: {
          userId: userId,
        },
        method: "GET",
      }),
      providesTags: ["shoppingCarts"],
    }),
    updateShoppingCart: builder.mutation({
      query: ({ menuItemId, updateQuantityBy, userId }) => ({
        url: "shoppingcart",
        method: "POST",
        params: {
          menuItemId,
          updateQuantityBy,
          userId,
        },
      }),
      invalidatesTags: ["shoppingCarts"],
    }),
  }),
});

export default shoppingCartApi;

export const useGetShoppingCartQuery: typeof shoppingCartApi.endpoints.getShoppingCart.useQuery =
  shoppingCartApi.endpoints.getShoppingCart.useQuery;

export const useUpdateShoppingCartMutation: typeof shoppingCartApi.endpoints.updateShoppingCart.useMutation =
  shoppingCartApi.endpoints.updateShoppingCart.useMutation;
