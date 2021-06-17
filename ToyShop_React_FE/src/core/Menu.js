import React, { useState, useEffect, Fragment} from 'react'
import { Link, withRouter} from 'react-router-dom'
import { signout, isAuthenticated } from '../auth/helper'

import toyShop_Logo_png from '../assets/images/toyShop_Logo_png.png'

const Menu = ({history, path}) => {
    const [products, setProducts] = useState(0)

    useEffect(() => {
        getCartQty()
    }, [])

    const getCartQty = () => {
        let cart =  JSON.parse(localStorage.getItem("cart"))

        if(cart) {
            console.log("cart: ", cart.length);
            let qty = 0
            if (cart.length > 0) {
                cart.map((element, i) => {
                    qty += element.quantity
                })
    
                setProducts(qty)
            }
        }
    }

    const currentTab = (history, path) => {
        
        // setProducts(localStorage.getItem("cart"))
        if(history.location.pathname === path) {
            return {color: 'blue'}
        }else {
            return {color: 'gray'}
        }
    }

    return (
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm sticky-top">
            <div className="my-0 mr-md-auto font-weight-normal">
                <a className="navbar-brand" href="/">
                    <img src={toyShop_Logo_png}
                        style={{ maxHeight: "50%", maxWidth: "50%" }}
                        className="mb-3 rounded"
                    />
                </a>
            </div>
            <nav className="my-2 my-md-0 mr-md-3">
                <Link style={currentTab(history, "/")} className="p-2" to="/">HOME</Link>
                {isAuthenticated() && (
                        <Link style={currentTab(history, "/user/dashboard")} className="p-2" to="/user/dashboard">USER DASHBOARD</Link>
                )}
            
                <span className="mx-5"></span>
                
                <Link style={currentTab(history, "/cart")} className="btn btn-primary text-white p-2 m-5 right" to="/cart">
                        <i className="fas fa-shopping-cart text-white px-2"/>
                        Cart <span className="badge badge-light">{products}</span>
                </Link>
                

                {!isAuthenticated() && (
                    <Fragment>
                        <Link style={currentTab(history, "/signin")} className="p-2 text-primary" to="/signin">Signin</Link>
                        <Link style={currentTab(history, "/signup")} className="p-2 text-success" to="/signup">Register</Link>
                    </Fragment>
                )}
            </nav>
            {isAuthenticated() && (
                    <Fragment>
                        <Link style={currentTab(history, "/user/profile")} className="p-2" to="/user/profile"><i className="fas fa-user px-1"></i> | {JSON.parse(localStorage.getItem("jwt")).name}</Link>
                        <a href="/"
                                    className="nav-link text-warning"
                                    onClick={() => {
                                        signout(() => {
                                            history.push("/signin")
                                        })
                                    }}
                                >Signout</a>
                    </Fragment>
                )}
        </div>
    )
}


export default withRouter(Menu) 