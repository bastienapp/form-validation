const models = require("../models");

class UserController {
  static register = (req, res) => {
    const user = req.body;

    // TODO validations (length, format...)

    models.user
      .insert(user)
      .then(([result]) => {
        res.status(201).send({ ...user, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = UserController;
