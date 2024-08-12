import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://redmangoapi.azurewebsites.net/api/";

export const menuItemApi = createApi({
  reducerPath: "menuItemApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers: Headers) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  tagTypes: ["MenuItems"],
  endpoints: (builder) => ({
    getMenuItems: builder.query({
      query: () => ({
        url: "MenuItem",
        method: "GET",
      }),
      providesTags: ["MenuItems"],
    }),
    getMenuItemById: builder.query({
      query: (id) => ({
        url: `MenuItem/${id}`,
        method: "GET",
      }),
      providesTags: ["MenuItems"],
    }),
    createMenuItem: builder.mutation({
      query: (data) => ({
        url: `menuitem`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["MenuItems"],
    }),
    updateMenuItem: builder.mutation({
      query: ({ data, id }) => ({
        url: `menuitem/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["MenuItems"],
    }),
    deleteMenuItem: builder.mutation({
      query: (id) => ({
        url: `menuitem/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MenuItems"],
    }),
  }),
});

export default menuItemApi;

const useGetMenuItemsQuery: typeof menuItemApi.endpoints.getMenuItems.useQuery =
  menuItemApi.endpoints.getMenuItems.useQuery;
const useGetMenuItemByIdQuery: typeof menuItemApi.endpoints.getMenuItemById.useQuery =
  menuItemApi.endpoints.getMenuItemById.useQuery;
const useUpdateMenuItemsMutaion: typeof menuItemApi.endpoints.updateMenuItem.useMutation =
  menuItemApi.endpoints.updateMenuItem.useMutation;
const useCreateMenuItemsMutaion: typeof menuItemApi.endpoints.createMenuItem.useMutation =
  menuItemApi.endpoints.createMenuItem.useMutation;
const useDeleteMenuItemsMutaion: typeof menuItemApi.endpoints.deleteMenuItem.useMutation =
  menuItemApi.endpoints.deleteMenuItem.useMutation;

export {
  useGetMenuItemsQuery,
  useGetMenuItemByIdQuery,
  useUpdateMenuItemsMutaion,
  useCreateMenuItemsMutaion,
  useDeleteMenuItemsMutaion,
};
