import { useState } from "react"
import { useParams } from "react-router-dom";
import { useGetMenuItemByIdQuery, useUpdateShoppingCartMutation } from "../API";
import foodItems from "../assets/foods";
import { useNavigate } from "react-router-dom";
import { MainLoader, MiniLoader } from "../components/pages/common";
import { apiResponse, userModel } from "../interfaces";
import { toastNotify } from "../Helper";
import { useSelector } from "react-redux";
import { RootState } from "../Storage";


/* USER ID: 1cfc7b98-2d40-4747-bebc-a3fa46e66abf */

export const MenuItemDetails = () => {
  const userData:userModel = useSelector((state:RootState) => state.userAuthStore)
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState<number>(1);
  const { menuItemId } = useParams();
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false)

  const { data, isLoading } = useGetMenuItemByIdQuery(menuItemId);
  const [updateShoppingCart] = useUpdateShoppingCartMutation()


  // handle adding to cart
  const handleShoppingCart = async (menuItemId: number) => {

    if(!userData.id) {
      navigate("/login");
      return;
    }
    
    setIsAddingToCart(true)
    const response: apiResponse = await updateShoppingCart({ 
      menuItemId: menuItemId, 
      updateQuantityBy: quantity, 
      userId: userData.id })

    if (response.data && response.data.isSuccess) {
      toastNotify('Item added to Cart!')
    }

    setIsAddingToCart(false)
  }


  const handleQuantity = (counter: number) => {
    let newQantity = quantity + counter
    if (newQantity == 0) {
      newQantity = 1
    }
    setQuantity(newQantity)
    return
  }



  if (isLoading) {
    return (
      <>
        <MainLoader />
      </>
    )
  }

  return (
    <div className="container pt-4 pt-md-5">
      <div className="row">
        <div className="col-8 offset-2 col-md-3 order-md-2 mb-4">
          <img
            src={foodItems[data.result.id - 1]}
            width="100%"
            style={{ borderRadius: "20%" }}
            alt="No content"
          />
        </div>
        <div className="col-12 col-md-7 order-md-1 mb-4 mb-md-0">
          <h2 className="text-success">{data.result.name}</h2>
          <div className="d-flex flex-wrap gap-2">
            <span className="badge text-bg-warning px-4 py-2" style={{ height: "40px", fontSize: "16px" }}>
              {data.result.category}
            </span>
            <span className="badge text-bg-light px-4 py-2" style={{ height: "40px", fontSize: "16px" }}>
              {data.result.specialTag}
            </span>
          </div>
          <p className="pt-2" style={{ fontSize: "16px" }}>
            {data.result.description}
          </p>
          <div className="d-flex align-items-center gap-3">
            <span className="h3">${data.result.price}</span>
            <span className="d-flex align-items-center p-2" style={{ border: "1px solid #333", borderRadius: "30px" }}>
              <i
                onClick={() => handleQuantity(-1)}
                className="bi bi-dash p-1"
                style={{ fontSize: "20px", cursor: "pointer" }}
              ></i>
              <span className="h4 px-3">{quantity}</span>
              <i
                onClick={() => handleQuantity(1)}
                className="bi bi-plus p-1"
                style={{ fontSize: "20px", cursor: "pointer" }}
              ></i>
            </span>
          </div>
          <div className="row pt-4">
            <div className="col-6">
              {isAddingToCart ? (
                <button className="btn btn-success form-control">
                  <MiniLoader type="warning" size={80} />
                </button>
              ) :
                (<button
                  onClick={() => handleShoppingCart(data.result.id)}
                  className="btn btn-success form-control">Add to Cart</button>)}
            </div>
            <div className="col-6">
              <button
                onClick={() => navigate(-1)}
                className="btn btn-secondary form-control">Back to Home</button>
            </div>
          </div>
        </div>

      </div>
    </div>

  )
}
