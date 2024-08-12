import { useGetAllOrderQuery } from "../../API/orderApi"
import { useSelector } from "react-redux"
import { RootState } from "../../Storage"
import { OrderList } from "./OrderList"
import { MainLoader } from "../../components/pages/common"
import { withAuth } from "../../HOC"


function MyOrder() {
    const userId = useSelector((state: RootState) => state.userAuthStore.id)
    const { data, isLoading } = useGetAllOrderQuery({userId})

    return (
        <>
            {isLoading && <MainLoader />}
            {!isLoading && (
                <>
                    <div className="d-flex align-item-center justify-content-between mx-5 mt-5">
                        <h1 className="text-success">My Orders</h1>
                    </div>
                    <OrderList isLoading={isLoading} orderData={data?.apiResponse.result} />
                </>
            )}
        </>
    )
}

export default withAuth(MyOrder)