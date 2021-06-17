import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import { cartEmpty } from './helper/cartHelper'
import { getmeToken, processPayment } from './helper/paymentHelper'
import { createOrder, createOrderDetails } from './helper/orderHelper'
import { isAuthenticated, signout } from '../auth/helper'
import DropIn from 'braintree-web-drop-in-react'

import axios from 'axios'

const PaymentB = ({products
        , summary
        , firstName, lastName, phoneNumber, email, streetAddress, postalCode, province, city
        , reload = undefined
        , setReload = (f) => f
    }) => {
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {},
    })

    const [orderid, setOrderId] = useState("")
    
    const [redirect, setRedirect] = useState(false)
    const {totalPrice, shippingCharge, shippingDiscount, tax, totalPay} = summary

    const [orderStatus, setOrderStatus] = useState(false)


    

    const user = localStorage.getItem("jwt");
    

    const userId = isAuthenticated() ? user.email : email
    const token = isAuthenticated() ? user.session_token : "x"

    const refreshPage = () => { window.location.reload(false) }

    const getARedirect = redirect => {
        if(redirect) {
            return <Redirect to="/orderComplete" />
        }
    }

    const getToken = async () => {

        const response = await axios.get("http://localhost:8080/payment/gettoken/");

        setInfo({...info, clientToken: response.data})

    }

    useEffect(() => {
        getToken()
    }, [])

    const onPurchase = async () => {
        setInfo({loading: true})
        let nonce
        let getNonce = info.instance.requestPaymentMethod().then(data => {
            nonce = data.nonce
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: parseFloat(totalPay).toFixed(2)
            }
            

            // process payment in server
            processPayment(paymentData)
                .then( response => {
                    if(!response.status) {
                        console.log(response.status);
                    } else{
                        setInfo({...info, success: response.status, loading: false })
                        console.log("Payment Success!");
                    
                        let product_names = ""
                        let total_pro = 0
                        products.forEach(function(item){
                            product_names += item.id + ", "
                            total_pro++
                        })

                        let userid = null;
                        if (isAuthenticated()) {
                          const user = isAuthenticated();
                          userid = user.id;
                        }
                         
    
                        const orderData = {
                            user_id: userid,
                            productname: product_names,
                            total_products: total_pro,
                            transaction_id: response.transactionid,
                            total_amount: parseFloat(totalPay).toFixed(2).toString(),
                            firstname: firstName, 
                            lastname: lastName,
                            phonenumber: phoneNumber,
                            email: email,
                            streetaddress: streetAddress,
                            postalcode: postalCode,
                            province: province,
                            city: city,
                            country: "Canada"
                        }
                        
                        createOrder(orderData).then(responce => {
                            console.log("from create order: " + response);
                            if(!responce.success) {
                                if(responce.code === '1'){
                                    signout(() => { return <Redirect to="/" />})
                                }
                            } else {
                                if(responce.success) {
                                    let prod = []
                                    products.map((item, index) => {
                                        item.orderid = responce.order.id
                                        createOrderDetails({
                                            orderid: item.orderid, 
                                            productid: item.id,
                                            productname: item.name,
                                            productqty: item.quantity,
                                            productprice: item.price
                                        }).then(response => {
                                            console.log(response)
                                        }).catch(err => console.log(err))
                                    })
                                    
                                }
                            }
                        })                       

                        cartEmpty(() => {
                            setRedirect(true)
                            setReload(!reload)

                        })                      

                        
                    }

                })
                .catch(e => console.log(e))

        }).catch(e=>console.log(e))
    }

    const showBtnDropIn = () => {
        return (
            <div>
                {
                    info.clientToken !== null && products.length > 0 
                    ? (
                        <div>
                            <DropIn 
                                options={{authorization: info.clientToken}}
                                onInstance={instance => (
                                    info.instance = instance
                                )}
                            />

                            <button 
                                className="btn btn-block btn-success" 
                                onClick={onPurchase}
                            >Buy Now</button>
                        </div>
                    ) : (
                        <h3>Please Login First or Add something in Cart</h3>
                    )
                }
            </div>
        )
    }


    return (
        <div>
          {getARedirect(redirect)}
          <h3>Your Bill is: ${parseFloat(totalPay).toFixed(2)}</h3> 

          {!orderStatus ?  showBtnDropIn() : (<h2>Order Placed Successfully!</h2>)}

        </div>
    )
}

export default PaymentB
