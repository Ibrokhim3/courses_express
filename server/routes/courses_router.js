const { Router } = require("express");
const CoursesCtr = require("../controllers/courses_controller");
const {
  getUserValidate,
  courseValidate,
} = require("../middlewares/user.middleware");

let router = Router();

const authMiddleware = require("../middlewares/auth_middleware");

router.get("/courses", CoursesCtr.GET);
router.get("/courses_by_user", authMiddleware, CoursesCtr.GET_BY_USER);
router.get(
  "/get_one_course/:id",
  [authMiddleware, getUserValidate],
  CoursesCtr.GET_ONE
);
router.post(
  "/create_new_course",
  [authMiddleware, courseValidate],
  CoursesCtr.CREATE
);
router.put(
  "/update_course/:id",
  [authMiddleware, getUserValidate, courseValidate],
  CoursesCtr.UPDATE
);
router.post("/upload", authMiddleware, CoursesCtr.UPLOAD_FILE);
router.delete(
  "/delete_course/:id",
  [authMiddleware, getUserValidate],
  CoursesCtr.DELETE
);

module.exports = router;
