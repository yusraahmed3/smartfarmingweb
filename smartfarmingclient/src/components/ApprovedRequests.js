import React, { Component } from "react";
import Sidebar from "./Sidebar";
import "./ApprovedRequests.css";
import EditIcon from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from 'axios';

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
      return (
        <>
          <Sidebar />
          <div className="position">
            <div className="pagetitle">
              <h3>Approved Requests</h3>
            </div>
            <div>
              <ul className="activelist">
                {this.state.approvedRequests.map((req) => (
                  <li className="listitems" key={req._id}>
                    <div id="titles">{req.firstname}</div>
                    <div id="icons">
                      <EditIcon />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      );
    }
  }
}

export default ApprovedRequests;
