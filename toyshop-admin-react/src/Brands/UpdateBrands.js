import React, {Fragment, useState, useEffect, useCallback} from 'react'
import { Link, useLocation, Redirect } from 'react-router-dom'

import axios from 'axios'
import {API} from '../backend'
import Base from '../core/Base'

const UpdateBrands = () => {
    const location = useLocation().state;
    const [redir, setRedir] = useState(false);

    const [values, setValues] = useState({
        id: (location) ? location.id : "",
        name: (location) ? location.name : "",
        error: "",
        success: false
    })
    
    const {id, name, error, success} =values;

    const handleChange = (name) => (event) => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const getARedirect = redirect => {
        if(redir) {
            return <Redirect to="/brands" />
        }
    }

    const checkErrors = () => {

        if (name === "") {
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

            addBrandsToDB({id, name}).then( (data) => {
                console.log("DATA: " + data.id);
                    setValues({
                        ...values, 
                        id: "",
                        name:"",
                        error: "",
                        success: false
                    })

                    setRedir(true);

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
                    <Link className="btn btn-outline-secondary" to="/brands">Cancel</Link>
                </div>
            </div>
        )
    }

    return (
        <Base>
            <Fragment >
                {/* addproduct */}
                {getARedirect()}

                {BrandsForm() }
                
                {/* addproduct */}

                 {/* <p className="text-center" >{JSON.stringify(values)}</p> */}

            </Fragment>
        </Base>
    )
}

export default UpdateBrands
