import { useGetShoppingCartQuery } from './API'
import { Footer, Header } from './components/layout'
import { 
  Home, NotFound, MenuItemDetails, ShoppingCart, Login, Register, AuthenticationTest, AuthenticationTestAdmin, AccessDenied, Payment, OrderConfirmed, MyOrder, OrderDetails, AllOrders, MenuItemList, MenuItemUpsert 
} from './pages'
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, setLoggedInUser, setShoppingCartItems } from './Storage'
import { jwtDecode } from 'jwt-decode'
import { userModel } from './interfaces'


function App() {
  const dispatch = useDispatch();
  const [skip,setSkip]=useState(true)
  const userData: userModel = useSelector((state: RootState) => state.userAuthStore)
  const { data, isLoading } = useGetShoppingCartQuery(userData.id,{ skip: skip });

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { fullName, email, id, role }: userModel = jwtDecode(localToken);
      dispatch(setLoggedInUser({ fullName, email, id, role }))
    }
  }, [])


  useEffect(() => {
    if (!isLoading && data && data.result) {
      dispatch(setShoppingCartItems(data.result?.cartItems))
    }
  }, [data,dispatch])

  useEffect(()=>{
    if(userData.id) setSkip(false)
  },[userData.id,userData])


  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/menuItemDetails/:menuItemId' element={<MenuItemDetails />}></Route>
          <Route path='/shoppingcart' element={<ShoppingCart />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/authentication' element={<AuthenticationTest />}></Route>
          <Route path='/authorization' element={<AuthenticationTestAdmin />}></Route>
          <Route path='/accessDenied' element={<AccessDenied />}></Route>
          <Route path='/payment' element={<Payment />}></Route>
          <Route path='/order/orderConfirmed/:id' element={<OrderConfirmed />}></Route>
          <Route path='/order/myOrders' element={<MyOrder />}></Route>
          <Route path='/order/allOrders' element={<AllOrders />}></Route>
          <Route path='/menuitem/menuitemlist' element={<MenuItemList />}></Route>
          <Route path='/menuitem/menuitemUpsert/:id' element={<MenuItemUpsert />}></Route>
          <Route path='/menuitem/menuitemUpsert' element={<MenuItemUpsert />}></Route>
          <Route path='/order/orderDetail/:id' element={<OrderDetails />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
