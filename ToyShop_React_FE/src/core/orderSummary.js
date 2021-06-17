import React from 'react'
import { Link } from 'react-router-dom'

const OrderSummary = ({totalPrice, shippingCharge, shippingDiscount, tax, totalPay, cart}) => {
    // console.log("Order Summary: ", cart);
    return (
            <div className="border rounded m-3">
                <div className="bg-light">
                    <h4 className="py-3 text-uppercase text-dark">Order Summary</h4>
                    
                </div>

                <div className="row p-3">
                    <div className="col-md-7">
                        <p className="text-dark text-right font-weight-bolder pl-5">SubTotal:</p>
                        <p className="text-secondary text-right font-weight-bolder pl-5">Estimated Shipping Charge:</p>
                        <p className="text-secondary text-right font-weight-bolder pl-5">Discounts:</p>
                        <p className="text-secondary text-right font-weight-bolder pl-5">Estimated Tax:</p>
                    </div>
                    <div className="col-md-5">
                        <p className="text-left text-dark font-weight-bolder">$ {totalPrice.toFixed(2)}</p>
                        <p className="text-left text-secondary font-weight-bolder">$ {shippingCharge}</p>
                        <p className="text-left text-secondary font-weight-bolder">{(totalPay > 35) ? "-" : null} $ {shippingDiscount* -1}</p>
                        <p className="text-left text-secondary font-weight-bolder"> $ {tax.toFixed(2)}</p>
                    </div>
                </div>

                <hr className="mx-5"></hr>
                <div className="row p-3">
                    <div className="col-md-6">
                        <h5 className="text-dark text-right font-weight-bolder text-text-uppercase pl-5">Estimated Total:</h5>
                    </div>
                    <div className="col-md-6">
                        <h5 className="text-dark text-left font-weight-bolder text-text-uppercase pl-5">$ {totalPay.toFixed(2)} </h5>
                    </div>
                </div>

                <p className="text-center text-primary">Free Shipping when you spend $35</p>
                <div className="px-5 py-2">
                    <Link to={{pathname : "/proceedToPayment",
                                state:{
                                    cart: cart,
                                    summary: {
                                        totalPrice: totalPrice, 
                                        shippingCharge: shippingCharge, 
                                        shippingDiscount: shippingDiscount, 
                                        tax: tax, 
                                        totalPay: totalPay
                                    }
                                } 
                            }}
                        className="text-text-uppercase btn btn-block btn-outline-primary rounded" >proceed to payment</Link>
                </div>
                
            </div>

    )
}

export default OrderSummary
