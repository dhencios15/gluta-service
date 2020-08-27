const Validator = require('validator');
const isEmpty = require('is-empty');

exports.validateProduct = (data) => {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.price = !isEmpty(data.price) ? data.price : '';
  data.quantity = !isEmpty(data.quantity) ? data.quantity : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Please provide a title';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Please provide a description';
  }

  // if (Validator.isEmpty(data.price)) {
  //   errors.price = 'Please provide a price';
  // }

  // if (Validator.isEmpty(data.quantity)) {
  //   errors.quantity = 'Please provide a quantity';
  // }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
