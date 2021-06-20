const Joi = require("joi");

const userValidator = (user, res) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{8,30}$/)
      .required(),
  });
  const { error } = schema.validate(user);
  if (error) return res.status(400).json({ error });
};

module.exports = userValidator;
