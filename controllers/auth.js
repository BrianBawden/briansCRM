const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const dotenv = require("dotenv")

dotenv.config()


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://brianscrm.onrender.com/google/callback",  
    passReqToCallback   : true
  },

  // This function is use if the user logs in successfully.
  // Run a GET by email, if not found run POST and create new user.

  //The accessToken and refreshToken are used interact with the users API you 
  //have access to
  function(request, accessToken, refreshToken, profile, done) {
    console.log("Google Profile: " , profile)
      return done(null, profile);
  }
));

// Save the user's google info to the session to stay logged in
passport.serializeUser(function(user, done) {
  console.log("serialize user: ", user)
  done(null, user)
})

// access the user's google info saved to the session. 
passport.deserializeUser(function(user, done) {
  console.log("deserialize user", user)

  done(null, user)
})

