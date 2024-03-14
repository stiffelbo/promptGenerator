

const validator = (schema, formState) => {
    const errors = {};
    schema.forEach((field) => {
        const value = formState[field.name];
        const fieldErrors = [];
        const validation = field.validation;

        if(!validation) return;

        // Validate required field
        if (validation.required && (value === null || value === '' || value === undefined)) {
          fieldErrors.push('To pole jest wymagane');
        } 

        // Add field errors to the errors object
        if (fieldErrors.length > 0) {
          errors[field.name] = fieldErrors;
        }
      });
      return errors;
};

export default validator;



