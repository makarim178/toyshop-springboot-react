import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios';
import AddBrands from './AddBrands';
import BrandsTable from './BrandsTable';

const BrandsCrudPage = ({brands, loadBrands}) => {

    const [loadAddBrands, setloadAddBrands] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const getARedirect = redirect => {
        if(redirect) {
            return <Redirect to="/product" />
        }
    }

    const refreshPage = () => { window.location.reload(false) }

    const removeBrands = async (brand) => {

        const response = await axios.delete(`http://localhost:8080/brands/${brand.id}`)
        setRedirect(true);
        refreshPage();
    }

    const actionBrands = (action, brand) => {
        switch(action) {
            case "add": 
                setloadAddBrands(!loadAddBrands);
                //console.log(loadAddProd);
                break;
            case "remove": console.log("clicked remove");
                        removeBrands(brand);
                        break;
            default: setloadAddBrands(false);
        }
    }

    return (
        <div>
            {getARedirect()}
            <div className = "container-fluid">
                <h3 className="text-primary text-left">Brands Page</h3>        


                <div className="list-group">
                    <AddBrands actionBrands={actionBrands} loadBrands={loadBrands}/>
                </div>
            </div>

            <br />

            <div className="col-6">
                <h5>Product List</h5>
                <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        brands.map((brand, index) => {
 
                        return (<BrandsTable brand={brand} actionBrands={actionBrands} />)})
                    } 
                </tbody>
                </table>
            </div>


        </div>
    )
}

export default BrandsCrudPage;
