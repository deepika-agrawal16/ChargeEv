import { body } from 'express-validator';

const registerValidator = [
  body('email')
    .isEmail({ require_tld: true })
    .withMessage('Please enter a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('name')
    .notEmpty()
    .withMessage('Name is required')
];

const loginValidator = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

export default {
  registerValidator,
  loginValidator
};