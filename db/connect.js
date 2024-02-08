const {MongoClient} = require("mongodb")
const dotenv = require("dotenv")
dotenv.config()

let _db

const initDb = (callback) => {
  if(_db) {
    console.log("Already connected")
    return callback(null, _db)
  }
  MongoClient.connect(process.env.MONGO_URI)
  .then((client) =>{
    _db = client;
    callback(null, _db)
  })
  .catch((err) => {
    console.log("Error connecting with DB")
    callback(err)
  })
}

const getDb = () => {
  if(!_db) {
    throw Error("DB failed to connect")
  }
  return _db
}

module.exports = {
  initDb,
  getDb
}
