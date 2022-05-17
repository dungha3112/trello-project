import Joi from 'joi'
import { HttpStatusCode } from '@/utilities/constants'

const createNew = async (req, res, next) => {
  const conditon = Joi.object({
    boardId   : Joi.string().required(),
    title     : Joi.string().required().min(3).max(20)
  })
  try {
    await conditon.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (err) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: new Error(err).message
    })
  }
}

const update = async (req, res, next) => {
  const conditon = Joi.object({
    title     : Joi.string().min(3).max(30).trim()
  })
  try {
    await conditon.validateAsync(req.body, { abortEarly: false, allowUnknown: true } )
    next()
  } catch (err) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: new Error(err).message
    })
  }
}

export const ColumnValidation = { createNew, update }
