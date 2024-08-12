import { useDeleteMenuItemsMutaion, useGetMenuItemsQuery } from "../../API"
import { MainLoader } from "../../components/pages/common";
import { menuItemModel } from "../../interfaces";
import foodItems from "../../assets/foods";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function MenuItemList() {
    const { data, isLoading } = useGetMenuItemsQuery(null);
    const [deleteMenuItem] = useDeleteMenuItemsMutaion();
    

    const handleMenuItemDelete =async (id:number) => {
        toast.promise(
            deleteMenuItem(id),
            {
                pending:"Processing your request",
                success:"Item deleted successfully",
                error:"Error encountered",
            }
        )
    }


    const navigate = useNavigate();
    return (
        <>
            {isLoading && <MainLoader />}
            {!isLoading && (
                <>
                    <div className="d-flex align-items-center justify-content-between container mt-4">
                        <h1 className="text-success">MenuItem List</h1>
                        <button
                            onClick={() => navigate(`/menuitem/menuitemUpsert`)}
                            className="btn btn-success">Add New</button>
                    </div>
                    <hr className="container" />
                    <div className="container">
                        <div className="table-responsive-xl">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col" className="col-2">Image</th>
                                        <th scope="col" className="col-1">ID</th>
                                        <th scope="col" className="col-2">Name</th>
                                        <th scope="col" className="col-2">Category</th>
                                        <th scope="col" className="col-1">Price</th>
                                        <th scope="col" className="col-2">Special-Tag</th>
                                        <th scope="col" className="col-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.result.map((menuItem: menuItemModel) => {
                                        return (
                                            <tr key={menuItem.id}>
                                                <td scope="row">
                                                    <img
                                                    src={foodItems[menuItem.id - 1] || menuItem.image}
                                                    alt="no content"
                                                    style={{ width: "100%", maxWidth: "120px" }}
                                                /></td>
                                                <td>{menuItem.id}</td>
                                                <td>{menuItem.name}</td>
                                                <td>{menuItem.category}</td>
                                                <td>{menuItem.price}</td>
                                                <td>{menuItem.specialTag}</td>
                                                <td>
                                                    <button
                                                        onClick={() => navigate(`/menuitem/menuitemUpsert/${menuItem.id}`)}

                                                        className="btn btn-success mx-md-2 my-1">
                                                        <i className="bi bi-pencil-fill"></i>
                                                    </button>
                                                    <button 
                                                    onClick={() => handleMenuItemDelete(menuItem.id)}
                                                    className="btn btn-danger mx-md-2 my-1">
                                                        <i className="bi bi-trash-fill"></i>
                                                    </button>
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

export default MenuItemList


/* 
<div className="table-responsive">
                <div className="table p-5">
                    <div className="d-flex align-items-center justify-content-between">
                        <h1 className="text-success">MenuItem List</h1>
                        <button className="btn btn-success">Add New</button>
                    </div>
                    <div className="p-2">
                        <div className="row border">
                            <div className="col-2">Image</div>
                            <div className="col-1">ID</div>
                            <div className="col-2">Name</div>
                            <div className="col-2">Category</div>
                            <div className="col-1">Price</div>
                            <div className="col-2">Special Tag</div>
                            <div className="col-2">Action</div>
                        </div>
                        <div className="row border">
                            <div className="col-2">
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="no content"
                                    style={{ width: "100%", maxWidth: "120px" }}
                                />
                            </div>
                            <div className="col-1">.id</div>
                            <div className="col-2">.name</div>
                            <div className="col-2">.category</div>
                            <div className="col-1">.price</div>
                            <div className="col-2">.specialTag</div>
                            <div className="col-2">
                                <button className="btn btn-success">
                                    <i className="bi bi-pencil-fill"></i>
                                </button>
                                <button className="btn btn-danger mx-2">
                                    <i className="bi bi-trash-fill"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */