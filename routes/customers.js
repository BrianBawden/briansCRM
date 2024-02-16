const express = require('express')
const {validationCheck, validationPassFail} = require('../validation.js')
const router = express.Router()

const dbControllers = require("../controllers/dbControllers")

router.get("/", dbControllers.getAll)

router.get("/:id", dbControllers.getById)

router.post("/", validationCheck, validationPassFail, dbControllers.insertOne)

router.put("/:id", dbControllers.updateOne)

router.delete("/:id", dbControllers.deleteOne)


module.exports = router