import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { toastNotify } from '../../../Helper';
import { orderSummaryProps } from '../Orders/OrderSummaryProps';
import { apiResponse, cartItemModel } from '../../../interfaces';
import { useCreateOrderMutaion } from '../../../API';
import { SD_Status } from '../../../Utilities/SD';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ data, userInput }: orderSummaryProps) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [createOrder] = useCreateOrderMutaion();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true)
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/",
      },
      redirect: 'if_required'
    });

    if (result.error) {
      setIsProcessing(false)
      toastNotify(`${result.error.message}`, "error")
    } else {
      toastNotify(`Payment Successful`, "success")
    }

    const orderDetailsDTO: any = [];
    let grandTotal = 0
    let totalItems = 0
    data.cartItems?.forEach((item: cartItemModel) => {
      const tempOrderDetailDTO: any = {}
      tempOrderDetailDTO['menuItemId'] = item.menuItem?.id
      tempOrderDetailDTO['quantity'] = item.quantity
      tempOrderDetailDTO['itemName'] = item.menuItem?.name
      tempOrderDetailDTO['price'] = item.menuItem?.price
      orderDetailsDTO.push(tempOrderDetailDTO)
      grandTotal += (item.menuItem?.price! * item.quantity!)
      totalItems += item.quantity!
    })

    const response: apiResponse = await createOrder({
      orderDetailsDTO:orderDetailsDTO,
      pickupName: userInput.name,
      pickupPhoneNumber: userInput.phoneNumber,
      pickupEmail: userInput.email,
      orderTotal: grandTotal,
      totalItems: totalItems,
      stripePaymentIntentID:data.stripePaymentIntentId,
      applicationUserId:data.userId,
      status: result.paymentIntent?.status == 'succeeded' ? SD_Status.CONFIRMED : SD_Status.PENDING
    })

    if (response) {
      if (response.data?.result.status === SD_Status.CONFIRMED) {
        navigate(`/order/orderConfirmed/${response.data.result.orderHeaderId}`)
      }
      else{
        navigate(`/failed`)
      }
    }
    setIsProcessing(false)
  };

 

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button 
      className='btn btn-success mt-5 w-100' 
      disabled={!stripe || isProcessing}>
        <span className='button-text'>
          {isProcessing ? "Processing...":"Submit"}
        </span>
      </button>
    </form>
  );
};

export default PaymentForm;