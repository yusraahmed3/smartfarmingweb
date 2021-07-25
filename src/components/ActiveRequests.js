import React from 'react'
import Sidebar from './Sidebar'
import './ActiveRequests.css'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

function ActiveRequests() {
    return (
        <>
        <Sidebar />
        <div className="activecss">
            <div className="pagetitle">
                <h2>Active Requests</h2>
            </div>
            <div >
                <ul className="activelist">
                    <li className="listitems">
                        <div className="title">Pending Request 1</div><div className="icon1"><ThumbUpIcon/></div><div className="icon2"><ThumbDownIcon/> </div>
                    </li>
                    <li className="listitems">
                    <div className="title">Pending Request 2</div><div className="icon1"><ThumbUpIcon/></div><div className="icon2"><ThumbDownIcon/> </div>
                    </li>
                    <li className="listitems">
                    <div className="title">Pending Request 3</div><div className="icon1"><ThumbUpIcon/></div><div className="icon2"><ThumbDownIcon/> </div>
                    </li>
                    <li className="listitems">
                    <div className="title">Pending Request 4</div><div className="icon1"><ThumbUpIcon/></div><div className="icon2"><ThumbDownIcon/> </div>
                    </li>
                    <li className="listitems">
                    <div className="title">Pending Request 5</div><div className="icon1"><ThumbUpIcon/></div><div className="icon2"><ThumbDownIcon/> </div>
                    </li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default ActiveRequests
