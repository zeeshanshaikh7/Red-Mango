import { apiResponse, cartItemModel, userModel } from "../../../interfaces"
import { RootState } from "../../../Storage/Redux/store"
import { useSelector } from "react-redux"
import React,{useEffect, useState} from "react"
import { inputHelper } from "../../../Helper"
import { MiniLoader } from "../common"
import { useInitiatePaymentMutaion } from "../../../API"
import { useNavigate } from "react-router-dom"

const CartPickupDetails = () => {
    const navigate = useNavigate();
    const [initiatePayment] = useInitiatePaymentMutaion();
    const shoppingCartFromStore: cartItemModel[] = useSelector(
        (state: RootState) => state.shoppingCartStore.cartItems ?? []
    )
    const userData:userModel = useSelector(
        (state:RootState) => state.userAuthStore
    )
    let grandTotals=0;
    let totalItems=0;

    shoppingCartFromStore?.map((cartItem:cartItemModel) => {
        totalItems += cartItem.quantity ?? 0
        grandTotals += (cartItem.menuItem?.price ?? 0) * (cartItem.quantity ?? 0)
        return null;
    })
    const initialData = {
        name:userData.fullName,
        email:userData.email,
        phoneNumber:""
    }

    const [userInput, setUserInput] = useState(initialData)

    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelper(e,userInput)
        setUserInput(tempData)
    }

    const [loading, setLoading] = useState<boolean>(false);

    /* handle submit  */
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)       
        const {data} : apiResponse = await initiatePayment(userData.id) ;
        // const orderSummary = {grandTotals,totalItems};
        navigate("/payment",{
            state: {apiResult:data?.result,userInput}
        })
    }

    useEffect(() => {
        setUserInput({
            name:userData.fullName,
            email:userData.email,
            phoneNumber:""
        })
    },[userData])

    return (
        <div className="border pb-5 pt-3">
            <h1 style={{ fontWeight: "300" }} className="text-center text-success">
                Pickup Details
            </h1>
            <hr />
            <form className="col-10 mx-auto" onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                    Pickup Name
                    <input
                        type="text"
                        className="form-control"
                        placeholder="name..."
                        name="name"
                        value={userInput.name}
                        onChange={handleInput}
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    Pickup Email
                    <input
                        type="email"
                        className="form-control"
                        placeholder="email..."
                        name="email"
                        value={userInput.email}
                        onChange={handleInput}
                        required
                    />
                </div>

                <div className="form-group mt-3">
                    Pickup Phone Number
                    <input
                        type="number"
                        className="form-control"
                        placeholder="phone number..."
                        name="phoneNumber"
                        value={userInput.phoneNumber}
                        onChange={handleInput}
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    <div className="card p-3" style={{ background: "ghostwhite" }}>
                        <h5>Grand Total : ${grandTotals.toFixed(2)}</h5>
                        <h5>No of items : {totalItems}</h5>
                    </div>
                </div>
                <button
                    disabled={loading}
                    type="submit"
                    className="btn btn-lg btn-success form-control mt-3"
                >
                    {loading ? <MiniLoader type={"warning"} size={80}/> : 'Looks Good? Place Order!'}
                </button>
            </form>
        </div>
    )
}

export default CartPickupDetails