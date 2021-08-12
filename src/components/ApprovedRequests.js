import React from 'react'
import Sidebar from './Sidebar'
import './ApprovedRequests.css'
import EditIcon from '@material-ui/icons/Edit';
function ApprovedRequests() {
    return (
<>
            <Sidebar/>
            <div className="position">
            <div className="pagetitle">
                <h3>Approved Requests</h3>
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
