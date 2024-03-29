const express = require('express')
const session = require("express-session")
const passport = require("passport")
const mongodb = require('./db/connect')
const dotenv = require("dotenv")
const bodyParser = require('body-parser')
const cors = require('cors')

require('./controllers/auth')


dotenv.config()

const port = process.env.PORT || 3000
const app = express()

app
.use(session({ 
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: true 
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use(bodyParser.json())
  .use(cors('*'))
  .use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
  })
  .use('/', require('./routes'))

  process.on('uncaughtException', (err, origin)=>{
    console.log(process.stderr.fd, `Caught exception: ${err}/n` + `Exception origin: ${origin}`)
  })

  mongodb.initDb((err, mongodb) =>{
    if(err) {
      console.log(`Error init DB in app: ${err}`)
    } else {
      app.listen(port)
      console.log(`DB connected at ${port}`)
    }
  })

  app.use(express.static('public'))