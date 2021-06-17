import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import AddProducts from './AddProducts'
import ProductTable from './ProductTable';
import axios from 'axios';
const Product = ({products, loadProducts}) => {

    const [loadAddProd, setloadAddProd] = useState(false);
    const [selectedProd, setSelectedProd] = useState(null)
    const [redirect, setRedirect] = useState(false);

    const getARedirect = redirect => {
        if(redirect) {
            return <Redirect to="/product" />
        }
    }
    const refreshPage = () => { window.location.reload(false) }

    const removeProduct = async (product) => {

        const response = await axios.delete(`http://localhost:8080/product/${product.id}`)
        setRedirect(true);
        refreshPage();
    }




    const actionProduct = (action, product) => {
        switch(action) {
            case "addProd": 
                setloadAddProd(!loadAddProd);
                //console.log(loadAddProd);
                break;
            case "remove": console.log("clicked remove");
                        removeProduct(product);
                        break;
            default: setloadAddProd(false);
        }
    }

    return (
        <div >
            {getARedirect()}
            <div className = "container-fluid">
                <h3 className="text-primary text-left">Products Page</h3>        


                <div className="list-group">
                    { <AddProducts actionProduct={actionProduct} loadProducts={loadProducts}/> }
                </div>
            </div>

<br />
            <div>
                <h5>Product List</h5>
                <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Brands</th>
                    <th scope="col">Price</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, index) => {
                            //console.log(product.id);
                        return (<ProductTable product={product} actionProduct={actionProduct} />)})
                    }
                </tbody>
                </table>
            </div>
        </div>
    )
}

export default Product;
