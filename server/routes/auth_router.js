const { Router } = require("express");
const AuthCtr = require("../controllers/auth_controller");
const { userValidate } = require("../middlewares/user.middleware");

const router = Router();

router.post("/register", userValidate, AuthCtr.REGISTER);
router.post("/login", AuthCtr.LOGIN);

module.exports = router;
