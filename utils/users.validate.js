const joi = require("joi");

module.validateUser = (user) => {
  return joi
    .object({
      name: joi.string().trim().required(),
      email: joi.string().trim().email().required().normalize(),
      password: joi.string().trim().min(4).required(),
    })
    .validate(user);
};
