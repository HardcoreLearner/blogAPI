const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcryptjs');
const User = require('../model/user');
const { secret } = require('../config/jwt'); // Import JWT secret from jwt.js

// Local strategy for username/password authentication
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return done(null, false, { message: 'Incorrect username' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

// JWT strategy for token authentication
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret // Use JWT secret from jwt.js
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
}));

module.exports = passport;
