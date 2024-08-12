import { useSelector } from "react-redux";
import { getStatusColor } from "../../../Helper"
import { cartItemModel, userModel } from "../../../interfaces"
import { SD_Roles, SD_Status } from "../../../Utilities/SD";
import { orderSummaryProps } from "./OrderSummaryProps"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../../Storage";
import { useUpdateOrderHeaderMutation } from "../../../API";
import { useState } from "react";
import { MainLoader } from "../common";

function OrderSummary({ data, userInput }: orderSummaryProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [updateOrderHeader] = useUpdateOrderHeaderMutation();
  const navigate = useNavigate();
  const userData: userModel = useSelector((state: RootState) => state.userAuthStore)
  const nextStatus: any = data.status! === SD_Status.CONFIRMED
    ? { color: "info", value: SD_Status.BEING_COOKED }
    : data.status! === SD_Status.BEING_COOKED ? { color: "warning", value: SD_Status.READY_FOR_PICKUP }
      : data.status! === SD_Status.READY_FOR_PICKUP && { color: "success", value: SD_Status.COMPLETED }

  const handleNextStatus = async () => {
    setIsLoading(true)
    await updateOrderHeader({
      orderHeaderId: data.id,
      status: nextStatus.value
    })
    setIsLoading(false)
  }
  const handelCancel = async () => {
    setIsLoading(true)
    await updateOrderHeader({
      orderHeaderId: data.id,
      status: SD_Status.CANCELLED
    })
    setIsLoading(false)
  }
  const badgeTypeColor = getStatusColor(data.status!)
  return (
    <div>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="text-success">Order Summary</h3>
            <span className={`btn btn-outline-${badgeTypeColor} fd-6`}>
              {data.status}
            </span>
          </div>
          <div className="mt-3">
            <div className="border py-3 px-2">Name : {userInput.name}</div>
            <div className="border py-3 px-2">Email : {userInput.email}</div>
            <div className="border py-3 px-2">Phone : {userInput.phoneNumber}</div>
            <div className="border py-3 px-2">
              <h4 className="text-success">Menu Items</h4>
              <div className="p-3">
                {data.cartItems?.map((cartItem: cartItemModel, index: number) => {
                  return (
                    <div className="d-flex" key={index}>
                      <div className="d-flex w-100 justify-content-between">
                        <p>{cartItem.menuItem?.name}</p>
                        <p>${cartItem.menuItem?.price} x {cartItem.quantity} =</p>
                      </div>
                      <p style={{ width: "70px", textAlign: "right" }}>
                        ${(cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0)}</p>
                    </div>
                  )
                })}
                <hr />
                <h4 className="text-danger" style={{ textAlign: "right" }}>
                  ${data.cartTotal?.toFixed(2)}
                </h4>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              Back to Orders
            </button>
            {userData.role === SD_Roles.ADMIN && (
              <div className="d-flex">
                {data.status! !== SD_Status.CANCELLED && data.status! !== SD_Status.COMPLETED && (
                  <button className="btn btn-danger mx-2" onClick={handelCancel}>Cancel</button>
                )}
                <button className={`btn btn-${nextStatus.color} mx-2`} onClick={handleNextStatus}>{nextStatus.value}</button>
              </div>
            )}
          </div>
        </>
      )}

    </div>
  )
}

export default OrderSummary