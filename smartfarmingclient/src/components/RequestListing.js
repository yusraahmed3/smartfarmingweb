import React from 'react';
import { Link } from 'react-router-dom';

const RequestListing = (props) =>{

    const renderlist = ({datalist}) => {
            return datalist.map((item) => {
                return(<>
                    <div key={item.id}>{item.firstname}</div>
                    <div>{item.lastname}</div>
                    <div>{item.email}</div>
                    </>
                )
            })
    }

    return(
        <div>
            {renderlist(props)}
        </div>
    )
}

export default RequestListing