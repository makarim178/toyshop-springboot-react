import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import Base from '../core/Base'
import { getBrandName } from '../core/helper/coreapicalls'
import ImageHelper from '../core/helper/ImageHelper'



const ProductDetails = () => {

    const location = useLocation().state;
    const [brands, setBrands] = useState("")



    const getBrand = () =>{
        console.log(`Brands: ${location.brands}`);
        getBrandName(location.brands).then( data => {
            console.log(`Brands Name: ${data.name}`)
            setBrands(data.name)
        }).catch(e => console.log(e))
    } 

    
    //console.log(location);
    
    const showProduct = () => (
        
        <div className="row">
            <div className="col-md-4 border rounded mx-5">
                <ImageHelper product={location} />
            </div>
            <div className="col-md-7 border rounded p-5">
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
                <h5 className="text-success font-font-weight-bold text-right"> <Link to="/" className="text-secondary">&lt;&lt;&lt; Go Back &lt;&lt;&lt;</Link></h5>

                <hr />
            {showProduct()}
        </Base>
    )
}

export default ProductDetails