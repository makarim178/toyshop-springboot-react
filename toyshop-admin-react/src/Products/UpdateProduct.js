import React, {Fragment, useState, useEffect, useCallback} from 'react'
import { Link, useLocation, Redirect } from 'react-router-dom'

import axios from 'axios'
import {API} from '../backend'
import {useDropzone} from 'react-dropzone'
import clsx from "clsx";
import Base from '../core/Base'

const UpdateProduct = () => {

    const location = useLocation().state;
    const [redir, setRedir] = useState(false);

    const [file, setFile] = useState()
    const [loading, setLoading] = React.useState(false);
    const [selectedImageFile, setSelectedImageFile] = useState()
    const [preview, setPreview] = useState()
    const [successFile, setSuccessFile] = useState()
    const [percent, setPercent] = useState()
    const [downloadUri, setDownloadUri] = useState()

    const buttonClassname = clsx({});

    const onDrop = useCallback((acceptedFiles) => {
        const fileDropped = acceptedFiles[0];
        if (fileDropped["type"].split("/")[0] === "image") {
            setSelectedImageFile(fileDropped);
            //return;
        }
        
        console.log(fileDropped);
        setFile(fileDropped);
        const previewUrl = URL.createObjectURL(fileDropped);
        setPreview(previewUrl);
        setSuccessFile(false);
        setPercent(0);
    });

    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        onDrop,
    });

    const { ref, ...rootProps } = getRootProps();

    const uploadFile = async () => {

        //console.log("am I here?");
        try {
          setSuccessFile(false);
          setLoading(true);
          console.log(file);
          const formData = new FormData();
          formData.append("file", file);
          const API_URL = "http://localhost:8080/files";
          const response = await axios.put(API_URL, formData, {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setPercent(percentCompleted);
            },
          });
    
          // console.log(response.data);
          setValues({...values, image: response.data.image})
          setDownloadUri(response.data.image);
          setSuccessFile(true);
          setLoading(false);
        } catch (err) {
          alert(err.message);
        }
      };

      const [values, setValues] = useState({
        id: (location) ? location.id : "",
        name: (location) ? location.name : "",
        description: (location) ? location.description : "",
        price: (location) ? location.price : "",
        stock: (location) ? location.stock : "",
        is_active: (location) ? location.is_active :"1",
        image: (location) ? location.image : "https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif",
        age_target: (location) ? location.age_target : "",
        max_Order_qty: (location) ? location.max_Order_qty : "",
        category: (location) ? location.category : "0",
        brands: (location) ? location.brands : "0",
        error: "",
        success: false
    })

    const [categoryList, setCategoryList] = useState([])
    const [brandsList, setBrandsList] = useState([]);

    const loadCategory = async () => {
        await axios.get(`http://localhost:8080/category/`).then(response => {
            setCategoryList(response.data)
        });
    }

    const loadBrands = async () => {
        await axios.get(`http://localhost:8080/brands/`).then(response => {
            setBrandsList(response.data)
        })
    }
    
    const {id, name,description,price,stock,is_active,image,age_target, max_Order_qty,category,brands,error,success} = values;

    const handleChange = (name) => (event) => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const getARedirect = redirect => {
        if(redir) {
            return <Redirect to="/product" />
        }
    }

    const checkErrors = () => {

        if (name === "" || description === "" || price === "" || stock === ""
                || image === "" || age_target === "" || max_Order_qty === "" 
                || category === "" || brands === ""
            ) {
            if (name === "") {
                setValues({...values, error: "Name field is required"})
                return false;
            }
        }

        return true;        
    }

    const addProductToDB =  (product) => {

        return fetch(`${API}product/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product)
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        setValues({...values, error: ""})

        if(checkErrors()) {

            addProductToDB({id, name, description, price, stock, is_active, image, age_target, max_Order_qty, category, brands}).then( (data) => {
                console.log("DATA: " + data.id);
                    setValues({
                        ...values, 
                        id: "",
                        name:"",
                        description:"",
                        price: "",
                        stock: "",
                        is_active: 1,
                        image:"https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif",
                        age_target: "",
                        max_Order_qty: "",
                        category:"",
                        brands:"",
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

    const productForm = () => {
        return (

            <div className="container-fluid row border p-3">
                
                <div className="col-6 block"> 
            <h5>Update Product</h5>
                    <div className="form-group" >
                        <label className="text-secondary">Product Name</label>
                        <input 
                            className="form-control"
                            placeholder="Please enter Product Name"
                            value={name}
                            onChange={handleChange("name")}
                            type = "text"
                        />
                    </div>

                    <div className="form-group" >
                        <label className="text-secondary">Mininum Age of kids to play with this product</label>
                        <input 
                            className="form-control"
                            placeholder="Please enter Minimum age"
                            value={age_target}
                            onChange={handleChange("age_target")}
                            type = "number"
                        />
                    </div>

                    <div className="form-group" >
                        <label className="text-secondary">Product Price</label>
                        <input 
                            className="form-control"
                            placeholder="Please Enter Price"
                            value={price}
                            onChange={handleChange("price")}
                            type = "number"
                        />
                    </div>


                    <div className="input-group border border-primary p-5 ">
                    <div className="custom-file">
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                            <p>Click to select files</p>
                        }
                    </div>
                    </div>
                    <div className="btn btn-outline-primary btn-sm p-2 ml-3"  onClick={() => uploadFile()}>
                            Upload Image
                    </div>
                    
                    <img onLoad={() => URL.revokeObjectURL(preview)} className="card-img-top img-fluid"/>
                    <span className="text-success">{(image === "https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif") ? null : image}</span>

                    </div>
                </div>

                <div className="col-6 block"> 
                    <div className="form-group" >
                        <label className="text-secondary">Brands</label>
                        <select 
                            name="ddl_brands" id="ddl_brands" onChange={handleChange("brands")}
                            className="form-control"
                        >
                            <option value="0">Please Select Brands</option>
                            {
                                brandsList.map((brand, index) => {
                                    return(
                                        <Fragment>
                                            <option key={brand.id} value={brand.id} selected={(brands == brand.id) && true} >{brand.name}</option>
                                        </Fragment>
                                    )
                                } )
                            }
                        </select>
                    </div>


                    <div className="form-group" >
                        <label className="text-secondary">Category</label>
                        <select 
                            name="ddl_brands" id="ddl_brands" onChange={handleChange("category")}
                            className="form-control"
                        >
                            <option value="0">Please Select Category</option>
                            {
                                categoryList.map((cat, index) => {
                                    return(
                                        <Fragment>
                                            <option key={cat.id} value={cat.id} selected={(category == cat.id) && true} >{cat.name} </option>
                                        </Fragment>
                                    )
                                } )
                            }
                        </select>
                    </div>


                    <div className="form-group" >
                        <label className="text-secondary">Product Stock</label>
                        <input 
                            className="form-control"
                            placeholder="Product Stock"
                            value={stock}
                            onChange={handleChange("stock")}
                            type = "number"
                        />
                    </div>

                    <div className="form-group" >
                        <label className="text-secondary">Maxium Order Quantity</label>
                        <input 
                            className="form-control"
                            placeholder="Maximum Order Quantity"
                            value={max_Order_qty}
                            onChange={handleChange("max_Order_qty")}
                            type = "number"
                        />
                    </div>
                    


                    <div className="form-group" >
                        <label className="text-secondary">Product Status</label>
                        <select 
                            name="ddlActive" id="ddlActive" onChange={handleChange("is_active")}
                            className="form-control"
                        >
                            <option value="1" selected={(is_active=="0") && true}>Active</option>
                            <option value="0" selected={(is_active=="0") && true}>Inactive</option>
                        </select>
                    </div>
                    
                </div>

                <div className="col-12">
                    <div className="form-group">
                    <label className="text-secondary">Product Description</label>
                    <textarea 
                        className="form-control span6" rows="3" placeholder="Please Enter Product Description"
                        value={description}
                        onChange={handleChange("description")}
                        ></textarea>
                    </div>
                </div>

                <div className="offset-9 col-3">
                    <div className="btn btn-primary block" onClick={onSubmit}>Save</div>
                    &nbsp;&nbsp;&nbsp;
                    <Link className="btn btn-outline-secondary" to="/product">Cancel</Link>
                </div>
            </div>


        )
    }

    useEffect(() => {
        loadCategory();
        loadBrands();
    }, [])
    
    return (
        <Base>
            <Fragment >
                {/* addproduct */}
                {getARedirect()}

                {productForm() }
                
                {/* addproduct */}

                 {/* <p className="text-center" >{JSON.stringify(values)}</p> */}

            </Fragment>
        </Base>
    )
}


export default UpdateProduct;