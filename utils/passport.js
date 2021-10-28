const User = require("../models/user");
const JwtStrategy = require("passport-jwt").Strategy;

var cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) token = req.cookies["rui-auth-token"];
  return token;
};
const option = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: `${process.env.TOKEN_SECRET}`,
};

const jwtstrategy = new JwtStrategy(option, (payload, done) => {
  User.getUserById(payload.id)
    .then((user) => {
      if (user[0]) return done(null, user[0]);
      else return done(null, false);
    })
    .catch((err) => done(err, null));
});

module.exports = (passport) => {
  passport.use(jwtstrategy);
};
