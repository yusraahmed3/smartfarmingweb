import React, { Component } from 'react'
import Sidebar from './Sidebar'
import './RejectedRequests.css'
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';


class RejectedRequests extends Component{
    constructor(props) {
        super(props);
        this.state = {
          rejectedRequests: [],
          loading: true,
        };
      }

      async componentDidMount() {
        const url = "http://localhost:4000/rejected";
        const response = await axios.get(url);
        this.setState({
          rejectedRequests: response.data,
          loading: false,
        });
        console.log(response);
      }

      deleteRequest(id){
        axios.delete(`http://localhost:4000/rejected/${id}`)
      }

    render(){
        if (this.state.loading || !this.state.rejectedRequests) {
            return (
              <>
                <Sidebar />
                <CircularProgress className="progresscircular" />
              </>
            );
          } else {
    return (
<>
            <Sidebar/>
            <div className="position">
            <div className="pagetitle">
                <h3>Rejected Requests</h3>
            </div>
            <div>
                <ul className="activelist">
                {this.state.rejectedRequests.map((req) => (
                  <li className="listitems" key={req._id}>
                    <div id="titles">{req.instname}</div>
                    <div >
                     <button id="icons"> <EditIcon /></button> 
                     
                    </div>
                    <div >
                    <button id="icon2" onClick={() => this.deleteRequest(req._id)}><DeleteIcon/></button>
                    </div>
                  </li>
                ))}
                </ul>
            </div>
        </div>
        </>
    )
          }
}
}

export default RejectedRequests
