import React, { Component } from "react";
import Sidebar from "./Sidebar";
import "./RejectedRequests.css";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import MoreVertIcon from "@material-ui/icons/MoreVert";

class RejectedRequests extends Component {
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

  deleteRequest(id) {
    axios.delete(`http://localhost:4000/rejected/${id}`);
  }

  render() {
    if (this.state.loading || !this.state.rejectedRequests) {
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
          <Sidebar image={userID.idimg} />
          <div className="position">
            <div className="pagetitle">
              <h3>Rejected Requests</h3>
            </div>
            <div className="scrollablecontent">
              <table>
                <tr>
                  <th>Requester Name</th>
                  <th>Instituition Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
                {this.state.rejectedRequests.map((req) => (
                  <tr className="hoverablerow">
                    <td>
                      {req.firstname} {req.lastname}
                    </td>
                    <td>{req.instname}</td>
                    <td>{req.status}</td>
                    <td>
                      <button id="icons">
                        <MoreVertIcon />
                      </button>
                      <button
                        id="icon2"
                        onClick={() => this.deleteRequest(req._id)}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </table>
              {/* <ul className="activelist">
                {this.state.rejectedRequests.map((req) => (
                  <li className="listitems" key={req._id}>
                    <div id="titles">
                      {req.firstname} {req.lastname}
                    </div>
                    <div id="titles">{req.instname}</div>
                    <div>
                      
                    </div>
                    <div>
                      
                    </div>
                  </li>
                ))}
              </ul> */}
            </div>
          </div>
        </>
      );
    }
  }
}

export default RejectedRequests;
