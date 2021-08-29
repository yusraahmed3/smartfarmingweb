import React, { Component, useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import './LoginForm.css'
import axios from 'axios'

function LoginForm (){
    const [email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    let history = useHistory();

    const login = ()=>{
        const url = "http://localhost:4000/user/login"
        axios.post(url, {
            email: email,
            password: password
        }).then(function (response) {
            console.log(response)
            if(response.status ===  200){
                window.location = "/userDash"
            }else if(response.status === 500 || response.status === 403){
                window.location = "/"
            }
            history.push("/userDash")
        }).catch(err => {
            console.log(err)
        })
        
    }
    
        return (
            <div className="loginDiv">
                <div className='childCont'>
            <form className="login-form"> 
                <input type="text" placeholder="Email" className='fieldcss' onChange={e => setEmail(e.target.value)}/><br/><br/>
                <input type="password" placeholder="Password" className='fieldcss' onChange={e=> setPassword(e.target.value)}/><br/><br/>
                <button type="submit" className='button-primary' onClick ={login}>Login</button><br/><br/>
                <Link to="/request"><button className='button-outline' onClick={() =>console.log("button clicked")}>Request Data</button></Link>
            </form>
            </div>
            </div>
        )
    }


export default LoginForm
