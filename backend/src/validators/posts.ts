import { body } from "express-validator";

export const postCreateValidator = [
    body('title').exists().isString(),
    body('content').exists().isString(),
    body('image').isString().optional(),
    body("status").isIn(['DRAFT','PUBLISHED']).optional(),
]

export const postUpdateValidator = [
    body('title').optional(),
    body('content').optional(),
    body('image').optional(),
    body("status").optional()
]

export const commentInputValidator = [
    body('content').exists().isString(),
]