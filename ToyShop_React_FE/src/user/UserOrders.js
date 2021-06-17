import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Base from '../core/Base';

const UserOrders = () => {

    const [userid, setUserId] = useState();
    const [orders, setOrders] = useState([]);

    const loadLoggedUser = () => {
        const user = JSON.parse(localStorage.getItem('jwt'));
        setUserId(user.id);
        loadOrdersByUser(user.id);
    }

    const loadOrdersByUser = async (id) => {
        const response = await axios
                .get(`http://localhost:8080/order/user/${id}`)
                .then( response => {
                    setOrders(response.data);
                    //console.log(response.data);
                })
    }

    useEffect(() => {
        loadLoggedUser();
    }, [])
    return (
        <Base title="Orders By User" description="Orders By User">
            <div className="row">
                <div className="col-md-2 bg-light-gray">
                    <ul className="list-group">
                        <Link to="/user/profile"  className="list-group-item text-dark font-weight-bolder nav-link  ">My Details</Link>
                        <Link to="/user/orders" className="list-group-item text-white font-weight-bolder nav-link active" style={{cursor: "pointer", textDecoration: "none"}}>My Orders</Link>
                        <li className="list-group-item text-dark font-weight-bolder nav-link" style={{cursor: "pointer", textDecoration: "none"}}>My Wishlist</li>
                        <li className="list-group-item text-dark font-weight-bolder nav-link" style={{cursor: "pointer", textDecoration: "none"}}>Check Order Status</li>
                        <li className="list-group-item text-dark font-weight-bolder nav-link" style={{cursor: "pointer", textDecoration: "none"}}>Log Out</li>
                    </ul>
                </div>
                <div className="col-md-10 bg-light-gray">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-primary">Orders by User</h3>
                        </div>

                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Order Id</th>
                                    <th>Total Products</th>
                                    <th>Transaction Id</th>
                                    <th>Total Amount</th>
                                    <th>E-mail</th>
                                    <th>Delivery City</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order,index) => {
                                    return(
                                        <tr>
                                            <td>{order.id}</td>
                                            <td>
                                                <Link to={{pathname : "/user/orderdetails", state: order}}>{order.total_products}</Link>
                                            </td>
                                            <td>{order.transaction_id}</td>
                                            <td>{order.total_amount}</td>
                                            <td>{order.email}</td>
                                            <td>{order.city}</td>
                                            <td><h6 className="alert-primary text-center text-white p-2">Order Processing</h6></td>
                                        </tr>
                                    )
                                })}
                                
                            </tbody>
                            
                        </table>
                        
                    </div>

                </div>
            </div>
        </Base>
    )
}

export default UserOrders;
