// // import React, { Component } from 'react';
// // import Sidebar from './Sidebar';
// // import CircularProgress from "@material-ui/core/CircularProgress";
// // import axios from 'axios';

// // class ActiveRequestPage extends Component {
// //     constructor(props){
// //         super(props);
// //         this.state = {
// //             request: [],
// //             loading: true,
// //           };
// //     }

// //     async componentDidMount() {
// //         const idreq = this.props.requestid
// //         console.log(idreq)
// //         console.log('It aint working')
// //         const url = `http://localhost:4000/requests/${idreq}`;
// //         console.log(url)
// //         const response = await axios.get(url);
// //         this.setState({
// //           requests: response.data,
// //           loading: false,
// //         });
// //         console.log(response);
// //       }

// //     render() {
// //         if (this.state.loading || !this.state.requests) {
// //             return (
// //               <>
// //                 <Sidebar />
// //                 <CircularProgress className="progresscircular" />
// //               </>
// //             );
// //           } else {
// //                 return (
// //                     <>
// //                     <Sidebar />
// //                     <div>
// //                         {this.state.requests.map((req) => (
// //                         <div className="position">
// //                         <div className="pagetitle">
// //                         <h3>{req.instname}</h3>
// //                         </div>
// //                             <div>
// //                                 {req.firstname}
// //                             </div>
// //                             <div>
// //                                 {req.lastname}
// //                             </div>
// //                             <div>
// //                                 {req.phoneno}
// //                             </div>
// //                             <div>
// //                                 {req.instname}
// //                             </div>
// //                             <div>
// //                                 {req.email}
// //                             </div>
// //                             <div>
// //                                 {req.password}
// //                             </div>
// //                             <div>
// //                                 {req.message}
// //                             </div>
// //                             <div>
// //                                 {req.idimg}
// //                             </div>
// //                         </div>

// //                         ))}
                        
// //                     </div>
// //                     </>
// //         );
// //     }
// // }
// // }

// // export default ActiveRequestPage;

// import React, { Component } from 'react';

// function ActiveRequestPage ({request}) {
//         return (
//             <<div>
//     {request.firstname} {request.lastname}
//     {request.instname}
//     {request.phoneno}
//     {request.email}
//     {request.message}
//     {request.idimg}

//   </div>
//         );
// }

// export default ActiveRequestPage;

import React from 'react'
import Sidebar from './Sidebar';

function ActiveRequestPage({ request }) {
    return (
      <div>
          <Sidebar />
        {request.firstname} {request.lastname}
        {request.instname}
        {request.phoneno}
        {request.email}
        {request.message}
        {request.idimg}
        
      </div>
    );
  }

export default ActiveRequestPage