const Doctor = require('../models/doctor');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
  };

  passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done)=> {

    console.log('payload received', jwt_payload);
    // usually this would be a database call:
    Doctor.findById(jwt_payload.id)
    .then(user => {
           console.log("authorized")
            if (user) {
            done(null, user);
            } else {
            done(null, false);
            }
    })
    .catch(err => {
        done(err, false)
    })
    
  }));

  module.exports = passport;