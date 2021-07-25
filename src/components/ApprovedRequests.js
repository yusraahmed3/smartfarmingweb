import React from 'react'
import Sidebar from './Sidebar'
import './ApprovedRequests.css'
import EditIcon from '@material-ui/icons/Edit';
function ApprovedRequests() {
    return (
<>
            <Sidebar/>
            <div className="approvedcss">
            <div className="pagetitle">
                <h2>Approved Requests</h2>
            </div>
            <div>
                <ul className="activelist">
                    <li className="listitems">
                       <div id="titles">Approved Request 1</div><div id="icons"><EditIcon/></div>
                    </li>
                    <li className="listitems">
                    <div id="titles">Approved Request 2</div><div id="icons"><EditIcon/></div>
                    </li>
                    <li className="listitems">
                    <div id="titles">Approved Request 3</div><div id="icons"><EditIcon/></div>
                    </li>
                    <li className="listitems">
                    <div id="titles">Approved Request 4</div><div id="icons"><EditIcon/></div>
                    </li>
                    <li className="listitems">
                    <div id="titles">Approved Request 5</div><div id="icons"><EditIcon/></div>
                    </li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default ApprovedRequests
