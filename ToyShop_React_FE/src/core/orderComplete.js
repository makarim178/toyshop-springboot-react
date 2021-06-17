import React from 'react'
import { Link } from 'react-router-dom'
import Base from './Base'

const OrderComplete = () => {
    return (
        <Base title="Your Order has been Successfull!" description="Your Receipt has been sent to your e-mail address!">
            <h2 className="text-primary font-font-weight-bold text-center">Your Order has been Successfull</h2>
                <h5 className="text-success font-font-weight-bold text-center"> 
                    Your Receipt has been sent to your e-mail address!
                    <Link to="/" className="text-secondary"> ...Continue Shopping</Link>
                </h5>
        </Base>
    )
}

export default OrderComplete
