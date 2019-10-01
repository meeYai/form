import React from "react";

const Errors = ({errors}) => {
  return (
    <div>
      {Object.values(errors).map((value, index) => {
      return (
        <div className="alert alert-danger" role="alert">
          <span key={index}>{value}</span>
        </div>
      )
      })}
    </div>
  )
}

export default Errors
