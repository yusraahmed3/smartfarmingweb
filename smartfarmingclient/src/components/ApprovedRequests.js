import React, { Component } from "react";
import Sidebar from "./Sidebar";
import "./ApprovedRequests.css";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from 'axios';

const json = localStorage.getItem("admin");
 const userID = JSON.parse(json);  
  

class ApprovedRequests extends Component {
   
  constructor(props) {
    super(props);
    this.state = {
      approvedRequests: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const url = "http://localhost:4000/approved";
    const response = await axios.get(url);
    this.setState({
      approvedRequests: response.data,
      loading: false,
    });
    console.log(response);
  }

  render() {

    if (this.state.loading || !this.state.approvedRequests) {
      return (
        <>
          <Sidebar />
          <CircularProgress className="progresscircular" />
        </>
      );
    } else {
      const json = localStorage.getItem("admin");
      const userID = JSON.parse(json);
      return (
        <>
          <Sidebar image={userID.idimg}/>
          <div className="position">
            <div className="pagetitle">
              <h3>Approved Requests</h3>
            </div>
            <div className="scrollablecontent">
              
              <table>
                <tr>
                  <th>
                    Requester Name
                  </th>
                  <th>
                    Instituition Name
                  </th>
                  <th>
                    Status
                  </th>
                  <th>
                    Actions
                  </th>
                </tr>
                {this.state.approvedRequests.map((req) => (
                <tr className="hoverablerow">
                  <td>
                    {req.firstname} {req.lastname}
                  </td>
                  <td>
                    {req.instname}
                  </td>
                  <td>
                    {req.status}
                  </td>
                  <td>
                    <button id="icons">
                      <EditIcon />
                      </button>
                  </td>
                </tr>
                  ))}
              </table>
                
                  {/* <li className="listitems" key={req._id}>
                    <div id="titles">{req.firstname} {req.lastname}</div>
                    <div id="titles">{req.instname}</div>
                    <div id="icons">
                      <EditIcon />
                    </div>
                  </li> */}
              
            </div>
          </div>
        </>
      );
    }
  }
}

export default ApprovedRequests;
