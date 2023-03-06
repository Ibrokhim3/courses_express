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

exports.getUserValidation = (params) => {
  const schema = Joi.object({
    id: Joi.string().min(10).max(50).required(),
  });
  return schema.validate(params);
};

exports.courseValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(15).required(),
    price: Joi.number().min(100).max(1000).required(),
    author: Joi.string().min(3).max(15).required(),
  });
  return schema.validate(data);
};
