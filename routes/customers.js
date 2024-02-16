const express = require('express')
const {validatePost, validatePut, validationPassFail, validateIds} = require('../validation.js')
const router = express.Router()

const dbControllers = require("../controllers/dbControllers")

router.get("/", dbControllers.getAll)

router.get("/:id", validateIds, validationPassFail, dbControllers.getById)

router.post("/", validatePost, validationPassFail, dbControllers.insertOne)

router.put("/:id", validateIds, validatePut, validationPassFail, dbControllers.updateOne)

router.delete("/:id", validateIds, validationPassFail, dbControllers.deleteOne)


module.exports = router