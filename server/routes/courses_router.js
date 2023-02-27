const { Router } = require("express");
const CoursesCtr = require("../controllers/courses_controller");

let router = Router();

router.get("/courses", CoursesCtr.GET);

module.exports = router