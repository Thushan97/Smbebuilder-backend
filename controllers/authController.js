const db = require("../utils/db");
const User = require("../models/user");
const utils = require("../utils/utils");
const randomstring = require("randomstring");
const mailer = require("../utils/mailer");
const queryString = require("query-string");
const crypto = require("crypto");

require("express-async-errors");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const user = (await User.getUserByEmail(email))[0];
  if (user && user.account_state)
    return res.json({ status: false, msg: "This email already registered" });
  if (user && !user.account_state)
    return res.json({
      status: false,
      msg: "This email already registered, confirm your registration by clicking email verification link",
    });

  const encryptedPassword = await utils.genPassword(password);
  const confirmationCode = randomstring.generate(255);

  const result = await User.createUser({
    email: email,
    name: name,
    password: encryptedPassword,
    reg_date: new Date(),
    type: "free",
    plan_started: new Date(),
    plan_expire: new Date(),
    account_state: false,
    confirmationCode: confirmationCode,
  });

  const stringified = queryString.stringify({
    confirmationCode,
    email,
  });
  const verificationURL = `${process.env.BASE_URL}/api/auth/register-confirm?${stringified}`;

  mailer
    .sendMail({
      from: "SMBebuilder",
      to: email,
      subject: "Email Verification",
      text: "",
      htmlPageName: "registration-confirm",
      replacements: { verificationURL },
    })
    .then(() => {
      res.json({
        status: true,
        msg: "We have send confirmation to your email, confirm your registration by clicking email verification link",
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: false,
        msg: "Something wrong..! Fail to send the verification link",
      });
    });
};

const registrationConfirm = async (req, res) => {
  const { email, confirmationCode } = req.query;

  const user = (await User.getUserByEmail(email))[0];

  if (!user) return res.send("<h1>This email is not a registered email</h1>");
  if (user && user.account_state)
    return res.send("<h1>This email registration is already confirmed</h1>");

  await User.confirmeUserRegistration(user.id);
  res.send("<h1>Your email confirmation successful </h1>");
};

const login = async (req, res) => {
  res.clearCookie("rui-auth-token");
  const { email, password } = req.body;
  const user = (await User.getUserByEmail(email))[0];

  if (!user)
    return res.json({
      status: false,
      msg: "This email not registered",
    });
  if (user && !user.account_state)
    return res.json({
      status: false,
      msg: "Please confirm your email address before you sign in",
    });

  const isValid = await utils.validPassword(password, user.password);

  if (isValid) {
    const tokenObject = utils.issueJWT(user);
    res
      // .cookie("rui-auth-token", tokenObject.token, {
      //   path: "/",
      //   httpOnly: true,
      //   expires: new Date(
      //     new Date().getTime() +
      //       1000 * 60 * 60 * 24 * process.env.TOKEN_EXPIRE_TIME
      //   ),
      // })
      .json({
        status: true,
        msg: "successful",
        rui_auth_token: tokenObject.token,
      });
  } else {
    res.send({ status: false, msg: "password is wrong" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  let user = (await User.getUserByEmail(email))[0];
  if (!user)
    return res.json({
      status: false,
      msg: "This email is not registered. Please check the entered email.",
    });
  if (user && !user.account_state)
    return res.json({
      status: false,
      msg: "Please confirm your email confirmation",
    });

  const userId = user.id;
  const token = crypto.randomBytes(32).toString("hex");

  const expireIn = new Date(Date.now() + 1000 * 60 * 60);

  const result = await User.setPasswordResetToken({ userId, token, expireIn });
  const stringified = queryString.stringify({ email, userId, token });

  replacements = {
    password_reset_link: `${process.env.REACT_APP_URL}/#/password-reset-form?${stringified}`,
  };

  mailer
    .sendMail({
      from: "SMBebuilder",
      to: email,
      subject: "Password Reset",
      text: "",
      htmlPageName: "password-reset",
      replacements,
    })
    .then(() => {
      res.json({
        status: true,
        msg: "Password reset link sent to your email. Please reset your password within 1 hour.",
      });
    })
    .catch((err) => {
      res.json({
        status: false,
        msg: "Something wrong..! Fail to send the email.",
      });
    });
};

const resetPassword = async (req, res) => {
  const { userId, email, token, password } = req.body;

  if (!userId || !email || !token || !password)
    return res.json({
      status: false,
      msg: "False verification details. Please try again.",
    });

  const user = (await User.getUserById(userId))[0];
  const resetToken = (await User.getPasswordResetToken(userId))[0];

  if (!user || user.email !== email)
    return res.json({
      status: false,
      msg: "False verification details. Please try again.",
    });
  if (token !== resetToken.token)
    return res.json({
      status: false,
      msg: "invalid token",
    });
  if (Date.now() > Date.parse(resetToken.expireIn)) {
    return res.json({
      status: false,
      msg: "Password reset link expired. Please try again.",
    });
  }
  const encryptedPassword = await utils.genPassword(password);

  const result = await User.resetPassword({
    id: userId,
    password: encryptedPassword,
  });
  return res.json({
    status: true,
    msg: "Password resetting successful",
  });
};

const getUser = async (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    type: req.user.type,
  });
};

module.exports = {
  register,
  login,
  registrationConfirm,
  forgotPassword,
  resetPassword,
  getUser,
};
