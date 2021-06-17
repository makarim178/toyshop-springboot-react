import React, { useState } from 'react'
import ImageHelper from './helper/ImageHelper'
import { Redirect, Link } from 'react-router-dom'
import { addItemToCart, removeItemFromCart } from './helper/cartHelper'
import { isAuthenticated } from '../auth/helper'

const Card = ({
    product, 
    addtoCart = true, 
    removeFromCart= true,
    reload = undefined,
    setReload = f => f,
  }) => {

  const [redirect, setRedirect] = useState(false)
  const cartTitle = product ? product.name : 'default name'
  const cartDescription = product ? product.description.substring(0,100) + "..." : 'default Description'
  const cartPrice = product ? product.price : '0.00'

  const refreshPage = () => { window.location.reload(false) } 

  const addToCart = () => {
      addItemToCart(product, () => {setRedirect(true)})
      // setRedirect(true)
      
      // if(isAuthenticated()) {
      //      addItemToCart(product, () => {
      //      setRedirect(true)
      //     })
      //    //console.log('Add to Cart');
      // } else {
      //     console.log('Login Please');
      // }
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
      className="fas fa-eye text-primary border-0 rounded"
      />

      // <button className="btn btn-primary" onClick={justTest} >JustClick</button>
    )
  }

  const showRemoveFromCart = (removeFromCart) => {
      return (
        removeFromCart && (
          <button
            onClick={() => {
              //TODO: handle this too
              removeItemFromCart(product.id)
              refreshPage()
              setReload(!reload)
              // console.log("Product removed from cart");
            }}
            className="far fa-minus-square text-warning border-0 rounded"
          >
          </button>
        )
      )}

  return (

    <div  className="card rounded">
        <ImageHelper product={product}/>
      <div className="card-body">
      {getARedirect(redirect)}
        <h5 className="card-title text-small text-dark">{cartTitle}</h5>
        <div className="clearfix">
          <p className="card-text font-weight-bold float-left text-dark">Price: ${cartPrice} </p>
        <p className="card-text font-weight-bold float-right">
          {/* <button className="fas fa-eye text-primary border-0 rounded"></button> */}
          {showDetailProduct()}
          &nbsp;
          {showRemoveFromCart(removeFromCart)}
          {/* <button className="far fa-minus-square text-warning border-0 rounded"></button> */}
          {/* <!--<a href="#" class="far fa-minus-square text-warning"></a>--> */}
          &nbsp;
          {showAddToCart(addToCart)}
          {/* <button  className="fas fa-cart-plus text-success border-0 rounded"></button> */}
          {/* <!--<a href=""  class="fas fa-cart-plus text-success"></a>--> */}
        </p>
      </div>
      <div className="clearfix">
          <p className="text-primary notifyTxt">Free Shipping when you spend $35 and more</p>
      </div>
      </div>
    </div>
  //     <div className="card text-white bg-dark border border-info ">
  //       <div className="card-header lead">{cartTitle}</div>
  //       <div className="card-body">
  //         {getARedirect(redirect)}
  //         <div className="rounded border border-success p-2">
  //           <ImageHelper product={product}/>
  //         </div>
  //         <p className="lead bg-success font-weight-normal text-wrap">
  //           {cartDescription}
  //         </p>
  // <p className="btn btn-success rounded  btn-sm px-4">${cartPrice}</p>
  //         <div className="row">
  //           <div className="col-12">
  //             {showAddToCart(addToCart)}
  //           </div>
  //           <div className="col-12">
  //             {showRemoveFromCart(removeFromCart)}
  //           </div>
  //           <div className="col-12">
  //             {showDetailProduct()}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
    );
}

export default Card