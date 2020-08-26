const Joi = require('joi');

const schemas = {
  signUp: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    confirmPassword: Joi.string().required().min(6),
  }),
};

module.exports = schemas;
