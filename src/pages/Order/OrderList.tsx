import orderListType from './orderListType'
import { MainLoader } from '../../components/pages/common'
import { orderHeaderModel } from '../../interfaces'
import { useNavigate } from 'react-router-dom'
import { getStatusColor } from '../../Helper'

export const OrderList = ({ isLoading, orderData }: orderListType) => {
    const navigate = useNavigate();
    return (
        <>
            {isLoading && <MainLoader />}
            {!isLoading && (
                <>
                    <div className="container py-2">
                    </div>
                    <hr className="border-success my-4 container"/>
                    <div className="container">
                        <div className="table-responsive-xl">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col" className="col-1">ID</th>
                                        <th scope="col" className="col-2">NAME</th>
                                        <th scope="col" className="col-2">PHONE</th>
                                        <th scope="col" className="col-1">TOTAL</th>
                                        <th scope="col" className="col-1">ITEM</th>
                                        <th scope="col" className="col-2">DATE</th>
                                        <th scope="col" className="col-2">STATUS</th>
                                        <th scope="col" className="col-1"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderData.map((orderItem: orderHeaderModel, index: number) => {
                                        const badgeColor = getStatusColor(orderItem.status!)
                                        return (
                                            <tr key={index}>
                                                <td scope="col" className="col-1">{orderItem.orderHeaderId}</td>
                                                <td scope="col" className="col-2">{orderItem.pickupName}</td>
                                                <td scope="col" className="col-2">{orderItem.pickupPhoneNumber}</td>
                                                <td scope="col" className="col-1">
                                                    $ {orderItem.orderTotal?.toFixed(2)}
                                                </td>
                                                <td scope="col" className="col-1">{orderItem.totalItems}</td>
                                                <td scope="col" className="col-2">
                                                    {new Date(orderItem.orderDate!).toLocaleDateString()}
                                                </td>
                                                <td scope="col" className="col-2">
                                                    <span className={`badge bg-${badgeColor} py-2`}>{orderItem.status}</span>
                                                </td>
                                                <td scope="col" className="col-1">
                                                    <button
                                                        className="btn btn-success"
                                                        onClick={() => {
                                                            navigate(`/order/orderDetail/${orderItem.orderHeaderId}`)
                                                        }}
                                                    >Details</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

