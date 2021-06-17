import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom'
import axios from 'axios'
import Base from '../core/Base';
import ImageHelper from '../core/helper/ImageHelper';


const UserOrderDetails = () => {

    const location = useLocation().state;
    const [orderDetails, setOrderDetails] = useState([]);

    const loadOrderDetails = async (orderid) => {
        //console.log(orderid);
        const response = await 
            axios.get(`http://localhost:8080/orderdetails/orderid/${orderid}`)
                .then((response) => {
                    setOrderDetails(response.data);
                    console.log(response.data);
                })
    }


    useEffect(() => {
        loadOrderDetails(location.id);
    }, [])
    return (
        <Base>
        <div className="row">
            <div className="col-md-2 bg-light-gray">
                <ul className="list-group">
                    <Link to="/user/profile"  className="list-group-item text-dark font-weight-bolder nav-link  ">My Details</Link>
                    <Link to="/user/orders" className="list-group-item text-white font-weight-bolder nav-link active" style={{cursor: "pointer", textDecoration: "none"}}>Order Details</Link>
                    <li className="list-group-item text-dark font-weight-bolder nav-link" style={{cursor: "pointer", textDecoration: "none"}}>My Wishlist</li>
                    <li className="list-group-item text-dark font-weight-bolder nav-link" style={{cursor: "pointer", textDecoration: "none"}}>Check Order Status</li>
                    <li className="list-group-item text-dark font-weight-bolder nav-link" style={{cursor: "pointer", textDecoration: "none"}}>Log Out</li>
                </ul>
            </div>

            <div className="col-md-10 bg-light-gray">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title text-primary">Order Details of Order Id: {location.id}</h3>
                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Brands</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.map((ord, index) => {
                                return(
                                    <tr>
                                        <td>{ord.orderid + '/' + ord.orderDetialsid} </td>
                                        <td>
                                            <div className="rounded p-2">
                                            <img src={ord.image} 
                                                style={{ maxHeight: 50, maxWidth: 50 }}
                                                className="card-img-top img-fluid"
                                            /> 
                                            <span className="text-secondary"> { ord.productname}</span>
                                            </div>
                                        </td>
                                        <td>{ord.productprice}</td>
                                        <td>{ord.productQty}</td>
                                        <td>{ord.brands}</td>
                                        <td>{ord.category}</td>
                                    </tr>
                                )
                            })}
                            
                        </tbody>
                    </table>

                    <h3 className="card-footer"><h6 className="text-right text-warning">
                        <Link to="/user/orders" type="" href=""> &lt; Go Back </Link> </h6></h3>
                </div>

            </div>
        </div>

        </Base>
    )
}

export default UserOrderDetails;