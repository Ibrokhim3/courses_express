const jwt = require("jsonwebtoken");
const { read_file, write_file } = require("../fs/fs_api");
const userData = read_file("jwt.json");

module.exports = async function (req, res, next) {
  let userToken = userData[1];
  if (req.headers.token && req.headers.token === userToken) {
    next();
  } else {
    return res.send({
      msg: "Token doesn't exist or you are not authorized !",
    });
  }
};
