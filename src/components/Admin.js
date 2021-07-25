import React from 'react'
import Sidebar from './Sidebar'
import './Admin.css'
import SearchBar from './SearchBar'
function Admin() {
    return (
        <>
        <Sidebar />
        <div className="admincss">
        <div className="pagetitle">
             <h2>Dashboard</h2>
            </div>
            <SearchBar/>
        </div>
        </>
    )
}

export default Admin
