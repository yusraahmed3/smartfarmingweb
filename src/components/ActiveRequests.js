import React from 'react'
import Sidebar from './Sidebar'
import './ActiveRequests.css'

function ActiveRequests() {
    return (
        <>
        <Sidebar />
        <div className="activecss">
            List of active requests
        </div>
        </>
    )
}

export default ActiveRequests
