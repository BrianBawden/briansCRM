const { check, validationResult } = require('express-validator')

exports.validationCheck = [
  check('firstName', 'Name is required').not().isEmpty()
]

exports.validationPassFail = (req, res, next) => {
  const result = validationResult(req)
  console.log(result.value)
  if (!result.isEmpty()){
    console.log("testing")
    return res.status(400).send("Validation failed")
  }else {
    console.log("passed")
    next()
  }
}
  