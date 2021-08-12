import React, { Component } from 'react'
import { Link, Route, Switch } from "react-router-dom"
import './LoginForm.css'

class LoginForm extends Component {
    
    
    render() {
        return (
            <div className="loginDiv">
                <div className='childCont'>
            <form className="login-form"> 
                <input type="text" placeholder="Email" className='fieldcss'/><br/><br/>
                <input type="password" placeholder="Password" className='fieldcss'/><br/><br/>
                <Link to="/adminDash"><button type="submit" className='button-primary'>Login</button></Link><br/><br/>
                <Link to="/request"><button className='button-outline' onClick={() =>console.log("button clicked")}>Request Data</button></Link>
            </form>
            </div>
            </div>
        )
    }
}

export default LoginForm
