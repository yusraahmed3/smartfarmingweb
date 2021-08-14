import React, { Component } from "react";
import Sidebar from "./Sidebar";
import {Link} from 'react-router-dom'
import axios from 'axios';
import "./ActiveRequests.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import CircularProgress from "@material-ui/core/CircularProgress";
import RequestListing from "./RequestListing";

class ActiveRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const url = "http://localhost:4000/requests";
    const response = await axios.get(url);
    // const data = await response.json();
    this.setState({
      requests: response.data,
      loading: false,
    });
    console.log(response);
  }

  render() {
    if (this.state.loading || !this.state.requests) {
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
              <h3>Active Requests</h3>
            </div>
            <div>
              <ul className="activelist">
                {this.state.requests.map((req) => (
                    <Link to="/request" >
                        {console.log(req._id)}
                  <li className="listitems" requestid={req._id}>
                   <div className="title">{req.instname}</div>
                    <div className="icon1">
                      <ThumbUpIcon />
                    </div>
                    <div className="icon2">
                      <ThumbDownIcon />
                    </div>
                  </li>
                  </Link> 
                ))}
                {/* <li className="listitems">
                        <div className="title">Pending Request 1</div>
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
                    </li> */}
              </ul>
            </div>
          </div>
        </>
      );
    }
  }
}

export default ActiveRequests;
