const Joi = require("joi");
const models = require("../models");

class UserController {
  static register = (req, res) => {
    const user = req.body;

    // TODO validations (length, format...)
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
        .required(),
      firstName: Joi.string()
        .pattern(/^([^0-9]*)$/)
        .required(),
      lastName: Joi.string()
        .pattern(/^([^0-9]*)$/)
        .required(),
      phone: Joi.string()
        .pattern(
          /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/
        )
        .required(),
    });

    const { error } = schema.validate(user, { abortEarly: false });
    if (error) {
      res.status(400).send(error);
    } else {
      models.user
        .insert(user)
        .then(([result]) => {
          res.status(201).send({ ...user, id: result.insertId });
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    }
  };
}

module.exports = UserController;
