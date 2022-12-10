import { body } from "express-validator";

export const userLoginvalidator = [
    body('email').exists().isString().isEmail().normalizeEmail(),
    body('password').exists().isString()
]

export const userRegisterValidator = [
    body('email').exists().isString().isEmail().normalizeEmail(),
    body('name').exists().isString(),
    body('password').exists().isString().isLength({min:7})
]

export const userProfileValidator = [
    body('email').optional(),
    body('name').optional(),
    body('password').optional(),
    body('description').optional(),
    body('occupation').optional(),
]