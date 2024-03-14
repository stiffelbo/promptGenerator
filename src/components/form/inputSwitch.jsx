import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';

const InputSwitch = ({ name, label = '', value, title = '', placeholder = '', variant = 'outlined', required = true, inputProps = {}, color = 'primary', onChange, error = '', helpertext = '', labelPlacement = 'start', size='small', disabled=false }) => {
  const getChecked = val => {
    if(val === true || val === '1' || val === 1){
      return true;
    }else{
      return false;
    }
  };
  const handleChange = (event) => {
    onChange(event.target.checked);
  };
  return (
    <FormControlLabel
      control={
        <Switch
          checked={getChecked(value)}
          onChange={handleChange}
          name={name}
          color={color}          
          size={size}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          title={title}
          variant={variant}
          inputProps={{...inputProps}}
        />
      }
      label={label}
      labelPlacement={labelPlacement}
      error={error.toString()}
      helpertext={helpertext}
    />
  );
};

export default InputSwitch;
