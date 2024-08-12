import Home from "./Home";
import NotFound from "./NotFound";
import { MenuItemDetails } from "./MenuItemDetails";
import ShoppingCart from "./ShoppingCart";
import Login from "./Login";
import Register from "./Register";
import AuthenticationTest from "./AuthenticationTest";
import AuthenticationTestAdmin from "./AuthenticationTestAdmin";
import AccessDenied from "./AccessDenied";
import Payment from "./Payment";
import OrderConfirmed from "./Order/OrderConfirmed";
import MyOrder from "./Order/MyOrder";
import OrderDetails from "./Order/OrderDetails";
import AllOrders from "./Order/AllOrders";
import MenuItemList from "./MenuItem/MenuItemList";
import MenuItemUpsert from "./MenuItem/MenuItemUpsert";

export {
  MenuItemUpsert,
  MenuItemList,
  OrderDetails,
  OrderConfirmed,
  Payment,
  Home,
  NotFound,
  MenuItemDetails,
  Login,
  Register,
  AccessDenied,

  /* HOC */
  MyOrder,
  AllOrders,
  ShoppingCart,
  AuthenticationTest,
  AuthenticationTestAdmin,
};
