import { body } from 'express-validator';

const registerValidator = [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ max: 50 })
    .withMessage('Username can be at most 50 characters long'),

  body('email')
    .isEmail({ require_tld: true })
    .withMessage('Please enter a valid email address'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),

  body('phoneNumber')
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[0-9]{10,15}$/)
    .withMessage('Phone number must be between 10 and 15 digits long'),
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
