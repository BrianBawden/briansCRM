const express = require('express')
const mongodb = require('./db/connect')
const dotenv = require("dotenv")
const bodyParser = require('body-parser')
const cors = require('cors')

dotenv.config()

const port = process.env.PORT || 3000
const app = express()

app
  .use(bodyParser.json())
  .use(cors('*'))
  .use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
  })
  .use('/', require('./routes'))

  mongodb.initDb((err, mongodb) =>{
    if(err) {
      console.log(`Error init DB in app: ${err}`)
    } else {
      app.listen(port)
      console.log(`DB connected at ${port}`)
    }
  })