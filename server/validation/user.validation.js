const Joi = require("joi");

exports.userValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(10).required(),
    email: Joi.string().email().min(5).max(25).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    vEmail: Joi.ref("email"),
  });
  return schema.validate(data);
};
