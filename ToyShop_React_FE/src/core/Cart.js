import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Base from './Base'
import CardCart from './Card_Cart'
import { loadCart } from './helper/cartHelper'
import OrderSummary from './orderSummary'
// import PaymentB from './PaymentB'

const Cart = () => {
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQty, setTotalQty] = useState(0)

    const tax = parseFloat(totalPrice) * 0.13
    const shippingCharge = 5.99
    const totalPay = parseFloat(totalPrice) + parseFloat(tax)
    const shippingDiscount = (totalPay > 35) ? -5.99 : 0.00
    const getSummary = () => {
        let totQty = 0, totPrice = 0
        let cart = loadCart()

        cart.map((item, index) => {
            totQty += parseInt(item.quantity)
            totPrice += ( parseInt(item.quantity) * parseFloat(item.price))
        })

        setProducts(cart)
        setTotalQty(totQty)
        setTotalPrice(totPrice)
            
            // data.map((item, index) => {
            //     totQty += parseInt(item.quantity)
            //     totPrice += ( parseInt(item.quantity) * parseFloat(item.price))
            //     console.log("item", item);
            //     //cart.push(item)
            // })

            // console.log("cart", cart);
            // setProducts(cart)
            // setTotalPrice(totPrice)
            // setTotalQty(totQty)
            // console.log("totPrice", totPrice);
            // console.log("totQty", totQty);

    }

    useEffect(() => {
        getSummary()
        // setProducts(loadCart())
    }, [reload])


    const loadAllProducts = (products) => {
        if(products.length > 0){
            return(
                <div>
                    {products.map((product, index) => (
                        <CardCart key={index} product ={product} removeFromCart = {true} addToCart={false} reload={reload} setReload = {setReload} />
                    ))}
                </div>
            )
        }else {
            return(
                <div>
                    <h2>Cart is Empty</h2>
                </div>
            )
        }
    }

    return (
            <Base title="Welcome to Cart" description="Review your cart and make payment here" >
                <h2 className="text-primary font-font-weight-bold text-center">WELCOME SHOPPING CART</h2>
                <h5 className="text-success font-font-weight-bold text-center"> <Link to="/" className="text-secondary">&lt;&lt;&lt; CONTINUE SHOPPING</Link></h5>

                <hr />

                <div className="row text-center">
                    <div className ="col-md-8">
                        {loadAllProducts(products)}
                    </div>
                    <div className="col-md-4">
                        <OrderSummary 
                            totalPrice={totalPrice} 
                            shippingCharge ={shippingCharge} 
                            shippingDiscount ={shippingDiscount} 
                            tax = {tax} 
                            totalPay ={totalPay}
                            cart = {products}
                        />
                    </div>
                    {/* <div className ="col-6">
                        { products.length > 0 
                        ? ( 
                            <PaymentB products={products} setReload = {setReload} />
                         ): (
                             <h3>Please Login or Add something to Cart</h3>
                         )
                        }
                    </div> */}
                </div>
            </Base>
    )
}


export default Cart