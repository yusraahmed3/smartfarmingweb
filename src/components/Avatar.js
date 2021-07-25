import React from 'react'
import Animegirl from '../images/anime.jpg'
import './Avatar.css'

function Avatar() {
    return (
        <div className="avatarcss">
            <img src={Animegirl} alt="anime"/>
        </div>
    )
}

export default Avatar
