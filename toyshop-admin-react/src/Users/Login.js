import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import toyShop_Logo_png from '../assets/images/toyShop_Logo_png.png';
import axios from 'axios'
import { authenticate, isAuthenticated } from '../Auth/Helper';
const Login = () => {

    const [values, setValues] = useState({
        username: "",
        password: "",
        success: false,
        didRedirect: false,
        error: false, 
        errMsg: "", 
        laoding: false
    })

    const {username, password, error, success, didRedirect, errMsg, laoding} = values;

    const handleChange = (name) => (event) => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const performRedirect = () => {
        if(isAuthenticated()) {
            return (<Redirect to="/product" />)
        }
    }

    const checkErrors = () => {

        if (username === "" || password === "" ) {
            if (username === "") {
                setValues({...values, error: true, errMsg: "Name field is required"})
                return false;
            }

            if (password === "") {
                setValues({...values, error: true, errMsg: "Password field is required"})
                return false;
            }
        }

        return true;        
    }

    const onSubmit = async () => {
        const data = {
            username: username,
            password: password,
        }
        const response = await axios.post("http://localhost:8080/user/login", data)
        // console.log(response.data);

        if(response.data.success) {
            authenticate(response.data.user, () => {
                setValues({...values, didRedirect: true})
            })

        } else {
            setValues({...values, error: true, errMsg: data.error, laoding: false})
        }


    }

    return (
        
        <div className="row">
            <div className="offset-4 col-4 offset-4 mt-5 mb-5 pb-5">
                
                <div className="card mt-5 mb-5 pb-5">
                    <div className="card-header pt-5 pb-5">

                        <div className="rounded block ml-auto mr-auto center">
                            <img src={toyShop_Logo_png}
                                style={{ maxHeight: "50%", maxWidth: "50%", marginLeft: "25%"}}
                                className="mb-3 rounded center"
                                />
                        </div>
                        <h1 className="text-primary text-center">TOY SHOP ADMIN LOGIN</h1>
                        <br />
                        <br />

                        <div className="offset-1 col-10 offset-1 form-group" >
                            <input 
                                className="form-control"
                                placeholder="Please enter your Username"
                                value={username}
                                onChange={handleChange("username")}
                                type = "text"
                            />
                        </div>
                        <div className="offset-1 col-10 offset-1 form-group" >
                            <input 
                                className="form-control"
                                placeholder="Please enter your Password"
                                value={password}
                                onChange={handleChange("password")}
                                type = "password"
                            />
                        </div>
                        {
                            (error) ?
                                <div className="offset-1 col-10 offset-1 form-group">
                                    <span className="text-danger">Authentication failed! username/password mismatch!</span>
                                </div> : null
                        
                        }
                        <div className="offset-1 col-10 offset-1 form-group" >
                            <div className="btn btn-block btn-primary" onClick={onSubmit}>
                                <h4>Login</h4>
                            </div>
                        </div>
                    </div>
                    
                <span className="text-center mt-5"><i class="far fa-copyright text-primary"></i> Created By Mir Ashiful Karim</span>
                </div>
            </div>
            {performRedirect()}
        </div>
    )
}

export default Login;
