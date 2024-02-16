const { check, validationResult } = require('express-validator')

exports.validationCheck = [
  check(['firstName', 'lastName', 'phone', 'address'], 'first and last name, phone, email and address are required fields').not().isEmpty(),
]

exports.validationPassFail = (req, res, next) => {
  const result = validationResult(req)
  console.log(result.value)
  if (!result.isEmpty()){
    console.log("testing")
    return res.status(400).send(result.errors[0].msg)
  }else {
    console.log("passed")
    next()
  }
}
  