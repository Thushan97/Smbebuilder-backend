const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const smbebuilderApp = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.REACT_APP_URL,
    credentials: true,
  })
);
smbebuilderApp.use(express.static("smbebuilderApp"));
app.use(cookieParser());

app.use(passport.initialize());
require("./utils/passport")(passport);

app.use("/api", require("./routes/index"));

const PORT = process.env.PORT || 8000;
const BUILDER_APP_PORT = process.env.BUILDER_APP_PORT || 8001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

smbebuilderApp.listen(BUILDER_APP_PORT, () =>
  console.log(`App server started on port ${BUILDER_APP_PORT}`)
);
