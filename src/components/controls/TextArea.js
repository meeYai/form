import React from 'react';
import classNames from 'classnames';



const TextArea = (props) => (
  <div className="form-group">
    <label htmlFor={props.id} className={(props.error ? classNames('form-label', 'error-text') : "")}>{props.title}</label>
    <textarea
      className={(props.error ? classNames('form-control', 'is-invalid') : 'form-control')}
      name={props.name}
      rows={props.rows}
      cols = {props.cols}
      value = {props.options}
      onChange={props.handleChange}
      placeholder={props.placeholder} />
      <small className="form-text text-muted">{props.helptext}</small>
  </div>
);

export default TextArea;
