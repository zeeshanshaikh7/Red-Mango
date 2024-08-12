import store from "./Redux/store";
import { setMenuItem ,setSearchItem} from "./Redux/menuItemSlice";
import { menuItemReducer } from "./Redux/menuItemSlice";
import {
  setShoppingCartItems,
  updateQuantity,
  removeFromCart,
} from "./Redux/shoppingCartSlice";
import { RootState } from "./Redux/store";
import { setLoggedInUser } from "./Redux/userAuthSlice";
import { emptyUserState } from "./Redux/userAuthSlice";

export {
  menuItemReducer,
  setSearchItem,
  store,
  setMenuItem,
  setShoppingCartItems,
  updateQuantity,
  removeFromCart,
  setLoggedInUser,
  emptyUserState,
};

export type {RootState}
