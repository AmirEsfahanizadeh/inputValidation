import React, { useState } from 'react'
import { validate } from '../utils/validators'

const INPUT_STATES = {
  UNTOUCHED: 'UNTOUCHED',
  VALID: 'VALID',
  INVALID: 'INVALID',
}

const Input = ({ label, id, type, validators, errorText }) => {

  const [state, setState] = useState(INPUT_STATES.UNTOUCHED);
  const validateInput = (value) => {
	if (!validate(value, validators)) {
		setState(INPUT_STATES.INVALID);
	} else {
		setState(INPUT_STATES.VALID);
	}
  };

  const handleChange = (e) => {
	if (state !== INPUT_STATES.UNTOUCHED) {
		const value = e.target.value;
		validateInput(value);
	}
  };

  const handleBlur = (e) => {
	validateInput(e.target.value);
  };

  return (
    <div 
	  className={state === INPUT_STATES.INVALID ? "form-input form-input--invalid" : "form-input"} 
	  data-testid="form-input"
	>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} onChange={handleChange} onBlur={handleBlur} />
      <p>{state === INPUT_STATES.INVALID && errorText}</p>
    </div>
  )
}

export default Input
