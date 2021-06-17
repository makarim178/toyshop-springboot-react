import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { signin, authenticate, isAuthenticated } from '../auth/helper/'
import Base from '../core/Base'

const Signin = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: false,
        success: false,
        laoding: false,
        didRedirect: false,
        errMsg: "",
    })

    const { email, password, error, success, laoding, didRedirect, errMsg } = values

    const handleChange = (name) => (event) => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const performRedirect = () => {
        if(isAuthenticated()) {
            return (<Redirect to="/" />)
        }
    }

    const loadingMessage = () => {
        return( 
            laoding && (
                <div className = "alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        )
    }


    const onSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: false, errMsg: "", laoding: true})

        if(email === "" || password === "") {
            setValues({...values, error: true, errMsg: "Email or Password fields cannot be blank"})
        }

        const username = email

        signin({username, password}).then((data) => {
            // console.log("DATA:" + JSON.stringify(data))
            // if(data.error !== "Invalid email address" || data.error !== "Invalid Password") {
            //     setValues({...values, error: true, errMsg: data.error})
            // }

            console.log("token: " + data.user.session_token);
            console.log(data.user)
            if(data.success){
                authenticate(data.user, () => {
                    setValues({...values, didRedirect: true})
                })
            } else {
                setValues({...values, error: true, errMsg: data.error, laoding: false})
            }


        }).catch(err => console.log(err))
    }

    const successMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div 
                        className="alert alert-success"
                        style={{display: success ? "" : "none"}}
                    >
                        Successfully! created the new account, please <Link rel="" to="/signin">login</Link>
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
                        {errMsg}
                    </div>
                </div>
            </div>
        )
    }

    const registerLinks = () => {
        return(
            <div className="row">
                <div className="col-12 text-left border rounded py-5" >
                    <h5 className="text-primary font-weight-bold">Signup</h5>
                    <br />
                    <p className="text-dark">Create an account to receive emails about your orders, access your existing account preferences and address book!</p>
                    <Link className="btn btn-primary btn-block" to="/signup">SIGN UP</Link>

                    <br />
                    <br />
                    <h5 className="text-warning font-weight-bold">Guest Checkout</h5>
                    <p className="text-dark">You can check out without creating an account. You can create an account nytime you may like.</p>
                    <Link className="btn btn-warning btn-block text-white font-weight-bold" to="/cart">CHECKOUT AS a GUEST</Link>
                </div>
            </div>
        )
    }
    const signinForm = () => {
        return(
            <div className="row">
                <div className="col-12 text-left border rounded py-5" >
                    <h5 className="text-success font-weight-bold">Login</h5>
                    <br />
                    <form>
                        <div className="form-group" >
                            <label className="text-secondary">Email</label>
                            <input 
                                placeholder="Please enter your e-mail address"
                                className="form-control"
                                value={email}
                                onChange={handleChange("email")}
                                type = "text"
                            />
                        </div>
                        <div className="form-group" >
                            <label className="text-secondary">Password</label>
                            <input 
                                className="form-control"
                                placeholder="Please enter password"
                                value={password}
                                onChange={handleChange("password")}
                                type = "password"
                            />
                        </div>
                        <button className="btn btn-success btn-block" onClick={onSubmit} >Submit</button>
                    </form>
                </div>
            </div>
        )
    }


    return (
        <Base title="Signin" description="Users may signin using signin form!">
            <h2 className="text-primary font-font-weight-bold text-center">WELCOME TO USER LOGIN</h2>
            <br />
            <br />
            {loadingMessage()}

            <div className="row">
                <div className="col-md-3 offset-sm-2">
                    {signinForm()}
                    {errorMessage()}
                </div>

                <div className='col-md-1'>
                </div>

                <div className='col-md-4'>
                    {registerLinks()}
                </div>
                
            </div>
            {/* <p className="text-center">{JSON.stringify(values)}</p> */}
            {performRedirect()}
        </Base>
    )
}

export default Signin
