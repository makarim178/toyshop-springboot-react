import React, {useState, useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from './Base'
import PaymentB from './PaymentB'



const ProcToPay = () => {

    const recieveState = useLocation().state;

    // console.log(recieveState.summary);
    
    const cart = recieveState.cart;
    // console.log("cart from recieveState "  cart[0].id;
    const summary = recieveState.summary;


    // totalPrice: 509.34000000000003, shippingCharge: 5.99, shippingDiscount: -5.99, tax: 66.2142, totalPay: 575.5542

    // console.log(summary.totalPrice);

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        addressSaved: false,
        phoneNumber: "",
        email: "",
        streetAddress: "",
        postalCode: "",
        province: "",
        city: "",
        error: "",
    })

    const [reload, setReload] = useState(false)
    const {firstName, lastName, addressSaved, phoneNumber, email, streetAddress, postalCode, province, city, error} = values

    const handleChange = (name) => (event) => {
        if (name === "phoneNumber" && event.target.value.length <= 10){
            setValues({...values, [name]: event.target.value})
        }

        if (name === "postalCode" && event.target.value.length <= 6){
            setValues({...values, [name]: event.target.value})
        }

        if (name !== "phoneNumber") {
            setValues({...values, [name]: event.target.value})
        }
    }
    const checkAddressFields = () => {
        setValues({...values, error: ""})

        if (firstName === "" || lastName === "") {
            setValues({...values, error: "*** First/Last Name Cannot be Blank"})
            return false
        }

        if(phoneNumber === ""){
            setValues({...values, error: "*** Phone Number Cannot be Blank"})
            return false
        }

        if (phoneNumber.length < 10){
            setValues({...values, error: "*** Please Enter Valid Phone number"})
            return false
        }

        if (email === "") {
            setValues({...values, error: "*** E-mail Address Cannot be Blank"})
            return false
        }

        if (streetAddress === "") {
            setValues({...values, error: "*** Street Address Cannot be Blank"})
            return false
        }

        if (postalCode === "") {
            setValues({...values, error: "** Postal Cannot be Blank"})
            return false
        }

        if(postalCode.length < 6) {
            setValues({...values, error: "** Please Enter Valid Postal Code"})
            return false
        }

        if (city === "") {
            setValues({...values, error: "*** Please Select a city"})
            return false
        }

        if (province === "") {
            setValues({...values, error: "*** Please Select a Province"})
            return false
        }

        setValues({...values, error: ""})
        // console.log("error: ", error);
        return true
    }

    const saveAddress = () => {
        setValues({...values, error: ""})
        if(checkAddressFields() && cart.length > 0){
            setValues({...values, addressSaved: !addressSaved})
        } else {
            setValues({...values, error: "Please add items to Cart or check all fields!"})
        }
    }

    const loadUserDetails = () => {
        const user = JSON.parse(localStorage.getItem("jwt"));
        setValues({...values, firstName: user.first_name, lastName: user.last_name, email: user.email, phoneNumber: user.phone})

    }



    useEffect(() => {
        if(isAuthenticated()){
            loadUserDetails();
        }

    }, [])


    return (
        <Base title="Welcome to Payment Page" Description="You are one step away from purchasing your order!" >
            <h2 className="text-primary font-font-weight-bold text-center">WELCOME SHOPPING CART</h2>
            <hr className="mx-5 my-4" />

            <div className="row">
                <div className="col-md-8 border rounded ml-5">
                    <div className="bg-light">
                        <h4 className="text-left font-weight-bolder text-dark text-uppercase p-3">Contact Details & Shipping Address</h4>
                    </div>
                    <h5 className="card-title text-text-uppercase px-3">Reciever's Name</h5>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="pl-4 py-2">
                                <input 
                                    disabled={!addressSaved ? false : true}
                                    placeholder="Please enter reciever's First Name"
                                    className="form-control"
                                    value={firstName}
                                    onChange={handleChange("firstName")}
                                    type = "text"
                                />
                                
                            </div>

                            <div className="pl-4 py-2">
                                <input 
                                    placeholder="Please Enter Cell Phone Number"
                                    disabled={!addressSaved ? false : true}
                                    className="form-control"
                                    value={phoneNumber}
                                    onChange={handleChange("phoneNumber")}
                                    type = "number"
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="pr-4 py-2">
                                <input 
                                    disabled={!addressSaved ? false : true}
                                    placeholder="Please enter reciever's Last Name"
                                    className="form-control"
                                    value={lastName}
                                    onChange={handleChange("lastName")}
                                    type = "text"
                                />
                                
                            </div>

                            <div className="pr-4 py-2">
                                <input 
                                    disabled={!addressSaved ? false : true}
                                    placeholder="Please enter reciever's E-mail Address"
                                    className="form-control"
                                    value={email}
                                    onChange={handleChange("email")}
                                    type = "email"
                                />
                                
                            </div>
                        </div>
                        
                    </div>

                    <div className="row px-3">
                        <div className="col-md-12 px-4 py-2">
                        <input 
                            disabled={!addressSaved ? false : true}
                            placeholder="Please enter Street Address"
                            className="form-control"
                            value={streetAddress}
                            onChange={handleChange("streetAddress")}
                            type = "text"
                        />
                        
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-6">
                            <div className="pl-4 py-2">
                                <input 
                                    placeholder="Please enter Postal Code"
                                    disabled={!addressSaved ? false : true}
                                    className="form-control"
                                    value={postalCode}
                                    onChange={handleChange("postalCode")}
                                    type = "text"
                                    maxLength={6}
                                />
                                
                            </div>

                            <div className="pl-4 py-2">
                                <select className="form-control" disabled={!addressSaved ? false : true} onChange={handleChange("province")}>
                                    <option value="">Please Select Province</option>
                                    <option value="AB">AB</option>
                                    <option value="BC">BC</option>
                                    <option value="MB">MB</option>
                                    <option value="NB">NB</option>
                                    <option value="NL">NL</option>
                                    <option value="NT">NT</option>
                                    <option value="NS">NS</option>
                                    <option value="NU">NU</option>
                                    <option value="ON">ON</option>
                                    <option value="PE">PE</option>
                                    <option value="QC">QC</option>
                                    <option value="SK">SK</option>
                                    <option value="YT">YT</option>
                                </select>
                                
                            </div>

                            <div className="pl-4 py-2">
                                <p className="text-danger font-weight-bold text-left">  {addressSaved ? null : error} </p>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="pr-4 py-2">
                            <select disabled={addressSaved ? true : false} className="form-control" onChange={handleChange("city")}>
                                    <option value="">Please Select City</option>
                                    <option>British Columbia</option>
                                    <option>Brampton</option>
                                    <option>Orange Ville</option>
                                    <option>Toronto</option>
                                    <option>Mississauga</option>
                                    <option>London</option>
                                    <option>Saskatoon</option>
                                    <option>Quebec City</option>
                                    <option>Montreal</option>
                                    <option>Niagra Falls</option>
                                </select>
                               
                            </div>

                            <div className="pr-4 py-2">
                                <input 
                                    placeholder="Canada"
                                    disabled
                                    className="form-control"
                                    type = "email"
                                />
                                
                            </div>

                            <div className="pr-4 py-2 pb-5">
                                <button className="btn btn-block btn-primary" onClick={saveAddress}> {addressSaved ? "Update" : "Save"} Address</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="col-md-3 border rounded mx-5">
                    <div className="bg-light">
                        <h4 className="font-weight-bolder text-dark text-uppercase py-3">Payment Gateway</h4>
                    </div>
                    <div>
                        { addressSaved
                            ? ( 
                                <PaymentB 
                                    products={cart} 
                                    summary={summary} 
                                    firstName={firstName}
                                    lastName={lastName}
                                    phoneNumber = {phoneNumber}
                                    email = {email} 
                                    streetAddress = {streetAddress}
                                    postalCode = {postalCode}
                                    province = {province}
                                    city = {city}
                                    setReload = {setReload} 
                                />
                            ): (
                                <h3 className="text-danger" >Please Add something to Cart or Fill all fields in the shipping address section</h3>
                            )
                        }
                    </div>
                </div>
                
            </div>
        </Base>
    )
}

export default ProcToPay
