const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { read_file, write_file } = require("../fs/fs_api");
const userData = read_file("jwt.json");

const Auth = {
  REGISTER: async (req, res) => {
    const { username, email, vEmail, password } = req.body;

    let users = read_file("users.json");
    let foundedUser = users.find((user) => user.username === username);

    if (foundedUser) {
      return res.send({
        msg: "This username already exist",
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
    const { password, username } = req.body;

    const users = read_file("users.json");
    const foundedUser = users.find((user) => user.username === username);

    if (!foundedUser) {
      return res.status(404).send({
        msg: "User was not found",
      });
    }

    let psw = await bcrypt.compare(password, foundedUser.password);
    if (psw) {
      // let userToken = read_file("jwt.json");
      // console.log(userToken);
      let token = await jwt.sign(
        {
          id: foundedUser.id,
          username: foundedUser.username,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: process.env.JWT_TIME,
        }
      );
      // let jwtToken = read_file("jwt.json");

      let gen_token = jwt.verify(token, process.env.SECRET_KEY);
      let users_arr = read_file("jwt.json");
      users_arr[0] = gen_token;
      users_arr[1] = token;
      write_file("jwt.json", users_arr);

      return res.send({
        msg: "You're logged in",
        token,
      });
    }

    res.send({ msg: "Password is incorrect" });
  },
};

module.exports = Auth;
