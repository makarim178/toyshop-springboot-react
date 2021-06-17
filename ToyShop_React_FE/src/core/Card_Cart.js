import React, { useState, useEffect } from 'react'
import ImageHelper from './helper/ImageHelper'
import { Redirect, Link } from 'react-router-dom'
import { addItemToCart, cartEmpty, removeItemFromCart } from './helper/cartHelper'
import { getBrandName } from './helper/coreapicalls'


const CardCart = ({
    product, 
    addtoCart = true, 
    removeFromCart= true,
    reload = undefined,
    setReload = f => f,
  }) => {
    const [redirect, setRedirect] = useState(false)
    const cartTitle = product ? product.name : 'default name'
    const cartDescription = product ? product.description.substring(0,300) + "..." : 'default Description'
    const prodQty = product ? product.quantity : 1
    const [brandsname, setBrandsname] = useState("")
    const cartPrice = product ? "$ " + parseFloat(product.price) * parseFloat(prodQty) : '0.00'

    const refreshPage = () => { window.location.reload(false) }

    const getBrandsName = () => {
        getBrandName(product.brands).then(data => {
            // console.log(data.name);
            setBrandsname(data.name)
        })
    }

    const addToCart = () => {
        addItemToCart(product, () => {setRedirect(true)})
    }

    const getARedirect = redirect => {
        if(redirect) {
            return <Redirect to="/" />
        }
    }

    const showAddToCart = (addToCart) =>{
        return(
            addtoCart && (
                <button
                  onClick={() => {
                    addToCart()
                    refreshPage()
                    setReload(!reload)
                  }}
                  className="fas fa-cart-plus text-success border-0 rounded"
                >
                </button>
            )
        )
    }

    const showDetailProduct = () => {
        return(
          <Link to={
            {pathname : "/productDetails",
            state: product}
          }
          className="fas fa-eye text-primary border-0 rounded mx-2"
          />
    
          // <button className="btn btn-primary" onClick={justTest} >JustClick</button>
        )
      }


      const showRemoveFromCart = (removeFromCart) => {
        return (
          removeFromCart && (
            <button
              onClick={() => {
                removeItemFromCart(product.id)
                refreshPage()
                setReload(!reload)
              }}
              className="far fa-minus-square text-warning border-0 rounded"
            >
            </button>
          )
        )}

        useEffect(() => {
            getBrandsName()
        }, [])

        return (
            <div  className="border rounded row my-3">

                <div className="col-md-3">
                    <ImageHelper product={product} />
                </div>

                <div className="col-md-9 p-4">

                    <h3 className="text-primary text-left font-weight-bolder"> {brandsname} </h3>


                    <h2 className="text-justify text-dark text-left font-weight-bolder">{cartTitle}</h2>
                    <p className="text-justify text-dark text-left px-5"> {cartDescription} </p>
                    <hr/>
                    <h4 className="text-justify text-dark text-right font-weight-bolder">
                        <span className="mx-5">View Details: {showDetailProduct()}</span>
                        Quantity: {showRemoveFromCart(removeFromCart)}
                        {prodQty} {showAddToCart(addToCart)}

                        <span className="mx-5">price: {cartPrice}</span> 
                    </h4>
                    {/* <div className="card-body">
                    {getARedirect(redirect)}
                        <h5 className="card-title text-small text-dark">{cartTitle}</h5>
                        <div className="clearfix">
                        <p className="card-text font-weight-bold float-left text-dark">Price: ${cartPrice} </p>
                        <p className="card-text font-weight-bold float-right">
                        {showDetailProduct()}
                        &nbsp;
                        {showRemoveFromCart(removeFromCart)}
                        &nbsp;
                        {showAddToCart(addToCart)}
                        </p>
                    </div>
                    <div className="clearfix">
                        <p className="text-primary notifyTxt">Free Shipping when you spend $35 and more</p>
                    </div>
                    </div> */}
                </div>
                
            </div>
        )
  }

  export default CardCart