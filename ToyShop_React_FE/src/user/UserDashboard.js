import React from 'react'
import { Link } from 'react-router-dom'
import Base from '../core/Base'

const UserDashboard = () => {
    return(
        <Base title="User Dashboard" description="User Profile">
            <h2 className="text-primary font-font-weight-bold text-center">WELCOME USER DASHBOARD</h2>
            <hr className="mx-5 my-4" />
            <div className="row">
                <div className="col-md-2 bg-light-gray">
                    <ul className="list-group">
                        <Link to="/user/profile" className="list-group-item text-dark font-weight-bolder nav-link">My Profile</Link>
                        <li class="list-group-item text-dark font-weight-bolder">My Orders</li>
                        <li class="list-group-item text-dark font-weight-bolder">My Wishlist</li>
                        <li class="list-group-item text-dark font-weight-bolder">Check Order Status</li>
                        <li class="list-group-item text-dark font-weight-bolder">Log Out</li>
                    </ul>
                </div>
                <div className="col-md-9">
                    <h5 className="text-info font-weight-light">Please Select To view your options...</h5>
                </div>
            </div>
        </Base> 
    )
}

export default UserDashboard