const passport = require("passport");

const ensureAuthenticated = (req, res, next) => {
  // console.log(req);
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send("Unauthorized");
    } else {
      req.user = user;
    }
    return next();
  })(req, res, next);
};

module.exports = {
  ensureAuthenticated,
};
