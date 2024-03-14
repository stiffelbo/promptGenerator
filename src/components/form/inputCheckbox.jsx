import React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';

const InputCheckbox = ({ name, label = '', value, title = '', onChange, inputProps = {}, required=false, error=false, helpertext, size="small", labelPlacement="start", disabled = false }) => {
  const handleChange = (event) => {
    onChange(event.target.checked);
  };

  const getChecked = val => {
    if(val === true || val === '1' || val === 1){
      return true;
    }else{
      return false;
    }
  }

  const noVal = value === '' ? ' (null)' : '';
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={getChecked(value)}
          onChange={handleChange}
          name={name}
          title={title}
          color="primary"
          size={size}
          disabled={disabled}
          required={required}
          inputProps={{...inputProps}}
        />
      }
      label={label + noVal}
      labelPlacement={labelPlacement}
      error={error.toString()}
      helpertext={helpertext}
    />
  );
};

export default InputCheckbox;
