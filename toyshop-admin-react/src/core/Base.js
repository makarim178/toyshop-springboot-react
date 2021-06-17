import React, {useState, useEffect} from 'react';
import Menu from './Menu';
import toyShop_Logo_png from '../assets/images/toyShop_Logo_png.png';


const Base = ({title = "My Title",
        description="My Description",
        classname="col-9 bg-white test-dark p-4",
        children}) => {

    
    
    const TopBar = () => {
        return(
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm sticky-top">
                <div className="my-0 mr-md-auto font-weight-normal">
                    <a className="navbar-brand" href="/">
                        <img src={toyShop_Logo_png}
                            style={{ maxHeight: "50%", maxWidth: "50%" }}
                            className="mb-3 rounded"
                            />
                    </a>
                </div>
            </div>
        )
    }

    return(
        <div>
            {TopBar()}
            <div className="container-fluid row">
                <div className="col-3">
                    <Menu></Menu>
                </div>
                <div className={classname}>
                    {children}
                </div>
            </div>


            <br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br />
            <br /><br /><br /><br /><br /><br />
            <br /><br /><br />
            <footer className="footer mt-auto py-3 bg-primary">
                <div className="container">
                    <div className="row">
                        <div className="col col-md-8 float-left">
                            <i className="far fa-copyright text-light"></i>
                            <span className="text-light"> 2020 Toyshop Ltd (Canada). All rights reserved.</span>
                        </div>
                        <div className="col col-md-2 float-right">
                            <a href="" className="fab fa-facebook-square text-light"> </a> 
                            &nbsp;
                            <a href="" className="fab fa-instagram text-light"> </a> 
                            &nbsp;
                            <a href="" className="fab fa-youtube-square text-light"> </a> 
                            &nbsp;
                            <a href="" className="fab fa-pinterest-square text-light"> </a> 
                            &nbsp;
                            <a href="" className="fab fa-twitter-square text-light"> </a> 
                            &nbsp;
                            <a href="" className="fab fa-tiktok text-light"> </a> 
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
    

}

export default Base;
