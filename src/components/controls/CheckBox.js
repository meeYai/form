import React from 'react';
import classNames from 'classnames';

const CheckBox = (props) => {
	return(
		<div className="form-group">
	    <div className={(props.error ? classNames('form-check', 'is-invalid') : 'form-check')}>
	      <input type="checkbox" {...props} />
	      <label className="form-check-label" htmlFor={props.id}>
	        &nbsp;&nbsp;{props.title}
	      </label>
	    </div>
	  </div>
);
}

export default CheckBox;
