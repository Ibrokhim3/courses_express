const { Router } = require("express");
const CoursesCtr = require("../controllers/courses_controller");
const AuthMdl = require("../middlewares/auth_middleware");

let router = Router();

router.get("/courses", CoursesCtr.GET);
router.get("/courses_by_user", CoursesCtr.GET_BY_USER);
router.post("/create_new_course", CoursesCtr.CREATE);
router.put("/update_course/:id", CoursesCtr.UPDATE);
router.delete("/delete_course/:id", CoursesCtr.DELETE);

module.exports = router;
