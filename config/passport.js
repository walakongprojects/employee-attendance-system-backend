const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const adminModel = require('../model/admin')

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'my secret';

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        const user = await adminModel.findById(jwt_payload.id)
        
        if(!user) {
          return done(null, false);
        }

        return done(null, user);
    })
  );
};