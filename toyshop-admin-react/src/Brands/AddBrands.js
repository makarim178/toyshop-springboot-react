import React, {Fragment, useState, useEffect} from 'react'
import axios from 'axios'
import {API} from '../backend'


const AddBrands = ({actionBrands, loadBrands}) => {

    const [loadAddProdUi, setloadAddProdUi] = useState(false);

    const [values, setValues] = useState({
        name: "",
        error: "",
        success: false
    })

    const {name, error, success} = values;

    const handleChange = (name) => (event) => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const checkErrors = () => {

        if (name === "" ) {
            if (name === "") {
                setValues({...values, error: "Name field is required"})
                return false;
            }
        }

        return true;        
    }

    const addBrandsToDB =  (brands) => {

        return fetch(`${API}brands/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(brands)
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        setValues({...values, error: ""})

        if(checkErrors()) {

            addBrandsToDB({name}).then( (data) => {
                //console.log("DATA: " + data.id);
               // if(data.success === true){
                    setValues({
                        ...values, 
                        name:"",
                        error: "",
                        success: false
                    })

                    setloadAddProdUi(!loadAddProdUi)
                    loadBrands();

            }).catch(err => console.log(err))
        }

    }

    const successMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div 
                        className="alert alert-success"
                        style={{display: success ? "" : "none"}}
                    >
                        {/* Successfully! created the new account, please <Link rel="" to="/signin">login</Link> */}
                    </div>
                </div>
            </div>
        )
    }

    const errorMessage = () => {
        return(
            
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div 
                        className="alert alert-danger"
                        style={{top: 20, display: error ? "" : "none"}}
                    >
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    const onCancel = () => {
        setloadAddProdUi(!loadAddProdUi)
    }

    const BrandsForm = () => { 
        return (
            <div className="container-fluid row border p-3">
                <div className="offset-3 col-6">
                <h5>Add Product</h5>
                <div className="form-group" >
                        <label className="text-secondary">Brands Name</label>
                        <input 
                            className="form-control"
                            placeholder="Please enter Brands Name"
                            value={name}
                            onChange={handleChange("name")}
                            type = "text"
                        />
                    </div>
                </div>
                <div className="col-6">
                    <div className="btn btn-primary block" onClick={onSubmit}>Save</div>
                    &nbsp;&nbsp;&nbsp;
                    <div className="btn btn-outline-secondary" onClick={onCancel}>Cancel</div>
                </div>
            </div>
        )
    }

    return (
        <Fragment>
            {!(loadAddProdUi) && 
            <div className="btn btn-primary row col-md-3 m-3 clearfix">
                <h5 onClick={() => {
                    setloadAddProdUi(!loadAddProdUi)
                    actionBrands("add", null)
                    }}>Add Brands &nbsp; <i className="fas fa-plus"></i></h5>
            </div> }
            {(loadAddProdUi) && BrandsForm() }
        </Fragment>

    )
}


export default AddBrands