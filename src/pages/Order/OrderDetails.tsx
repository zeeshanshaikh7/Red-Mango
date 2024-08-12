import { useParams } from "react-router-dom"
import { useGetOrderDetailsQuery } from "../../API/orderApi";
import { OrderSummary } from "../../components/pages/Orders";

function OrderDetails() {
    const { id } = useParams();
    const { data, isLoading } = useGetOrderDetailsQuery(id);
    let userInput = { name: "", email: "", phoneNumber: "" };
    let orderDetail = { id: 0, cartItems: [], cartTotal: 0, status: "" };
    if (!isLoading && data?.result) {
        console.log(data.result[0]);
        userInput = {
            name: data.result[0].pickupName,
            email: data.result[0].pickupEmail,
            phoneNumber: data.result[0].pickupPhoneNumber
        }

        orderDetail = {
            id: data.result[0].orderHeaderId,
            cartItems: data.result[0].orderDetails,
            cartTotal: data.result[0].orderTotal,
            status: data.result[0].status
        }
        console.log(orderDetail);

    }

    return (
        <div className="container my-5 mx-auto p-5 w-100" style={{maxWidth:"750px"}}>
            {!isLoading && orderDetail && userInput && (
                <OrderSummary data={orderDetail} userInput={userInput} />
            )}
        </div>
    )
}

export default OrderDetails