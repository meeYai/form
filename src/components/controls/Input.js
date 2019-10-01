import React from "react";
import classNames from 'classnames';

const Input = props => {
  //console.log(props.value);
  return (
    <div className="form-group">
      <label htmlFor={props.id} className={(props.error ? "error-text" : "")}>{props.title}</label>
      <input
        className={(props.error ? classNames('form-control', 'is-invalid') : 'form-control')}
        id = {props.name}
        name = {props.name}
        type = {props.inputType}
        value = {props.value}
        onChange = {props.handleChange}
        placeholder = {props.placeholder}
        {...props}
      />
      <small className="form-text text-muted">{props.helptext}</small>
    </div>
  );
};

export default Input;
