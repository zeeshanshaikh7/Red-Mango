import logo from '../../assets/Images/mango.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { cartItemModel, userModel } from '../../interfaces'
import { emptyUserState, RootState, setLoggedInUser } from '../../Storage'
import { SD_Roles } from '../../Utilities/SD'

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  )
  const userData: userModel = useSelector((state: RootState) => state.userAuthStore)

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setLoggedInUser({ ...emptyUserState }))
    navigate("/")
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <NavLink className="nav-link" aria-current="page" to="/">
            <img src={logo} alt="" style={{ height: "40px" }} className='m-1' />
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
              </li>
              {userData.role === SD_Roles.ADMIN ? (
                <li className="nav-item dropdown">
                  <NavLink className="nav-link dropdown-toggle" to={"*"} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Admin Panel
                  </NavLink>

                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to='/menuitem/menuitemlist'>Menu Item List</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" to='/order/myOrders'>My Orders</Link></li>
                    <li><Link className="dropdown-item" to='/order/allOrders'>All Orders</Link></li>
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/order/myOrders">
                    Orders
                  </NavLink>
                </li>
              )}


              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/shoppingcart">
                  <i className='bi bi-cart'></i>
                  <span className="badge text-bg-secondary mx-1 px-2">
                    {userData.id && `${shoppingCartFromStore.length}`}
                  </span>
                </NavLink>
              </li>



              <div className='d-flex' style={{ marginLeft: "auto" }}>
                {userData.id && (
                  <>
                    <li className='nav-item'>
                      <button
                        className='nav-link active'
                        style={{
                          cursor: "pointer",
                          background: "transparent",
                          border: 0
                        }}
                      >
                        Welcome, {userData.fullName}
                      </button>
                    </li>
                    <li className='nav-item'>
                      <button
                        className='btn btn-success btn-outlined rounded-pill text-white mx-2'
                        onClick={handleLogout}
                        style={{
                          border: "none",
                          height: "40px",
                          width: "100px"
                        }}
                      >Logout</button>
                    </li>
                  </>
                )}

                {!userData.id && (
                  <>
                    <li className='nav-item text-white'>
                      <NavLink className='nav-link' to='/register'>
                        Register
                      </NavLink>
                    </li>
                    <li className='nav-item text-white'>
                      <NavLink className='btn btn-success btn-outlined rounded-pill text-white mx-2'
                        style={{
                          border: "none",
                          height: "40px",
                          width: "100px"
                        }} to='/login'>
                        Login
                      </NavLink>
                    </li>
                  </>
                )}

              </div>
            </ul>

          </div>
        </div>
      </nav>
    </>
  )
}

export default Header