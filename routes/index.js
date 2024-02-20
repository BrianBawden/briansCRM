
const express = require("express")
const path = require('path')
const router = express.Router()

router.use("/customers", require("./customers"))
router.use("/", require("./swagger"))

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'))
})

module.exports = router


