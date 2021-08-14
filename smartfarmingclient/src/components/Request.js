import React from 'react'
import Navbar from './Navbar'
import './Request.css'
import "bootstrap/dist/css/bootstrap.min.css";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Button from "react-bootstrap/Button";
// import Jumbotron from "react-bootstrap/Jumbotron";
// import Form from "react-bootstrap/Form";
// import { Container } from '@material-ui/core';

function Request() {
    return (
        <div>
            <Navbar />
            <h3 className="reqtitle">Send us a request</h3>
            <div className="wrapper">
            
            
                    <form className="formdiv">
                    <div className="formControl">
                        <input type="text" placeholder="First Name" className="fieldcss2"/>
                        <input type="text" placeholder="Last Name" className="fieldcss2"/>
                        <input type="text" placeholder="Phone Number" className="fieldcss2"/>
                        <input type="text" placeholder="Institution Name" className="fieldcss2"/>
                        <input type="email" placeholder="Email" className="fieldcss2"/>
                        </div>
                        
                        <div className="formControl2">
                        <input type="password" placeholder="Password" className="fieldcss2"/>
                        <input type="password" placeholder="Confirm password" className="fieldcss2"/>
                        <textarea placeholder="Describe your purpose" className="fieldcss2" />
                        <label>Upload a clear view of your ID</label>
                        <input type="file"/>
                        <button className="reqbutton">Send</button>
                        </div>
                        
                        </form>
            </div>

            </div>
            
    )
}

export default Request


      