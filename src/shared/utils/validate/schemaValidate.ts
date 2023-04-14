import Joi from 'joi'

export const validateProductsRequest = Joi.object({
  url: Joi.string().required()
})
