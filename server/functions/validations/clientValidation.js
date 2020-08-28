const Validator = require('validator');
const isEmpty = require('is-empty');

exports.addClientValidate = (data) => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Please provide a name';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
