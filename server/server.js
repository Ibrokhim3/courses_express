const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const authRouter = require("./routes/auth_router");
const authMiddleware = require("./middlewares/auth_middleware"); //routerlardan tepada turish kerak
const coursesRouter = require("./routes/courses_router");

const fileUpload = require("express-fileupload");

dotenv.config();
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload());
app.use(authRouter);
app.use(coursesRouter);
// app.use(authMiddleware);

app.listen(PORT, () => {
  console.log(`${PORT} is active`);
});
