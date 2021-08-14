import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Input, InputAdornment } from '@material-ui/core';
import './SearchBar.css'

const SearchBar = ({keyword,setKeyword}) => {
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  return (
      <div className="searchbar">
    <Input 
     style={BarStyling}
     key="random1"
     value={keyword}
     placeholder={"Search location..."}
    //  onChange={(e) => setKeyword(e.target.value)}
     startAdornment={
         <InputAdornment position="start">
             <SearchIcon/>
         </InputAdornment>
     }/>
    </div>
  );
}

export default SearchBar