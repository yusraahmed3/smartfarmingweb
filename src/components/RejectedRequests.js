import React from 'react'
import Sidebar from './Sidebar'
import './RejectedRequests.css'
import EditIcon from '@material-ui/icons/Edit';

function RejectedRequests() {
    return (
<>
            <Sidebar/>
            <div className="rejectedcss">
            <div className="pagetitle">
                <h2>Rejected Requests</h2>
            </div>
            <div>
                <ul className="activelist">
                    <li className="listitems">
                       <div id="titles">Rejected Request 1</div><div id="icons"><EditIcon/></div>
                    </li>
                    <li className="listitems">
                    <div id="titles">Rejected Request 2</div><div id="icons"><EditIcon/></div>
                    </li>
                    <li className="listitems">
                    <div id="titles">Rejected Request 3</div><div id="icons"><EditIcon/></div>
                    </li>
                    <li className="listitems">
                    <div id="titles">Rejected Request 4</div><div id="icons"><EditIcon/></div>
                    </li>
                    <li className="listitems">
                    <div id="titles">Rejected Request 5</div><div id="icons"><EditIcon/></div>
                    </li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default RejectedRequests
