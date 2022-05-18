import { BoardModel } from '@/models/board.model'

const createNew = async (data) => {
  try {
    const newBoard = await BoardModel.createNew(data)

    return newBoard
  } catch (err) {
    throw new Error(err)
  }
}

const getFullBoard = async (boardId) => {
  try {
    const board = await BoardModel.getFullBoard(boardId)
    if (!board || !board.columns) {
      throw new Error('Board not found')
    }
    // add card to each column
    board.columns.forEach(column => {
      column.cards = board.cards.filter(c => c.columnId.toString() === column._id.toString())
    })
    // sort column by columnOrder , sort column by cardOrder , this step will apass to front-end dev

    // remove card data from board
    delete board.cards
    return board
  } catch (err) {
    throw new Error(err)
  }
}

export const BoardService = { createNew, getFullBoard }
