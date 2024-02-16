const { check, validationResult } = require('express-validator')

exports.validatePost = [
  check(['firstName', 'lastName', 'phone', 'email', 'address'], 'first and last name, phone, email and address are required fields').trim().notEmpty().escape(),
  check('email', 'Enter valid email.').trim().escape().isEmail()
]

exports.validateIds = [
  check('id', `id invalid not found.`).notEmpty()
]

exports.validationPassFail = (req, res, next) => {
  const result = validationResult(req)
  if (!result.isEmpty()){
    return res.status(400).send(result.errors[0].msg)
  }else {
    next()
  }
}
  