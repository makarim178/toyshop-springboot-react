import Axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Base from '../core/Base'

const Profile = () => {

    

    //console.log("user", user);
    const [values, setValues] = useState({
        email: "email",
        first_name: "first name",
        gender: "gender",
        id: "",
        last_name: "last name",
        name: "name",
        phone: "phone",
        updated_at: "last updated",
        edit_status: false,
        edit_status_email: false,
        edit_status_phone: false
    });

    const {email
        , first_name, gender
        , id, last_name, name
        , phone, updated_at
        , edit_status, edit_status_email
        , edit_status_phone
    } = values;
    

    const handleChange = (name) => (event) => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const loadUserDetails = () => {
        const user = JSON.parse(localStorage.getItem('jwt'))
        setValues({...values, 
            email: user.email,
            first_name: user.first_name,
            gender: user.gender,
            id: user.id,
            last_name: user.last_name,
            name: user.name,
            phone: user.phone,
            updated_at: user.updated_at,
            edit_status: false,
            edit_status_email: false,
            edit_status_phone: false
        })
    }

    const saveChanges = async (action) => {
        if (action === "name"){
            const response = await Axios.post(`http://localhost:8080/user/${name}/${id}`).then(response => {
                //console.log(response);
                if(response.status === 200){
    
                    localStorage.removeItem("jwt");
                    localStorage.setItem("jwt", JSON.stringify(response.data))
                    loadUserDetails();
                }
            })
        }

        if (action === "email"){
            const response = await Axios.post(`http://localhost:8080/user/email/${email}/${id}`).then(response => {
                //console.log(response);
                if(response.status === 200){
    
                    localStorage.removeItem("jwt");
                    localStorage.setItem("jwt", JSON.stringify(response.data))
                    loadUserDetails();
                }
            })
        }


        if (action === "phone"){
            const response = await Axios.post(`http://localhost:8080/user/phone/${phone}/${id}`).then(response => {
                //console.log(response);
                if(response.status === 200){
    
                    localStorage.removeItem("jwt");
                    localStorage.setItem("jwt", JSON.stringify(response.data))
                    loadUserDetails();
                }
            })
        }
    }

    const changeEditStatus = (action) => {
        if(action == "name") setValues({...values, edit_status: !edit_status});
        if(action == "email") setValues({...values, edit_status_email: !edit_status_email});
        if(action == "phone") setValues({...values, edit_status_phone: !edit_status_phone});
    }

    useEffect(() => {
        loadUserDetails();
    }, [])

    return (
        <Base title="User Dashboard" description="User Profile">
            
            <div className="row">
                <div className="col-md-2 bg-light-gray">
                    <ul className="list-group">
                        <Link to="/user/profile"  className="list-group-item text-white font-weight-bolder nav-link active ">My Details</Link>
                        <Link to="/user/orders" className="list-group-item text-dark font-weight-bolder nav-link" style={{cursor: "pointer", textDecoration: "none"}}>My Orders</Link>
                        <li className="list-group-item text-dark font-weight-bolder nav-link" style={{cursor: "pointer", textDecoration: "none"}}>My Wishlist</li>
                        <li className="list-group-item text-dark font-weight-bolder nav-link" style={{cursor: "pointer", textDecoration: "none"}}>Check Order Status</li>
                        <li className="list-group-item text-dark font-weight-bolder nav-link" style={{cursor: "pointer", textDecoration: "none"}}>Log Out</li>
                    </ul>
                </div>
                <div className="col-md-9">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title  text-primary">User Details</h3>

                        <div className="input-group p-2">
                            <input 
                                type="text" 
                                className="form-control" 
                                disabled={(edit_status)? false : true} 
                                placeholder={name}
                                value={name}
                                onChange={handleChange("name")}
                            />
                            <div className="input-group-append">
                                <span className="input-group-text">
                                    <a 
                                        className="fas fa-wrench text-primary" 
                                        onClick={() => changeEditStatus("name")}
                                        style={{cursor: "pointer", textDecoration:"none"}}>
                                    </a>
                                </span>
                                <span className="input-group-text">
                                    <a 
                                        className="fas fa-save text-success" 
                                        onClick={() => {saveChanges("name")}}
                                        style={{cursor: "pointer", textDecoration:"none"}}></a>
                                </span>
                                <span className="input-group-text">
                                    <a onClick={() => {loadUserDetails()}} className="far fa-times-circle text-danger" style={{cursor: "pointer", textDecoration:"none"}}></a>
                                </span>
                            </div>
                        </div>


                        <div className="input-group p-2">
                            <input 
                                type="text" 
                                className="form-control" 
                                disabled={(edit_status_email)? false : true} 
                                placeholder={email}
                                value={email}
                                onChange={handleChange("email")}
                            />
                            <div className="input-group-append">
                                <span className="input-group-text">
                                    <a 
                                        className="fas fa-wrench text-primary" 
                                        onClick={() => changeEditStatus("email")}
                                        style={{cursor: "pointer", textDecoration:"none"}}>
                                    </a>
                                </span>
                                <span className="input-group-text">
                                    <a 
                                        className="fas fa-save text-success" 
                                        onClick={() => {saveChanges("email")}}
                                        style={{cursor: "pointer", textDecoration:"none"}}></a>
                                </span>
                                <span className="input-group-text">
                                    <a onClick={() => {loadUserDetails()}} className="far fa-times-circle text-danger" style={{cursor: "pointer", textDecoration:"none"}}></a>
                                </span>
                            </div>
                        </div>


                        <div className="input-group p-2">
                            <input 
                                type="text" 
                                className="form-control" 
                                disabled={(edit_status_phone)? false : true} 
                                placeholder={phone}
                                value={phone}
                                onChange={handleChange("phone")}
                            />
                            <div className="input-group-append">
                                <span className="input-group-text">
                                    <a 
                                        className="fas fa-wrench text-primary" 
                                        onClick={() => changeEditStatus("phone")}
                                        style={{cursor: "pointer", textDecoration:"none"}}>
                                    </a>
                                </span>
                                <span className="input-group-text">
                                    <a 
                                        className="fas fa-save text-success" 
                                        onClick={() => {saveChanges("phone")}}
                                        style={{cursor: "pointer", textDecoration:"none"}}></a>
                                </span>
                                <span className="input-group-text">
                                    <a onClick={() => {loadUserDetails()}} className="far fa-times-circle text-danger" style={{cursor: "pointer", textDecoration:"none"}}></a>
                                </span>
                            </div>
                        </div>


                        <p className="text-right text-secondary p-3">[Last Loged In: {updated_at}]</p>
                        
                    </div>
                    
                </div>
                </div>
            </div>
        </Base> 
    )
}

export default Profile
