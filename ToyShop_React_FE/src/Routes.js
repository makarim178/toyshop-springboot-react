import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import PrivateRoutes from './auth/helper/PrivateRoutes'
import Signup from './user/Signup'
import Home from './core/Home'
import UserDashboard from './user/UserDashboard'
import Signin from './user/Signin'
import Cart from './core/Cart'
import ProductDetails from './product/productDetails'
import ProcToPay from './core/procToPay'
import OrderComplete from './core/orderComplete'
import Profile from './user/Profile'
import UserOrders from './user/UserOrders'
import UserOrderDetails from './user/UserOrderDetails'



const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/productDetails" component={ProductDetails} />
                <Route exact path="/proceedToPayment" component={ProcToPay} />
                <Route exact path="/orderComplete" component={OrderComplete} />
                <PrivateRoutes exact path="/user/dashboard" component={UserDashboard} />
                <PrivateRoutes exact path="/user/profile" component={Profile} />
                <PrivateRoutes exact path="/user/orders" component={UserOrders} />
                <PrivateRoutes exact path="/user/orderdetails" component={UserOrderDetails} />
                
            </Switch>
        </BrowserRouter>
    )
}

export default Routes