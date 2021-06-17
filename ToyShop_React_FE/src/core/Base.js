import React from 'react'
import Menu from './Menu'

const Base = ({title = "My Title", 
                description = "My Description", 
                className = "bg-white text-dark p-4", 
                children}) => {



    return(
        <div>
           <Menu></Menu>
            <div className="container-fluid">
                {/* <div className="jumborton bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div> */}
                <div className={className}>
                    {children}
                </div>
            </div>

            <br /><br /><br /><br /><br /><br />

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

export default Base