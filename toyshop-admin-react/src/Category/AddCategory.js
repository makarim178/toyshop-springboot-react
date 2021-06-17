import React, {Fragment, useState, useEffect} from 'react'
import axios from 'axios'
import {API} from '../backend'


const AddCategory = ({actionCategory, loadCategories}) => {

    const [loadAddProdUi, setloadAddProdUi] = useState(false);

    const [values, setValues] = useState({
        name: "",
        description: "",
        error: "",
        success: false
    })

    const {name, description, error, success} = values;

    const handleChange = (name) => (event) => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const checkErrors = () => {

        if (name === "" || description === "" ) {
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

            addCategoryToDB({name, description}).then( (data) => {
                //console.log("DATA: " + data.id);
               // if(data.success === true){
                    setValues({
                        ...values, 
                        name:"",
                        description: "",
                        error: "",
                        success: false
                    })

                    setloadAddProdUi(!loadAddProdUi)
                    loadCategories();

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
                    actionCategory("add", null)
                    }}>Add Category &nbsp; <i className="fas fa-plus"></i></h5>
            </div> }
            {(loadAddProdUi) && CategoryForm() }
        </Fragment>

    )
}


export default AddCategory;