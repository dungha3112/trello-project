import Joi from 'joi'
import { ObjectID } from 'mongodb'
import { getDB } from '@/configs/mongodb'

const columnCollectionName = 'columns'
const columnCollectionSchema = Joi.object({
  boardId     : Joi.string().required(),
  title       : Joi.string().required().min(3).max(30).trim(),
  cardOrder   : Joi.array().items(Joi.string()).default([]),
  createdAt   : Joi.date().timestamp().default(Date.now()),
  updatedAt   : Joi.date().timestamp().default(null),
  _destroy    : Joi.boolean().default(false)
})

const validateSchema = async (data) => {
  return await columnCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validatedValue = await validateSchema(data)
    const insertValue = {
      ...validatedValue,
      boardId: ObjectID(validatedValue.boardId)
    }
    const result = await getDB().collection(columnCollectionName).insertOne(insertValue)

    return result.ops[0]
  } catch (err) {
    throw new Error(err)
  }
}

/**
 *  @param {string} columnId
 *  @param {string} cardId
*/
const pushCardOrder = async (columnId, cardId) => {
  try {
    const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
      { _id: ObjectID(columnId) },
      { $push: { cardOrder: cardId } },
      { returnOriginal: false }
    )
    return result.value
  } catch (err) {
    throw new Error(err)
  }
}

const update = async (id, data) => {
  try {
    const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: data },
      { returnOriginal: false }
    )

    return result.value
  } catch (err) {
    throw new Error(err)
  }
}

export const ColumnModel = { columnCollectionName, createNew, pushCardOrder, update }
