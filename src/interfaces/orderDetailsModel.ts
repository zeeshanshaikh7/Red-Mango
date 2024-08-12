import { SD_Status } from "../Utilities/SD";
import menuItemModel from "./menuItemModel";
import shoppingCartModel from "./shoppingCartModel";

export default interface orderDetail {
  orderDetailId?: number;
  orderHeaderId?: number;
  menuItemId?: number;
  menuItem?: menuItemModel;
  quantity?: number;
  itemName?: string;
  price?: number;
}

export interface orderDetailsDataModel {
    
  id ?: number;
  cartItems?:shoppingCartModel[];
  cartTotal?:number;
  userId?:string;
  stripePaymentIntentId?:string;
  status?:SD_Status

}
