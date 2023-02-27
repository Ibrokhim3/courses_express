const { v4 } = require("uuid");
const { read_file, write_file } = require("../fs/fs_api");
const jwt = require("jsonwebtoken");
const userData = read_file("jwt.json");

let Course = {
  GET: (req, res) => {
    let courses = read_file("courses.json");
    res.send(courses);
  },
  GET: (req, res) => {
    let { id } = userData[0];

    let courses = read_file("courses.json").filter((user) => user.id === id);
  },
};

module.exports = Course;
