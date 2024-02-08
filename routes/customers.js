const express = require('express')
const router = express.Router()

const dbControllers = require("../controllers/dbControllers")

router.get("/", dbControllers.getAll)

router.get("/:id", dbControllers.getById)

router.post("/", dbControllers.insertOne)

router.put("/", dbControllers.updateOne)

router.delete("/", dbControllers.deleteOne)


module.exports = router