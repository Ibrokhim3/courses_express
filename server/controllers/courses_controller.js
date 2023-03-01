const { v4 } = require("uuid");
const { read_file, write_file } = require("../fs/fs_api");
const jwt = require("jsonwebtoken");
const userData = read_file("jwt.json");

let Course = {
  GET: (req, res) => {
      let courses = read_file("courses.json");
      res.send(courses);
 
  },
  GET_BY_USER: (req, res) => {
    let { id } = userData[0];

    let courses = read_file("courses.json").filter(
      (user) => user.user_id === id
    );

    res.status(200).json(courses);
  },
  CREATE: async (req, res) => {
    const { title, price, author } = req.body;
    const { id } = userData[0];

    let courses = read_file("courses.json");

    courses.push({
      id: v4(),
      user_id: id,
      title,
      price,
      author,
    });

    write_file("courses.json", courses);
    res.status(201).json(courses);
  },
  UPDATE: (req, res) => {
    const { title, price, author } = req.body;
    let courses = read_file("courses.json");

    courses.forEach((course) => {
      if (course.id === req.params.id) {
        course.title = title ? title : course.title;
        course.price = price ? price : course.price;
        course.author = author ? author : course.author;
      }
    });
    write_file("courses.json", courses);
    res.send({
      msg: "Course was updated",
    });
  },
  DELETE: (req, res) => {
    let courses = read_file("courses.json");
    courses.forEach((course, idx) => {
      if (course.id === req.params.id) {
        courses.splice(idx, 1);
      }
      write_file("courses.json", courses);
      res.status(200).json({
        msg: "Course was deleted",
      });
    });
  },
};

module.exports = Course;
