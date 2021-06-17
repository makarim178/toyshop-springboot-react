import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoutes from './Auth/Helper/PrivateRoutes';
import Brands from './Brands/Brands';
import UpdateBrands from './Brands/UpdateBrands';
import Category from './Category/Category';
import UpdateCategory from './Category/UpdateCategory';
import Home from './core/Home';
import ProductDetails from './Products/ProductDetails'
import UpdateProduct from './Products/UpdateProduct'
import Login from './Users/Login';


const Routes = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <PrivateRoutes exact path="/product" component={Home} />
                <PrivateRoutes exact path="/productDetails" component={ProductDetails} />
                <PrivateRoutes exact path="/updateProduct" component={UpdateProduct} />
                <PrivateRoutes exact path="/brands" component={Brands} />
                <PrivateRoutes exact path="/updateBrands" component={UpdateBrands} />
                <PrivateRoutes exact path="/category" component={Category} />
                <PrivateRoutes exact path="/updateCategory" component={UpdateCategory} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;