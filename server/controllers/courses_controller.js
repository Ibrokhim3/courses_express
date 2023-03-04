const { v4 } = require("uuid");
const { read_file, write_file } = require("../fs/fs_api");
const userData = read_file("jwt.json");
const path = require("path");
const upload = require("express-fileupload");

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
  // CREATE: async (req, res) => {
  //   const { title, price, author } = req.body;
  //   if (title && price && author) {
  //     const { id } = userData[0];

  //     let courses = read_file("courses.json");

  //     courses.push({
  //       id: v4(),
  //       user_id: id,
  //       title,
  //       price,
  //       author,
  //     });

  //     write_file("courses.json", courses);
  //     return res.status(201).json(courses);
  //   }
  //   return res.send({ msg: "Please add title, price and author" });
  // },
  CREATE: async (req, res) => {
    let { title, price, author } = req.body;

    if (title && price && author) {
      // let file = req.files.image;

      const { id } = userData[0];

      // let filename = Date.now() + path.extname(file.name);
      // file.mv(path.resolve("upload_file/" + filename));

      // console.log(filename);

      let courses = read_file("courses.json");

      courses.push({
        id: v4(),
        user_id: id,
        title,
        price,
        author,
        // course_img: filename,
      });

      write_file("courses.json", courses);
      return res.status(201).json(courses);
    }
    return res.send({ msg: "Please add title, price and author" });
  },
  // CREATE: async (req, res) => {
  //   try {
  //     let { title, price, author } = req.body;
  //     let file = req.files;

  //     if (title === "" && price === "" && author === "" && file === undefined) {
  //       return res.send({ msg: "Please add title, price and author" });
  //     } else if (title && price && author && file) {
  //       const { id } = userData[0];

  //       let filename = Date.now() + path.extname(file.name);
  //       file.mv(path.resolve("upload_file/" + filename));

  //       let courses = read_file("courses.json");

  //       courses.push({
  //         id: v4(),
  //         user_id: id,
  //         title,
  //         price,
  //         author,
  //         course_img: filename,
  //       });

  //       write_file("courses.json", courses);
  //       return res.status(201).json(courses);
  //     }
  //   } catch (error) {
  //     return console.log(error.message);
  //   }
  // },
  UPDATE: (req, res) => {
    const { id } = userData[0];
    const { title, price, author } = req.body;

    let courses = read_file("courses.json");

    let foundedCourse = courses.find((course) => course.id === req.params.id);

    if (!foundedCourse) {
      return res.send({
        msg: "Course was not found",
      });
    }

    courses.forEach((course) => {
      if (course.id === req.params.id) {
        course.title = title ? title : course.title;
        course.price = price ? price : course.price;
        course.author = author ? author : course.author;

        write_file("courses.json", courses);
        return res.send({
          msg: "Course was updated",
        });
      }
    });
  },
  DELETE: (req, res) => {
    const { id } = userData[0];
    let courses = read_file("courses.json");
    let foundedCourse = courses.find((course) => course.id === req.params.id);
    if (!foundedCourse) {
      return res.send({
        msg: "Course was not found",
      });
    }
    courses.forEach((course, idx) => {
      if (course.id === req.params.id) {
        courses.splice(idx, 1);
      }
    });
    write_file("courses.json", courses);

    return res.send({
      msg: "Course was deleted",
    });
  },

  UPLOAD_FILE: (req, res) => {
    try {
      if (req.files) {
        let file = req.files.image;
        let filename = Date.now() + path.extname(file.name);
        file.mv(path.resolve("upload_file/" + filename), function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log(err);
          }
        });
        res.json({
          status: 200,
          message: "File successfully uploaded",
          image: filename,
        });
      } else return res.json({ status: 404, message: "file was not found !" });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = Course;
