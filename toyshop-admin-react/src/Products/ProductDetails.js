import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import Base from '../core/Base'
import ImageHelper from '../core/helpers/ImageHelper'
import axios from 'axios'

const ProductDetails = () => {

    const location = useLocation().state;
    const [brands, setBrands] = useState("")



    const getBrand = async () =>{
        await axios.get(`http://localhost:8080/brands/${location.brands}`).then(response => {
            setBrands(response.data.name)
        })
    } 

    
    //console.log(location);
    
    const showProduct = () => (
        <div className="container-fluid row">
            <div className="col-md-4 border rounded">
                <ImageHelper product={location} />
            </div>
            <div className="col-md-8 border rounded px-5 pt-4">
                <h3 className="text-primary font-weight-bolder text-uppercase">{brands}</h3>
                <h2 className="text-dark font-smaller">{location.name}</h2>
                <h5 className="text-black-50 font-weight-lighter text-justify pr-5 mr-5" >{location.description}</h5>
                <hr className="mr-5" />
                <h5 className="card-title text-right mr-5 pr-5">Price: </h5>
                <h3 className="text-right text-primary mr-5 pr-5">${location.price}</h3>
            </div>
            
        </div>
    )

    useEffect(() => {
        getBrand()
    }, [])

    return (
        <Base title="Product Details Page" description="A page to view the details of a product!">
            <h2 className="text-primary font-font-weight-bold text-center">PRODUCT DETAILS</h2>
                <h5 className="text-success font-font-weight-bold text-right"> <Link to="/product" className="text-secondary">&lt;&lt;&lt; Go Back &lt;&lt;&lt;</Link></h5>

                <hr />
            {showProduct()}
        </Base>
    )
}

export default ProductDetails
