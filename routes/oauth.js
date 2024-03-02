require('../controllers/auth')

const express = require("express")
const session = require("express-session")
const passport = require("passport")
const dotenv = require("dotenv")
const router = express.Router()
const path = require("path")


dotenv.config()

function isLoggedIn(req, res, next){
  req.user ? next() : res.sendStatus(401)
}

const app = express()
app.use(session({ secret: process.env.SESSION_SECRET}))
app.use(passport.initialize())
app.use(passport.session())

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/views/login.html"))
  // res.send('<a href="/auth/google">Authenticate with Google</a>')

})

router.get("/auth/google", 
  passport.authenticate("google", {scope: ["email", "profile"]}),
)

router.get("/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  })  
)

router.get("auth/failure", (req, res) => {
  res.send("Something went wrong.")
})

router.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`)
})

router.get("/logout", function(req, res, next) {
  req.logout(function(err){
    if (err) {return next(err)}
  })
  req.session.destroy()
  res.send("Goodby!")
})

module.exports = [
  router,
  isLoggedIn
]