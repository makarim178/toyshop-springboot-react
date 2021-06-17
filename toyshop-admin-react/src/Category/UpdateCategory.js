import React, {Fragment, useState, useEffect, useCallback} from 'react'
import { Link, useLocation, Redirect } from 'react-router-dom'

import axios from 'axios'
import {API} from '../backend'
import Base from '../core/Base'

const UpdateCategory = () => {
    const location = useLocation().state;
    const [redir, setRedir] = useState(false);

    const [values, setValues] = useState({
        id: (location) ? location.id : "",
        name: (location) ? location.name : "",
        description: (location) ? location.description: "", 
        error: "",
        success: false
    })
    
    const {id, name, description, error, success} =values;

    const handleChange = (name) => (event) => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const getARedirect = redirect => {
        if(redir) {
            return <Redirect to="/category" />
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

    const addCategoryToDB =  (category) => {

        return fetch(`${API}category/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(category)
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        setValues({...values, error: ""})

        if(checkErrors()) {

            addCategoryToDB({id, name, description}).then( (data) => {
                console.log("DATA: " + data.id);
                    setValues({
                        ...values, 
                        id: "",
                        name:"",
                        description: "",
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


    const CategoryForm = () => { 
        return (
            <div className="container-fluid row border p-3">
                <div className="offset-3 col-6">
                <h5>Add Category</h5>
                <div className="form-group" >
                        <label className="text-secondary">Category Name</label>
                        <input 
                            className="form-control"
                            placeholder="Please enter Category Name"
                            value={name}
                            onChange={handleChange("name")}
                            type = "text"
                        />
                    </div>
                </div>
                <div className="offset-3 col-6">
                <h5>Add Category</h5>
                <div className="form-group" >
                        <label className="text-secondary">Category Description</label>
                        <input 
                            className="form-control"
                            placeholder="Please enter a description"
                            value={description}
                            onChange={handleChange("description")}
                            type = "text"
                        />
                    </div>
                </div>
                <div className="col-6">
                    <div className="btn btn-primary block" onClick={onSubmit}>Update</div>
                    &nbsp;&nbsp;&nbsp;
                    <Link className="btn btn-outline-secondary" to="/category">Cancel</Link>
                </div>
            </div>
        )
    }

    return (
        <Base>
            <Fragment >
                {/* addproduct */}
                {getARedirect()}

                {CategoryForm() }
                
                {/* addproduct */}

                 {/* <p className="text-center" >{JSON.stringify(values)}</p> */}

            </Fragment>
        </Base>
    )
}

export default UpdateCategory
