import React, {useState, useEffect} from 'react';

//Mui
import {Card, CardContent, CardHeader, CardActions, Typography, Grid, IconButton, Button, Alert, LinearProgress} from '@mui/material';
//Icons
import ClearIcon from '@mui/icons-material/Clear';

//Comp
import InputText from './inputText';
import InputPassword from './inputPassword';
import InputEmail from './inputEmail';
import InputNumber from './inputNumber';
import InputDate from './inputDate';
import InputDateTime from './inputDateTime';
import InputSwitch from './inputSwitch';
import InputCheckbox from './inputCheckbox';
import InputFiles from './inputFiles';
import InputSelect from './inputSelect';
import InputSelectMultiple from './inputSelectMultiple';
import InputSelectObject from './inputSelectObject';
import InputTime from './inputTime';
import InputThreesome from './inputThreesome';

//Validation
import validator from './validator.js';

/**
 * FormTemplate Component
 *
 * A reusable form component that generates form fields based on the provided schema.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.data - The initial data object for the form.
 * @param {Array} props.schema - An array of objects defining the form fields and their properties.
    Each field object in the schema has the following properties:
 *   @property {string} name - The name of the form field.
 *   @property {string} type - The type of the form field (e.g., 'text', 'email', 'file', etc.).
 *   @property {string} label - The label for the form field.
 *   @property {number} [md] - The number of columns the field should occupy on medium-sized screens.
 *   @property {number} [xl] - The number of columns the field should occupy on extra-large screens.
 *   @property {string} [size] - The size of the field.
 *   @property {boolean} [disabled=false] - Indicates whether the field is disabled.
 *   @property {string} [title] - The title attribute for the field.
 *   @property {string} [placeholder] - The placeholder text for the field.
 *   @property {boolean} [required=false] - Indicates whether the field is required.
 *   @property {*} [defaultValue] - The default value for the field.
 *   @property {Object} [inputProps] - Additional input properties for the field.
 *   @property {Array} [selectOptions] - An array of options for select fields (used for 'select', 'select-multiple', and 'select-object' types).
 *   @property {boolean} [multiple=false] - Indicates whether the field allows multiple file selections (used for 'file' type).
 *   @property {boolean} [allowImage=false] - Indicates whether the text editor allows image uploads (used for 'editor' type).
 *   @property {string} [color] - The color of the switch or checkbox (used for 'switch' and 'checkbox' types).
 *   @property {string} [labelPlacement] - The placement of the label for the switch or checkbox (used for 'switch' and 'checkbox' types).
 *   @property {number} [step] - The step value for the number input (used for 'number' type).
 *   @property {*} [min] - The minimum value for the number input (used for 'number' and 'date' types).
 *   @property {*} [max] - The maximum value for the number input (used for 'number' and 'date' types).
 *   @property {Object} [validation] - An object defining validation rules for the field, specifically for handling dependent fields based on specific values.
 *    @property {React.Component} [component] - The custom component to be rendered when type is 'custom'.
 *   @property {Object} [componentProps] - Props to be passed to the custom component when type is 'custom'.
 * ...
 * 
 * Custom Components:
 * For 'custom' type fields, the 'component' property should be the React component you wish to render, and 'componentProps' should be an object containing any props that the custom component expects. These fields will not be managed by the form's internal state management and validation system.
 * 
 * Example of a custom component field in the schema:
 * {
 *   type: 'custom',
 *   component: YourCustomComponent,
 *   componentProps: { prop1: value1, prop2: value2 },
 *   md: 12,
 *   xl: 6
 * }
 * 
 * Note: Custom components are rendered as-is and should manage their own state and events if necessary. The form template does not provide automatic state management or validation for custom components.
 
 * @param {function} props.onSubmit - A function to be executed when the form is submitted.
 * @param {function} props.onCancel - A function to be executed when the form is canceled.
 * @param {boolean} [props.loading=false] - Indicates whether the form is in a loading state.
 * @param {boolean} [props.success=false] - Indicates whether the form submission was successful.
 * @param {boolean} [props.error=false] - Indicates whether an error occurred during form submission.
 * @param {string} [props.submitButtonText='Zapisz'] - The text to be displayed on the submit button.
 * @param {string} [props.cancelButtonText='Anuluj'] - The text to be displayed on the cancel button.
 * @param {Object} [props.cardSX={}] - Additional styling properties for the root Card component.
 * @param {string} [props.formLabel=''] - The label to be displayed in the CardHeader.
 *
 * @returns {JSX.Element} The rendered FormTemplate component.
 */

// Function to create an initial state object based on the schema
const createInitialStateFromSchema = (data, schema) => {
  const initialState = {};
  schema.forEach((field) => {
    if(field.name)
      initialState[field.name] = data && data.hasOwnProperty(field.name) ? data[field.name] : field.type === 'select-multiple' ? [] : '';
  });
  return initialState;
};

const FormTemplate = ({ data = {}, schema = [], onSubmit, onCancel, loading, success, error, submitButtonText = 'Zapisz', cancelButtonText = 'Anuluj', cardSX = {}, formLabel = '', action = null }) => {
  const [formState, setFormState] = useState(createInitialStateFromSchema(data, schema));
  const [errors, setErrors] = useState({initial: 'error'});
  const [isChanged, setIsChanged] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(()=>{
    setFormState(createInitialStateFromSchema(data, schema));
    setIsChanged(false);
  }, [JSON.stringify(data)]);

  useEffect(()=>{
    setIsChanged(false);
  }, [loading]);

  useEffect(() => {
    if(JSON.stringify(formState) !== JSON.stringify(createInitialStateFromSchema(data, schema))){
      if(isChanged === false){
        setIsChanged(true);
      } 
    }
  }, [formState]);

  useEffect(()=>{
    const keys = Object.keys(errors);
    if(keys.length > 0) {
      setIsValid(false);
    }else{
      setIsValid(true);
    }
  }, [errors])

  const handleChange = (key, val) => {
    const state = {...formState};
    state[key] = val;     
    setFormState(state);
    const err = validator(schema, state);
    setErrors(err);
  } 

  const handleSubmit = () => {
    onSubmit(formState);
  }  

  const handleCancel = () => {
    if(typeof onCancel === 'function'){
      onCancel();
    }else{
      setFormState(createInitialStateFromSchema(data, schema));
      setIsChanged(false);
    }
  }

  const renderLoading = () => {
    if(loading){
      return <Grid item xs={12}><LinearProgress /></Grid>
    }
  }

  const renderError = () => {
    if(!loading && error){
      return <Grid item xs={12}><Alert severity="error">Zapisywanie danych się nie powiodło!</Alert></Grid>
    }
  }

  const renderSuccess = () => {
    if(!loading && success){
      return <Grid item xs={12}><Alert severity="success">Zapisano!</Alert></Grid>
    }
  }

  const renderSubmit = () => {
    if(isValid && isChanged && !loading && !error && !success){
      return <Button color="primary" onClick={e=>handleSubmit()} fullWidth>{submitButtonText}</Button>
    }
    if(!isValid){
      return <Alert severity="warning" sx={{margin: '0 auto'}}>Uzupełnij dane formularza.</Alert>
    }
  }

  const renderCancel = () => {
      if(isChanged) return <IconButton onClick={e=>handleCancel()} size='small' title={cancelButtonText} color="error"><ClearIcon /></IconButton> 
      return;
  }

  const buildForm = () => {
    if(schema.length){
      return schema.map((field, index) => {        

        const value = formState[field.name];
        const errorsText = errors[field.name] && errors[field.name].length ? errors[field.name].join(' ') : null;
        
        switch(field.type){

          case 'custom' :
            const CustomComponent = field.component;
            return (<Grid item xs={12} md={field.md ? field.md : 6} xl={field.xl ? field.xl : 4} key={`${field.slot} - ${index}`}>
                <CustomComponent {...field.componentProps} />
            </Grid>);
          case 'hidden':
            return (<div key={field.name}></div>);
          case 'text':
            return (<Grid item xs={12} md={field.md ? field.md : 6} xl={field.xl ? field.xl : 4} key={field.name}>
                  <InputText 
                    name={field.name}
                    label={field.label}
                    value={value}                   
                    onChange={val => handleChange(field.name, val)}
                    error={errorsText ? true : false}
                    helpertext={errorsText}
                    size={field.size}
                    disabled={field.disabled}
                    title={field.title ? field.title : ''}
                    placeholder={field.placeholder}
                    required={field.required}
                    inputProps={field.inputProps}
                  />
              </Grid>);
          case 'email':
            return (<Grid item xs={12} md={field.md ? field.md : 6} xl={field.xl ? field.xl : 4} key={field.name}>
                  <InputEmail 
                    name={field.name}
                    label={field.label}
                    value={value}                   
                    onChange={val => handleChange(field.name, val)}
                    error={errorsText ? true : false}
                    helpertext={errorsText}
                    size={field.size}
                    disabled={field.disabled}
                    title={field.title ? field.title : ''}
                    placeholder={field.placeholder}
                    required={field.required}
                    inputProps={field.inputProps}
                  />
              </Grid>);
          case 'file':
            return (<Grid item xs={12} md={field.md ? field.md : 6} xl={field.xl ? field.xl : 4} key={field.name}>
                  <InputFiles 
                    name={field.name}         
                    onChange={val => handleChange(field.name, val)}
                    error={errorsText ? true : false}
                    helpertext={errorsText}
                    size={field.size}
                    disabled={field.disabled}
                    title={field.title ? field.title : ''}
                    placeholder={field.placeholder}
                    required={field.required}
                    multiple={field.multiple}
                  />
              </Grid>);
          case 'number':
            return (<Grid item xs={12} md={field.md ? field.md : 6} xl={field.xl ? field.xl : 4} key={field.name}>
                  <InputNumber 
                    name={field.name}
                    label={field.label}
                    value={value}
                    step={field.step}
                    min={field.min}
                    max={field.max}
                    onChange={val => handleChange(field.name, val)}
                    error={errorsText ? true : false}
                    helpertext={errorsText}
                    size={field.size}
                    disabled={field.disabled}
                    title={field.title ? field.title : ''}
                    placeholder={field.placeholder}
                    required={field.required}
                    inputProps={field.inputProps}
                  />
              </Grid>)
          case 'date':
            return (<Grid item xs={12} md={field.md ? field.md : 6} xl={field.xl ? field.xl : 4} key={field.name}>
                <InputDate 
                  name={field.name}
                  label={field.label}
                  value={value}
                  min={field.min}
                  max={field.max}
                  onChange={val => handleChange(field.name, val)}
                  error={errorsText ? true : false}
                  helpertext={errorsText}
                  size={field.size}
                  disabled={field.disabled}
                  title={field.title ? field.title : ''}
                  placeholder={field.placeholder}
                  required={field.required}
                  inputProps={field.inputProps}
                />
            </Grid>)
          case 'datetime-local':
            return (<Grid item xs={12} md={field.md ? field.md : 6} xl={field.xl ? field.xl : 4} key={field.name}>
                <InputDateTime 
                  name={field.name}
                  label={field.label}
                  value={value}
                  min={field.min}
                  max={field.max}
                  onChange={val => handleChange(field.name, val)}
                  error={errorsText ? true : false}
                  helpertext={errorsText}
                  size={field.size}
                  disabled={field.disabled}
                  title={field.title ? field.title : ''}
                  placeholder={field.placeholder}
                  required={field.required}
                  defaultValue={field.defaultValue}
                  inputProps={field.inputProps}
                />
            </Grid>)
          case 'time':
            return (<Grid item xs={12} md={field.md ? field.md : 6} xl={field.xl ? field.xl : 4} key={field.name}>
                <InputTime 
                  name={field.name}
                  label={field.label}
                  value={value}
                  onChange={val => handleChange(field.name, val)}
                  disabled={field.disabled}
                  timeOnly={field.inputProps.timeOnly}
                />
            </Grid>)
         
          case 'select':
              return (
                <Grid item xs={12} md={field.md ? field.md : 12} xl={field.xl ? field.xl : 12} key={field.name}>
                  <InputSelect 
                    name={field.name}
                    label={field.label}
                    value={value}
                    selectOptions={field.selectOptions}
                    onChange={val => handleChange(field.name, val)}
                    error={errorsText ? true : false}
                    helpertext={errorsText}
                    size={field.size}
                    disabled={field.disabled}
                    title={field.title ? field.title : ''}
                    placeholder={field.placeholder}
                    required={field.required}
                    inputProps={field.inputProps}
                  />
                </Grid>
              );
          case 'select-multiple':
              return (
                <Grid item xs={12} md={field.md ? field.md : 12} xl={field.xl ? field.xl : 12} key={field.name}>
                    <InputSelectMultiple 
                      name={field.name}
                      label={field.label}
                      value={value}
                      selectOptions={field.selectOptions}
                      onChange={val => handleChange(field.name, val)}
                      error={errorsText ? true : false}
                      helpertext={errorsText}
                      size={field.size}
                      disabled={field.disabled}
                      title={field.title ? field.title : ''}
                      placeholder={field.placeholder}
                      required={field.required}
                      inputProps={field.inputProps}
                    />
                </Grid>
                
              );
          case 'select-object':
              return (
                <Grid item xs={12} md={field.md ? field.md : 12} xl={field.xl ? field.xl : 12} key={field.name}>
                  <InputSelectObject 
                    name={field.name}
                    label={field.label}
                    value={value}
                    selectOptions={field.selectOptions}
                    onChange={val => handleChange(field.name, val)}
                    error={errorsText ? true : false}
                    helpertext={errorsText}
                    size={field.size}
                    disabled={field.disabled}
                    title={field.title ? field.title : ''}
                    placeholder={field.placeholder}
                    required={field.required}
                    inputProps={field.inputProps}
                  />
                </Grid>
                
              );
          case 'switch':                
              return (
                <Grid item xs={12} md={field.md ? field.md : 12} xl={field.xl ? field.xl : 12} key={field.name}>
                  <InputSwitch 
                    name={field.name}
                    label={field.label}
                    value={value}
                    onChange={val => handleChange(field.name, val)}
                    error={errorsText ? true : false}
                    helpertext={errorsText}
                    color={field.color}
                    size={field.size}
                    disabled={field.disabled}
                    title={field.title ? field.title : ''}
                    placeholder={field.placeholder}
                    required={field.required}
                    defaultValue={field.defaultValue}
                    labelPlacement={field.labelPlacement}
                    inputProps={field.inputProps}
                  />
                </Grid>
                
              );
          case 'checkbox':
              return (
                <Grid item xs={12} md={field.md ? field.md : 12} xl={field.xl ? field.xl : 12} key={field.name}>
                  <InputCheckbox
                      name={field.name}
                      label={field.label}
                      value={value}
                      onChange={val => handleChange(field.name, val)}
                      error={errorsText ? true : false}
                      helpertext={errorsText}
                      color={field.color}
                      size={field.size}
                      disabled={field.disabled}
                      title={field.title ? field.title : ''}
                      placeholder={field.placeholder}
                      required={field.required}
                      defaultValue={field.defaultValue}
                      labelPlacement={field.labelPlacement}
                      inputProps={field.inputProps}
                    />
                </Grid>
                
              );
          case 'threesome':
              return (
                <Grid item xs={12} md={field.md ? field.md : 12} xl={field.xl ? field.xl : 12} key={field.name}>
                  <InputThreesome
                      name={field.name}
                      label={field.label}
                      value={value}
                      onChange={val => handleChange(field.name, val)}
                      error={errorsText ? true : false}
                      helpertext={errorsText}
                      color={field.color}
                      size={field.size}
                      disabled={field.disabled}
                      title={field.title ? field.title : ''}
                      placeholder={field.placeholder}
                      required={field.required}
                      defaultValue={field.defaultValue}
                      labelPlacement={field.labelPlacement}
                      inputProps={field.inputProps}
                    />
                </Grid>
                
              );
          case 'password':
              return (
                <Grid item xs={12} md={field.md ? field.md : 12} xl={field.xl ? field.xl : 12} key={field.name}>
                    <InputPassword 
                    name={field.name}
                    label={field.label}                  
                    onChange={val => handleChange(field.name, val)}
                    error={errorsText ? true : false}
                    helpertext={errorsText}
                    size={field.size}
                    title={field.title ? field.title : ''}
                    placeholder={field.placeholder}
                    required={field.required}
                    inputProps={field.inputProps}
                  />
                </Grid>
              );
          default: 
           return ""
        }
      });
    }
  }

  const renderActions = () =>{
    return <Grid container>
      
        {action ? <Grid item>{action()}</Grid> : ''}
      
      <Grid item>
        {renderCancel()}
      </Grid>
    </Grid>
  }

  return (
  <Card sx={{...cardSX}}>
    <CardHeader
      title={formLabel}
      action={renderActions()}
    />  
    <CardContent>
        <Grid container spacing={3}>
          {buildForm()}
        </Grid>
        <Grid container spacing={3} mt={1}>
            {renderLoading()}          
            {renderError()}        
            {renderSuccess()}
        </Grid>
    </CardContent>
    <CardActions sx={{padding: '1em'}}>
      {renderSubmit()}
    </CardActions>
  </Card>
    )
}


export default FormTemplate
  

/*
FormTemplate component has several props that can be used to customize its behavior:

    data: The initial data object for the form. It contains the values for the form fields.
    schema: An array of objects that define the form fields and their properties.
    onSubmit: A function to be executed when the form is submitted.
    onCancel: A function to be executed when the form is canceled.
    loading: A boolean indicating whether the form is in a loading state.
    success: A boolean indicating whether the form submission was successful.
    error: A boolean indicating whether an error occurred during form submission.
    submitButtonText: The text to be displayed on the submit button.
    cancelButtonText: The text to be displayed on the cancel button.
    cardSX: An object that holds additional styling properties for the root Card component.
    formLabel: The label to be displayed in the CardHeader.

For each field defined in the schema, the following properties are extracted:

    name: The name of the form field.
    type: The type of the form field (e.g., text, email, file, number, date, datetime-local, etc.).
    label: The label for the form field.
    md: The number of columns the field should occupy on medium-sized screens.
    xl: The number of columns the field should occupy on extra-large screens.
    size: The size of the field.
    disabled: A boolean indicating whether the field is disabled.
    title: The title attribute for the field.
    placeholder: The placeholder text for the field.
    required: A boolean indicating whether the field is required.
    defaultValue: The default value for the field.
    inputProps: Additional input properties for the field.
    selectOptions: An array of options for select fields (used for select, select-multiple, and select-object types).
    multiple: A boolean indicating whether the field allows multiple file selections (used for file type).
    allowImage: A boolean indicating whether the text editor allows image uploads (used for editor type).
    color: The color of the switch or checkbox (used for switch and checkbox types).
    labelPlacement: The placement of the label for the switch or checkbox (used for switch and checkbox types).
    step: The step value for the number input (used for number type).
    min: The minimum value for the number input (used for number and date types).
    max: The maximum value for the number input (used for number and date types).
    validation: An object defining validation rules for the field, specifically for handling dependent fields based on specific values (used for various types).

*/