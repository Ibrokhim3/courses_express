const { Router } = require("express");
const AuthCtr = require("../controllers/auth_controller");
const { userValidate } = require("../middlewares/user.middleware");

const router = Router();

router.post("/register", userValidate, AuthCtr.REGISTER);

/**
 * @swagger
 * components:
 *   schemas:
 *     Registration:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - vEmail
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: Password
 *         email:
 *           type: string
 *           description: The user's email
 *         vEmail:
 *           type: string
 *           description: Confirm the user's email
 *       example:
 *         username: Anvar
 *         email: swagger_example@gmail.com
 *         vEmail: swagger_example@gmail.com
 *         password: swagger1234
 */

/**
 * @swagger
 * tags:
 *   name: Registration
 *   description: The users managing API
 * /register:
 *   post:
 *     summary: User registration
 *     tags: [Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registration'
 *     responses:
 *       201:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Registration'
 *       500:
 *         description: Some server error
 *
 */

router.post("/login", AuthCtr.LOGIN);

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: Password
 *       example:
 *         username: Anvar
 *         password: swagger1234
 */

/**
 * @swagger
 * tags:
 *   name: Registration
 *   description: The users managing API
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       201:
 *         description: The user was logged in.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       500:
 *         description: Some server error
 *
 */

module.exports = router;
