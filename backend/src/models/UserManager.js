const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  static table = "user";

  insert(user) {
    return this.connection.query(
      `insert into ${UserManager.table} (email, password, first_name, last_name, phone) values (?, ?, ?, ?, ?)`,
      [user.email, user.password, user.firstName, user.lastName, user.phone]
    );
  }
}

module.exports = UserManager;
