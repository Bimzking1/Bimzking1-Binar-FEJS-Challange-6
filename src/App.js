import React, { useEffect } from "react"
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom'

import Layout from './Layout/Layout'
import Product from "./Page/Product"
import ProductDetail from "./Page/ProductDetail"
import ShoppingCart from "./Page/ShoppingCart"
import Register from "./Page/Register"
import Login from "./Page/Login"
import jwtDecode from "jwt-decode"
import { useDispatch } from "react-redux"
import userSlice from "./store/user"
import axios from 'axios'
import ProtectedRoute from "./Component/HOC/ProtectedRoute"
import UnprotectedRoute from "./Component/HOC/UnprotectedRoute"
import Logout from "./Page/Logout"
import HomeUser from "./Page/HomeUser"
import AdminPage from "./Page/AdminPage"

function App() {

  const dispatch = useDispatch()

  useEffect( () => {
    try {
    const token = localStorage.getItem('minishopAccessToken')
    const userData = jwtDecode(token)
    axios.get(`http://localhost:4000/users/${userData.sub}`)
    .then( res => {
      dispatch( userSlice.actions.addUser( { userData: res.data }))
    })
    } catch {

    }
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* ALL */}
            {/* <Route index element={<HomeUser/>} /> */}
            {/* <Route path="/user" element={<HomeUser/>} /> */}
            {/* <Route path="/admin" element={<AdminPage/>} /> */}
            
            <Route path="products/">
              <Route index element={<Product />} />
              <Route path=":id" element={<ProductDetail />} />
            </Route>            
            <Route path="categories" element={<h1>Categories</h1>} />
            <Route path="shopping-cart" element={<ShoppingCart />} />
            <Route path="logout" element={<Logout/>}/>
            {/* <Route path="login" element={<Login />} /> */}

            {/* PUBLIC ONLY */}
            <Route path="/" element={<UnprotectedRoute/>}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* PROTECTED */}
            <Route path="/" element={<ProtectedRoute/>}>
              {/* <Route path="order-history" element={<h1>Order History</h1>}/> */}
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/user" element={<HomeUser />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
