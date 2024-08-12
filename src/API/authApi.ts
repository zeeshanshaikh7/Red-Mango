import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://redmangoapi.azurewebsites.net/api/";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query:(userData) => ({
        url: "auth/register",
        method:'POST',
        headers:{
          "Content-type":"application/json"
        },
        body:userData,
      }),
    }),

    loginUser: builder.mutation({
      query:(userCredentials) => ({
        url: "auth/login",
        method:'POST',
        headers:{
          "Content-type":"application/json"
        },
        body:userCredentials,
      }),
    }),
  }),
});



export default authApi


export const useRegisterUserMutation: typeof authApi.endpoints.registerUser.useMutation
 = authApi.endpoints.registerUser.useMutation

export const useLoginUserMutation: typeof authApi.endpoints.loginUser.useMutation
 = authApi.endpoints.loginUser.useMutation

