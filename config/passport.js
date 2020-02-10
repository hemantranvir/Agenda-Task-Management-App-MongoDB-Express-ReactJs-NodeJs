const JwtStrategy = require("passport-jwt").Strategy;
//const JwtCookieComboStrategy = require('passport-jwt-cookiecombo');
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/secrets");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  //passport.use(
  //  new JwtStrategy(opts, (jwt_payload, done) => {
  //passport.use(new JwtCookieComboStrategy({
  //    secretOrPublicKey: keys.secretOrKey
  //}, (payload, done) => {
  passport.use(new JwtStrategy({
      jwtFromRequest: req => req.signedCookies["jwt"],
      secretOrKey: keys.secretOrKey,
    },
    (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
