const { check, validationResult } = require('express-validator');

const validator = [
  check('title').trim().not().isEmpty().withMessage('Titulo é necessário!'),
  check('content')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Digite o conteúdo!'),
  check('category')
    .isIn(exceptedCategory)
    .withMessage('Select at least one category!'),
];

const result = (req, res, next) => {
  const result = validationResult(req);
  const hasError = !result.isEmpty();

  if (hasError) {
    const error = result.array()[0].msg;
    res.json({ success: false, message: error });
  }

  next();
};


module.exports = {
  validator,
  result,
  validateFile,
};
