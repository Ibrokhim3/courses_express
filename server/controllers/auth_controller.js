const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const { read_file, write_file } = require("../fs/fs_api");

const Auth = {
  REGISTER: async (req, res) => {
    const { username, email, password } = req.body;

    let users = read_file("users.json");
    let foundedUser = users.find((user) => user.email === email);

    if (foundedUser) {
      return res.send({
        msg: "Email already exist",
      });
    }

    let hashPsw = await bcrypt.hash(password, 12);

    users.push({
      id: v4(),
      username,
      email,
      password: hashPsw,
    });
  },
};
