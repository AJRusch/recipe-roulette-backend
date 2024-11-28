const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateUserRegistration = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
    }),

    password: Joi.string().required().min(4).max(20).messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
    }),

    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
  }),
});

module.exports.validateRecipeCard = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().min(5).messages({
      "string.min": 'The minimum length of the "title" field is 2',
      "string.empty": 'the "title" field must be filled in',
    }),

    image: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),

    summary: Joi.string().required().min(20).messages({
      "string.min": 'The minimum length of the "summary" field is 20',
      "string.empty": 'the "summary" field must be filled in',
    }),
  }),
});

module.exports.validateRecipeCardId = celebrate({
  params: Joi.object().keys({
    recipeId: Joi.string().hex().length(24).required().messages({
      "string.hex": "Invalid Recipe ID format",
      "string.length": "Invalid Recipe ID length",
      "any.required": "Recipe ID is required",
    }),
  }),
});
