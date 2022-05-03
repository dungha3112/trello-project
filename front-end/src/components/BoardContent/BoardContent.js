import React, { useEffect, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import './BoardContent.scss'

import { isEmpty } from 'lodash'
import Column from 'components/Column/Column'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dropDrop'

import { intialData } from 'actions/initialData'

const BoardContent = () => {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  useEffect( () => {
    const boardFromDB = intialData.boards.find(board => board.id === 'board-1')
    if (boardFromDB) {
      setBoard(boardFromDB)
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
    }
  }, [])
  if (isEmpty(board)) {
    return <div className="not-found" style={{ 'padding':'10px', 'color':'white' }} >Board not found</div>
  }
  const onColumnDrop = ( dropResult) => {
    let newColumns = [...columns]
    newColumns = applyDrag(newColumns, dropResult)
    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newBoard
    setColumns(newColumns)
    setBoard(newBoard)
  }
  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns]
      let currentColumn = newColumns.find(c => c.id === columnId)
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
      currentColumn.cardOrder = currentColumn.cards.map(i => i.id)
      setColumns(newColumns)
    }
  }
  return (
    <div className="board-contents">
      <Container
        orientation="horizontal"
        onDrop={dropResult => onColumnDrop(dropResult) }
        getChildPayload={index => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'column-drop-preview'
        }}
      >
        { columns.map((column, index) => (
          <Draggable key= {index} >
            <Column column= {column} onCardDrop={onCardDrop} />
          </Draggable>
          ))}
      </Container>
      <div className="add-new-column">
          <i className="fa fa-plus icon" />
          Add another column
      </div>
    </div>
  )
}
export default BoardContent
