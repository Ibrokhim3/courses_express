const { Router } = require("express");
const CoursesCtr = require("../controllers/courses_controller");

let router = Router();

const authMiddleware = require("../middlewares/auth_middleware");

router.get("/courses", CoursesCtr.GET);
router.get("/courses_by_user", authMiddleware, CoursesCtr.GET_BY_USER);
router.post("/create_new_course", authMiddleware, CoursesCtr.CREATE);
router.put("/update_course/:id", authMiddleware, CoursesCtr.UPDATE);
router.post("/upload", authMiddleware, CoursesCtr.UPLOAD_FILE);
router.delete("/delete_course/:id", authMiddleware, CoursesCtr.DELETE);

module.exports = router;
