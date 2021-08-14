import React from 'react'
import Navbar from './Navbar'
import LineImage from '../images/line1.png'
import './About.css'

function About() {
    return (
        <div>
            <Navbar/>
            <div className="line">
            <img src={LineImage} alt="Line"/>
            </div>
            <div className="para">
                <p>SmartFarm, was founded by a team of agriculture experts. SmartFarm harnesses the power of technology alongside both know-how and the experience necessary for optimizing dairy farms around the world. Utilizing cloud-based technologies SmartFarm is able to help farmers minimize their costs and optimize their productivity which enables farmers to grow their business and increase profit.</p>
            </div>
            
        </div>
    )
}

export default About
