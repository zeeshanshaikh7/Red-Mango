import cartItemModel from "./cartItemModel";

export default interface shoppingCartModel {
    id?:number;
    userId?:string;
    cartItems?:cartItemModel[];
    cartTotal?: number;
    stripePaymentIntentId?:number;
    clientSecret?: any;
}




