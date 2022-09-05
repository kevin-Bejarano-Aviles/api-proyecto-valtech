import React from "react";

function Oriented(props) {
  return (
    <div>
      <img src={props.image} alt='image'/>
      <h3>{props.name}</h3>
      <h4>{props.institution}</h4>
    </div>
  )
}

export default Oriented;
