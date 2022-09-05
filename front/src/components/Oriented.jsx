import React from "react";

function Oriented(props) {
  return (
    <div>
      <img src={props.picture} alt='image'/>
      <h3>{props.name}</h3>
      <h4>{props.institution}</h4>
    </div>
  )
}

export default Oriented;
