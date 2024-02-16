const { check, validationResult } = require('express-validator')

exports.validatePost = [
  check(['firstName', 'lastName', 'phone', 'email', 'address'], 'first and last name, phone, email and address are required fields').trim().notEmpty(),
  check('email', 'Enter valid email.').isEmail()
]

exports.validationPassFail = (req, res, next) => {
  const result = validationResult(req)
  console.log(result.value)
  if (!result.isEmpty()){
    return res.status(400).send(result.errors[0].msg)
  }else {
    next()
  }
}
  