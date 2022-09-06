import React from "react";

function Oriented(props) {
  return (
    <div className="w-60 h-42 flex flex-wrap ">
      <img className="w-24 h-24 rounded-full" src={props.picture} alt='image'/>
      <h3 className="font-medium text-base">{props.name}</h3>
      <h4 className="text-sm ">{props.institution}</h4>
    </div>
  )
}

export default Oriented;
