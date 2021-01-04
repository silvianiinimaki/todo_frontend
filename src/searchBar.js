import React from 'react';
 
const SearchBar = (props) => {
    return (
      <div className="ui search" style={{textAlign:"center", marginTop:"1%"}}>
        <input className="prompt" type="text" placeholder="Hae tästä" onChange={props.handleChange}></input>
        <div className="results"></div>
      </div>
    )
};
 
export default SearchBar;