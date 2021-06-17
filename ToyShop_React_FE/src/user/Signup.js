import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../auth/helper'
import Base from '../core/Base'

const Signup = () => {
    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        gender: "",
        check: false,
        error: "",
        success: false
    })

    const {first_name, last_name, email, password, confirmPassword, phone, gender, error, success, check } = values

    const handleChange = (name) => (event) => {
        if(name !== "check"){
            if(name === "phone"){
                if(event.target.value.length <= 10 ){
                    setValues({...values, error: false, [name]: event.target.value})
                }
            } else {
                setValues({...values, error: false, [name]: event.target.value})
            }
        } else {
            setValues({...values, error: false, [name]: !check })
        }
    }

    const checkErrors = () => {

        if (email === "" || phone.length === 0 || password === "" || confirmPassword === "" || gender === "") {
            if (email === "") {
                setValues({...values, error: "Email field is required"})
                return false
            }

            if(phone.length === 0) {
                setValues({...values, error: "Phone field is required"})
                return false
            }

            if (gender === "") {
                setValues({...values, error: "Please select a gender"})
                return false
            }

            if (password === "") {
                setValues({...values, error: "password field is required"})
                return false
            }

            if(confirmPassword === "") {
                setValues({...values, error: "Please Confirm Password"})
                return false
            }
        }

        if (!check) {
            setValues({...values, error: "Please read and agree with the terms & conditions"})
            return false
        }
        

        if (phone.length !== 10) {
            setValues({...values, error: "Phone Field must contain valid number"})
            return false
        }

        if(password.length < 4) {
            setValues({...values, error: "Password field requires at least 3 characters"})
            return false
        }

        if(password !== confirmPassword) {
            setValues({...values, error: "Passwords do not match"})
            return false            
        }

        return true;        
    }

    const onSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: ""})

        if(checkErrors()) {
            signup({first_name, last_name, name: last_name + ", "+ first_name, username: email, phone, gender, password, email}).then( (data) => {
                // console.log("DATA: " + data);
                if(data.email === email){
                    setValues({
                        ...values, 
                        first_name: "",
                        last_name: "",
                        name: "",
                        email: "",
                        password: "",
                        phone: "",
                        gender: "",
                        error: "",
                        success: true,
                    })
                } else{
                    if(data.email) {
                        setValues({...values, error: data.email, success: false})
                    }else{
                        setValues({...values, error: "Please Check All fields", success: false})
                    }
                }
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
                        {error}
                    </div>
                </div>
            </div>
        )
    }

    const signUpForm = () => {
        return(
            
                <form className="row">
                    <div className="col-md-6">

                        {/* first name */}
                        <div className="form-group" >
                            <label className="text-secondary">First Name</label>
                            <input 
                                className="form-control"
                                placeholder="Please enter your First Name"
                                value={first_name}
                                onChange={handleChange("first_name")}
                                type = "text"
                            />
                        </div>

                        {/* email address */}
                        <div className="form-group" >
                            <label className="text-secondary">Email Address</label>
                            <input 
                                placeholder="Please enter your e-mail address"
                                className="form-control"
                                value={email}
                                onChange={handleChange("email")}
                                type = "text"
                            />
                        </div>

                        {/* Gender */}
                        <div className="form-group" >
                            <label className="text-secondary">Gender</label>
                            <select 
                                placeholder="Please enter your e-mail address"
                                className="form-control"
                                value={gender}
                                onChange={handleChange("gender")}
                                type = "text"
                            >
                                <option value="">Please Select</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </select>
                        </div>

                        {/* CheckBox */}
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" required onChange={handleChange("check")} />
                            <label className="form-check-label" for="exampleCheck1">I confirm that I read and agree with <Link>Terms & Condition</Link></label>
                        </div>
                    </div>

                    
                    <div className="col-md-6">

                        {/* last name */}
                        <div className="form-group" >
                            <label className="text-secondary">Last Name</label>
                            <input 
                                className="form-control"
                                placeholder="Please enter your Last Name"
                                value={last_name}
                                onChange={handleChange("last_name")}
                                type = "text"
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="form-group" >
                            <label className="text-secondary">Phone Number</label>
                            <input 
                                placeholder="Please enter your Phone Number"
                                className="form-control"
                                maxLength={10}
                                value={phone}
                                onChange={handleChange("phone")}
                                type = "number"
                            />
                        </div>

                        {/* password */}

                        <div className="form-group" >
                            <label className="text-secondary">Password</label>
                            <input 
                                className="form-control"
                                placeholder="Please enter password"
                                value={confirmPassword}
                                onChange={handleChange("confirmPassword")}
                                type = "password"
                            />
                        </div>

                        {/* Confirm password */}

                        <div className="form-group" >
                            <label className="text-secondary">Confirm Password</label>
                            <input 
                                className="form-control"
                                placeholder="Please enter password"
                                value={password}
                                onChange={handleChange("password")}
                                type = "password"
                            />
                        </div>


                    </div>

                    <button className="btn btn-primary btn-block mx-3" onClick={onSubmit} >CONFIRM REGISTRATION</button>
                </form>
            
        )
    }

    return (
        <Base title="Sign Up Page" description="Sign Up page for User">

            <h2 className="text-primary font-font-weight-bold text-center">WELCOME TO USER REGISTRATION</h2>
            <h6 className="text-secondary text-center">If you are already a registered member, please <Link to="/signin">login</Link> here.</h6>
            <div className="row">
                <div className="col-md-6 offset-sm-3">
                    <hr />
                </div>
            </div>
            
            <div className="row">
                <div className="col-md-6 offset-sm-3">
                    <div className="card">
                    <h5 className="card-header text-primary">USER REGISTRATION</h5>
                    <div className="card-body bg-white">
                        {successMessage()}
                        {signUpForm()}
                        {errorMessage()}
                        {/* <p className="text-center" >{JSON.stringify(values)}</p>  */}
                    </div>
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default Signup
