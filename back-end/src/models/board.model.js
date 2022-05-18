import Joi from 'joi'
import { ObjectID } from 'mongodb'
import { getDB } from '@/configs/mongodb'
import { ColumnModel } from './column.model'
import { CardModel } from './card.model'

const boardCollectionName = 'boards'
const boardCollectionSchema = Joi.object({
  title       : Joi.string().required().min(3).max(30).trim(),
  columnOrder : Joi.array().items(Joi.string()).default([]),
  createdAt   : Joi.date().timestamp().default(Date.now()),
  updatedAt   : Joi.date().timestamp().default(null),
  _destroy    : Joi.boolean().default(false)
})

const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const value = await validateSchema(data)
    const result = await getDB().collection(boardCollectionName).insertOne(value)
    return result.ops[0]
  } catch (err) {
    throw new Error(err)
  }
}
/**
 *  @param {string} boardId
 *  @param {string} columnId
*/
const pushColumnOrder = async (boardId, columnId) => {
  try {
    const result = await getDB().collection(boardCollectionName).findOneAndUpdate(
      { _id: ObjectID(boardId) },
      { $push: { columnOrder: columnId } },
      { returnOriginal: false }
    )
    return result.value
  } catch (err) {
    throw new Error(err)
  }
}

const getFullBoard = async (boardId) => {
  try {
    const result = await getDB().collection(boardCollectionName).aggregate([
      { $match: { _id: ObjectID(boardId) } },
      { $lookup: {
        from: ColumnModel.columnCollectionName,
        localField: '_id',
        foreignField: 'boardId',
        as: 'columns'
      } },
      { $lookup: {
        from: CardModel.cardCollectionName,
        localField: '_id',
        foreignField: 'boardId',
        as: 'cards'
      } }
    ]).toArray()

    return result[0] || {}
  } catch (err) {
    throw new Error(err)
  }
}

export const BoardModel = { createNew, pushColumnOrder, getFullBoard }
