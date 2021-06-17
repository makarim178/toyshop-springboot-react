import React from 'react';

import { Link, withRouter, Redirect} from 'react-router-dom';
import { signout, isAuthenticated } from '../Auth/Helper'



const Menu = ({history, path}) => {


    return (
                <div className="card">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item bg-light">
                            <Link to="/category" className="font-weight-bold text-secondary">Category</Link> 
                        </li>
                        <li className="list-group-item">
                            <Link to="/brands" className="font-weight-bold text-secondary">Brands</Link> 
                        </li>
                        <li className="list-group-item bg-light">
                            <Link to="/product" className="font-weight-bold text-secondary">Products</Link> 
                        </li>
                        <li className="list-group-item">
                            <a 
                                href="/" 
                                className="nav-link text-warning"
                                onClick={() => {
                                    signout(() => {
                                        history.push("/signin")
                                    })
                                }}
                            >Log out</a> 
                        </li>

                    </ul>
                </div>
    )
}

export default Menu;
