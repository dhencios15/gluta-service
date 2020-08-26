const Validator = require('validator');
const isEmpty = require('is-empty');

exports.signUp = (data) => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : '';
  data.role = !isEmpty(data.role) ? data.role : '';

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Please provide a email';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Please provide a invalid email';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Please provide a password';
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Please provide a confirm password';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Password must match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

exports.login = (data) => {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Please provide a email';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Please provide a invalid email';
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Please provide a password';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
