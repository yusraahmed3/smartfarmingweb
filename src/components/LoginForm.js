import React, { Component } from 'react'
import { Link, Route, Switch } from "react-router-dom"
import './LoginForm.css'

class LoginForm extends Component {
    
    
    render() {
        return (
            <div className="loginDiv">
                <div className='childCont'>
            <form className="login-form"> 
                <label>Username</label>
                <input type="text" className='w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 fieldcss'/><br/><br/>
                <label>Password</label>
                <input type="password" className='w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 fieldcss'/><br/>
                <Link to="/adminDash"><button type="submit" className='button-primary'>Login</button></Link><br/><br/>
                <Link to="/request"><button className='button-outline' onClick={() =>console.log("button clicked")}>Request Data</button></Link>
            </form>
            </div>
            </div>
        )
    }
}

export default LoginForm
