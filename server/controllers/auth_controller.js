const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const { read_file, write_file } = require("../fs/fs_api");
const jwt = require("jsonwebtoken");

const Auth = {
  REGISTER: async (req, res) => {
    const { username, email, vEmail, password } = req.body;

    let users = read_file("users.json");
    let foundedUser = users.find((user) => user.email === email);

    if (foundedUser) {
      return res.send({
        msg: "Email already exist",
      });
    }

    let hashPsw = await bcrypt.hash(password, 12);
    if (email === vEmail) {
      users.push({
        id: v4(),
        username,
        email,
        password: hashPsw,
      });

      write_file("users.json", users);

      return res.send({
        msg: "You are successfully registrated",
      });
    }
    res.send({
      msg: `Email addresses weren't matched!`,
    });
  },
  LOGIN: async (req, res) => {
    const { password, email } = req.body;

    const users = read_file("users.json");
    const foundedUser = users.find((user) => user.email === email);

    if (!foundedUser) {
      return res.status(404).send({
        msg: "User was not found",
      });
    }

    let psw = await bcrypt.compare(password, foundedUser.password);
    if (psw) {
      let token = await jwt.sign(
        {
          id: foundedUser.id,
          email: foundedUser.email,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: process.env.JWT_TIME,
        }
      );
      return res.send({
        msg: "You're logged in",
        token,
      });
    }
    res.send({ msg: "Password is incorrect" });
  },
};

module.exports = Auth;
