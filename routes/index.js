
const exp = require("constants")
const express = require("express")
const path = require("path")
const router = express.Router()

app = express();

router.use("/", require("./oauth"))
router.use("/", require("./swagger"))
router.use("/customers", require("./customers"))

// router.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/views/login.html"))
// })

module.exports = router


