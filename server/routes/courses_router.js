const { Router } = require("express");
const CoursesCtr = require("../controllers/courses_controller");
const {
  getUserValidate,
  courseValidate,
} = require("../middlewares/user.middleware");

let router = Router();

const authMiddleware = require("../middlewares/auth_middleware");

router.get("/courses", CoursesCtr.GET);

/**
 * @swagger
 * components:
 *   schemas:
 *     Get_all_courses:
 *       type: object
 *         - id
 *         - user_id
 *         - title
 *         - price
 *         - author
 *         - course_img
 *       properties:
 *         id:
 *           type: string
 *           description: The id of the course
 *         user_id:
 *           type: string
 *           description: User's id
 *         title:
 *           type: string
 *           description: The course
 *         price:
 *           type: number
 *           description: Price of the course
 *         author:
 *           type: string
 *           description: Author of the course
 *         course_img:
 *           type: string
 *           description: Image of the course
 *
 *       example:
 *         id: 4946cb40-39cc-477d-a314-067fe12853e1
 *         user_id: a5c735df-1d12-4cb4-9a5b-f8f95653d04d
 *         title: sss
 *         price: 1000
 *         author: men
 *         course_img: 1677948896372.png
 */

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: The users managing API
 * /courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Get all courses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Get_all_courses'
 *       500:
 *         description: Some server error
 *
 */

router.get("/courses_by_user", authMiddleware, CoursesCtr.GET_BY_USER);

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: The users managing API
 * /courses_by_user:
 *   get:
 *     summary: Get  courses by user
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Courses by user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Get_all_courses'
 *       404:
 *         description: The course was not found
 *       500:
 *         description: Some server error
 *
 */

router.get(
  "/get_one_course/:id",
  [authMiddleware, getUserValidate],
  CoursesCtr.GET_ONE
);

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: The users managing API
 * /get_one_course/{id}:
 *   get:
 *     summary: Get one course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           description: The course id
 *     responses:
 *       200:
 *         description: Courses by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Get_all_courses'
 *       404:
 *         description: The course was not found
 *       500:
 *         description: Some server error
 *
 */

router.post(
  "/create_new_course",
  [authMiddleware, courseValidate],
  CoursesCtr.CREATE
);

/**
 * @swagger
 * components:
 *   schemas:
 *     Create_course:
 *       type: object
 *       required:
 *         - title
 *         - price
 *         - author
 *         - course_img
 *       properties:
 *         title:
 *           type: string
 *           description: The course's title
 *         price:
 *           type: number
 *           description: Price of the course
 *         author:
 *           type: string
 *           description: Author of the course
 *         course_img:
 *           type: string
 *           description: Image of the course
 *
 *       example:
 *         title: sss
 *         price: 1000
 *         author: men
 *         course_img: 1677948896372.png
 */

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: The users managing API
 * /create_new_course:
 *   post:
 *     summary: Creating a new course
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: The course was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Create_course'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 *
 */

router.put(
  "/update_course/:id",
  [authMiddleware, getUserValidate, courseValidate],
  CoursesCtr.UPDATE
);

/**
 * @swagger
 * components:
 *   schemas:
 *     Update_the_course:
 *       type: object
 *       required:
 *         - title
 *         - price
 *         - author
 *         - course_img
 *       properties:
 *         title:
 *           type: string
 *           description: The course's title
 *         price:
 *           type: number
 *           description: Price of the course
 *         author:
 *           type: string
 *           description: Author of the course
 *         course_img:
 *           type: string
 *           description: Image of the course
 *
 *       example:
 *         title: sss
 *         price: 1000
 *         author: men
 *         course_img: 1677948896372.png
 */

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: The users managing API
 * /update_course/{id}:
 *   put:
 *     summary: Updating the course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           description: The course id
 *     responses:
 *       200:
 *         description: The course was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Update_the_course'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Course was not found
 *       500:
 *         description: Some server error
 *
 */

router.delete(
  "/delete_course/:id",
  [authMiddleware, getUserValidate],
  CoursesCtr.DELETE
);

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: The users managing API
 * /delete_course/{id}:
 *   delete:
 *     summary: Deleting the course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           description: The course id
 *     responses:
 *       200:
 *         description: The course was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Update_the_course'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Course was not found
 *       500:
 *         description: Some server error
 *
 */

router.post("/upload", authMiddleware, CoursesCtr.UPLOAD_FILE);

module.exports = router;
