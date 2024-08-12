import { useGetAllOrderQuery } from "../../API/orderApi"
import { OrderList } from "./OrderList"
import { MainLoader } from "../../components/pages/common"
import { withAdminAuth } from "../../HOC"
import { SD_Status } from "../../Utilities/SD"
import React, { useEffect, useState } from "react"
import { inputHelper } from "../../Helper"

const filterOptins = [
    'All',
    SD_Status.BEING_COOKED,
    SD_Status.CANCELLED,
    SD_Status.COMPLETED,
    SD_Status.CONFIRMED,
    SD_Status.PENDING,
    SD_Status.READY_FOR_PICKUP
]

function AllOrders() {
    const [filter, setFilter] = useState({ searchString: "", status: "" })
    const [orderData, setOrderData] = useState([])
    const [apiFilter, setApiFilter] = useState({ searchString: "", status: "" })
    const [totalRecords,setTotalRecords] = useState(0)
    const [pageOptions, setPageOptions] = useState({
        pageNumber:1,
        pageSize:5
    })

    const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize)

    const { data, isLoading } = useGetAllOrderQuery({
        ...(apiFilter && {
            searchString:apiFilter.searchString, 
            status:apiFilter.status,
            pageNumber:pageOptions.pageNumber,
            pageSize:pageOptions.pageSize
        })
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const tempValue = inputHelper(e, filter)
        setFilter(tempValue)
    }

    const handleFilter = () => {
        setApiFilter({
            searchString:filter.searchString,
            status:filter.status
        })
    }

    useEffect(()=>{
        if (data && data.apiResponse.result) {
            setOrderData(data.apiResponse.result)
            const {TotalRecords} = JSON.parse(data.totalRecords)
            setTotalRecords(TotalRecords)
        }
    },[data])

    const getPageDetails = () => {
        const dataStartNumber = (pageOptions.pageNumber - 1) * pageOptions.pageSize +1
        const dataEndNumber = pageOptions.pageNumber * pageOptions.pageSize

        return `${dataStartNumber} 
            -
        ${
            dataEndNumber < totalRecords ? dataEndNumber : totalRecords
        } of ${totalRecords}
        `
    }

    const handlePageOptionChange = (direction:string, pageSize?:number) => {
        if (direction === "next") {
            setPageOptions({pageSize:5, pageNumber:pageOptions.pageNumber+1})
        }else if (direction === "prev") {
            setPageOptions({pageSize:5, pageNumber:pageOptions.pageNumber-1})
        } else if (direction === "change") {
            setPageOptions({
                pageSize: pageSize ? pageSize:5,
                pageNumber:1,
            })
        }
    }

    return (
        <>
            {isLoading && <MainLoader />}
            {!isLoading && (
                <>
                    <div className="d-flex align-items-center justify-content-between mx-5 mt-5">
                        <h1 className="text-success">Orders List</h1>
                        <div className="d-flex" style={{ width: "40%" }}>
                            <input type="text"
                                name="searchString"
                                className="form-control mx-2"
                                onChange={handleChange}
                                placeholder="Search Name, Email or Phone" />
                            <select className="form-select w-50 mx-2" onChange={handleChange} name="status">
                                {filterOptins.map((item,index) => (
                                    <option value={item === 'All' ? "" : item} key={index}>{item}</option>
                                ))}
                            </select>
                            <button className="btn btn-outline-success" onClick={handleFilter}>Filter</button>
                        </div>
                    </div>
                    <OrderList isLoading={isLoading} orderData={orderData} />
                    <div className="d-flex justify-content-end align-items-center container">
                        <div>Rows per page: </div>
                        <div>
                            <select 
                            className="form-select mx-2"
                            onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>{
                                handlePageOptionChange("change",Number(e.target.value))
                                setCurrentPageSize(Number(e.target.value))
                            }}
                            style={{width:"80px"}}
                            value={currentPageSize}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <div className="m-2">{getPageDetails()}</div>
                        <button 
                        onClick={() => handlePageOptionChange("prev")}
                        disabled={pageOptions.pageNumber === 1}
                        className="btn btn-sm btn-outline-primary px-3 mx-2">
                            <i className="bi bi-chevron-left"></i>
                        </button>
                        <button 
                        onClick={() => handlePageOptionChange("next")}
                        disabled={pageOptions.pageNumber * pageOptions.pageSize >= totalRecords}
                        className="btn btn-sm btn-outline-primary px-3 mx-2">
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    </div>
                </>
            )}
        </>
    )
}

export default withAdminAuth(AllOrders)