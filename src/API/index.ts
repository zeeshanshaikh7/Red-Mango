import orderApi from "./orderApi";
import menuItemApi from "./menuItemApi";
import shoppingCartApi from "./shoppingCartApi";
import authApi from "./authApi";
import paymentApi from "./paymentApi";
import {
  useGetMenuItemByIdQuery,
  useGetMenuItemsQuery,
  useUpdateMenuItemsMutaion,
  useCreateMenuItemsMutaion,
  useDeleteMenuItemsMutaion,
} from "./menuItemApi";
import {
  useGetShoppingCartQuery,
  useUpdateShoppingCartMutation,
} from "./shoppingCartApi";
import { useLoginUserMutation, useRegisterUserMutation } from "./authApi";
import { useInitiatePaymentMutaion } from "./paymentApi";
import {
  useCreateOrderMutaion,
  useUpdateOrderHeaderMutation,
} from "./orderApi";

export {
  orderApi,
  shoppingCartApi,
  menuItemApi,
  authApi,
  paymentApi,
  useUpdateOrderHeaderMutation,
  useCreateOrderMutaion,
  useGetMenuItemByIdQuery,
  useGetMenuItemsQuery,
  useUpdateMenuItemsMutaion,
  useCreateMenuItemsMutaion,
  useDeleteMenuItemsMutaion,
  useGetShoppingCartQuery,
  useUpdateShoppingCartMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
  useInitiatePaymentMutaion,
};
