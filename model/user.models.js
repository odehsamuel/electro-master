const bcrypt = require("bcryptjs");

const db = require("../data/database");

class User {
  constructor(userInfo) {
    (this.email = userInfo.email),
      (this.password = userInfo.password),
      (this.name = userInfo["user-name"]),
      (this.confirmPassword = userInfo.password2);
  }

  existingUser() {
    return db.getDb().collection("users").findOne({ email: this.email });
  }

  comparePassword(existingUser) {
    return bcrypt.compare(this.password, existingUser);
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    const newUser = {
      username: this.name,
      email: this.email,
      password: hashedPassword,
    };
    await db.getDb().collection("users").insertOne(newUser);
  }
}

module.exports = User;
