import { apiResponse, menuItemModel, userModel } from "../../../interfaces"
import { useState } from "react"
import foodItems from "../../../assets/foods"
import { Link } from "react-router-dom"
import { useUpdateShoppingCartMutation } from "../../../API"
import { toastNotify } from "../../../Helper"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RootState } from "../../../Storage"

interface Props {
  menuItem: menuItemModel
}

function MenuCards(props: Props) {
  const navigate = useNavigate();
  const userData: userModel = useSelector((state: RootState) => state.userAuthStore)
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false)
  const [updateShoppingCart] = useUpdateShoppingCartMutation()

  const handleShoppingCart = async (menuItemId: number) => {

    if (!userData.id) {
      navigate("/login");
      return;
    }
    setIsAddingToCart(true)
    const response: apiResponse = await updateShoppingCart({ menuItemId: menuItemId, updateQuantityBy: 1, userId: userData.id })

    if (response.data && response.data.isSuccess) {
      toastNotify('Item added to Cart!')
    }
    setIsAddingToCart(false)
  }

  return (

    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 d-flex">
      <div
        className="card shadow-sm h-100 mx-auto"
        style={{ maxWidth: "100%", width: "100%", minWidth: "200px" }}
      >
        <div className="position-relative">
          <Link to={`/menuItemDetails/${props.menuItem.id}`}>
            <img
              src={foodItems[props.menuItem.id - 1] || props.menuItem.image}
              className="card-img-top"
              alt={props.menuItem.name}
              style={{ height: "150px", objectFit: "cover", borderRadius: "0" }}
            />
          </Link>
          {props.menuItem.specialTag && (
            <span
              className="badge bg-success position-absolute"
              style={{ top: "10px", left: "10px" }}
            >
              {props.menuItem.specialTag}
            </span>
          )}
        </div>
        <div className="card-body d-flex flex-column justify-content-between">
          <div className="text-center mt-2">
            <h5 className="card-title" style={{ fontSize: "1.25rem" }}>
              <Link
                to={`/menuItemDetails/${props.menuItem.id}`}
                className="text-decoration-none text-success"
              >
                {props.menuItem.name}
              </Link>
            </h5>
            <p className="badge bg-secondary mb-2" style={{ fontSize: "10px" }}>
              {props.menuItem.category}
            </p>
            <p className="card-text text-center mb-2" style={{ fontSize: "0.875rem" }}>
              {props.menuItem.description}
            </p>
            <h5 className="text-center" style={{ fontSize: "1.25rem" }}>${props.menuItem.price}</h5>
          </div>
          <div className="text-center mt-2">
            {isAddingToCart ? (
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleShoppingCart(props.menuItem.id)}
              >
                <i className="bi bi-cart-plus me-2"></i>
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>

  )
}

export default MenuCards



/* <div className="col-md-4 col-12 p-4">
      <div
        className="card"
        style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}
      >
        <div className="card-body pt-2">
          <div className="row col-10 offset-1 p-4">
            <Link to={`/menuItemDetails/${props.menuItem.id}`}>
              <img
                src={foodItems[props.menuItem.id - 1] || props.menuItem.image}
                style={{ borderRadius: "50%" }}
                alt=""
                className="w-100 mt-5 image-box"
              />
            </Link>

          </div>
          {props.menuItem.specialTag && props.menuItem.specialTag.length > 0 && (
            <i
              className="bi bi-star btn btn-success"
              style={{
                position: "absolute",
                top: "15px",
                left: "15px",
                padding: "5px 10px",
                borderRadius: "3px",
                outline: "none !important",
                cursor: "pointer",
              }}
            >
              &nbsp; {props.menuItem.specialTag}
            </i>
          )}


          {isAddingToCart ? (
            <div style={{
              position: "absolute",
              top: "15px",
              right: "15px"
            }}>
              <MiniLoader type="warning" size={100} />
            </div>
          ) : (
            <i
              className="bi bi-cart-plus btn btn-outline-danger"
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                padding: "5px 10px",
                borderRadius: "3px",
                outline: "none !important",
                cursor: "pointer",
              }}
              onClick={() => handleShoppingCart(props.menuItem.id)}
            ></i>
          )}

          <div className="text-center">
            <p className="card-title m-0 text-success fs-3">
              <Link to={`/menuItemDetails/${props.menuItem.id}`}
                style={{ textDecoration: "none", color: "green" }}>
                {props.menuItem.name}
              </Link>
            </p>

            <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
              {props.menuItem.category}
            </p>
          </div>
          <p className="card-text" style={{ textAlign: "center" }}>
            {props.menuItem.description}
          </p>
          <div className="row text-center">
            <h4>${props.menuItem.price}</h4>
          </div>
        </div>
      </div>
    </div> */