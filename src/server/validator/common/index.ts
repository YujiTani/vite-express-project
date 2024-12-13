import express from 'express';
import {body, param} from 'express-validator';

// idのバリデーション
const validateId = [
  param('id').isInt().withMessage('IDは整数でなければなりません')
];

export { validateId };