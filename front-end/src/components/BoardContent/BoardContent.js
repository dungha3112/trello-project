import React, { useEffect, useRef, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import { isEmpty } from 'lodash'
import { Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap'

import './BoardContent.scss'
import Column from 'components/Column/Column'
import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dropDrop'

import { intialData } from 'actions/initialData'

const BoardContent = () => {
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState([])
  const [openNewColumn, setOpenNewColumn] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumn(!openNewColumn)

  const newColumnInputRef = useRef(null)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const onNewCloumTitleChange = (e) => setNewColumnTitle(e.target.value)
  useEffect( () => {
    const boardFromDB = intialData.boards.find(board => board.id === 'board-1')
    if (boardFromDB) {
      setBoard(boardFromDB)
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
    }
  }, [])

  useEffect( () => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus()
      newColumnInputRef.current.select()
    }
  }, [openNewColumn])
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

  const addNewColumn = () => {
    if (!newColumnTitle.trim()) {
      newColumnInputRef.current.focus()
      return
    }
    const newColumnToAdd = {
      id: Math.random().toString(36).substr(2, 5), // 5 random characters , will remove when we implement code api
      boardId: board.id,
      title: newColumnTitle.trim(),
      cardOrder: [],
      cards: []
    }
    let newColumns = [...columns]
    newColumns.push(newColumnToAdd)

    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newBoard

    setColumns(newColumns)
    setBoard(newBoard)
    setNewColumnTitle('')
    toggleOpenNewColumnForm()
  }
  const onUpdateColumn = (newColumnToUpdate) => {
    const columnIdToUpdate = newColumnToUpdate.id
    let newColumns = [...columns]
    const columnIndexToUpdate = newColumns.findIndex(i => i.id === columnIdToUpdate)

    if (newColumnToUpdate._destroy) {
      // remove
      newColumns.splice(columnIndexToUpdate, 1)
    }
    else {
      // update
      newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
    }
    let newBoard = { ...board }
    newBoard.columnOrder = newColumns.map(c => c.id)
    newBoard.columns = newBoard
    setColumns(newColumns)
    setBoard(newBoard)
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
            <Column
              column= {column}
              onCardDrop={onCardDrop}
              onUpdateColumn={onUpdateColumn} />

          </Draggable>
          ))}
      </Container>

      <BootstrapContainer className="trello-bootstrap-container" >
        {
          !openNewColumn &&
          <Row>
            <Col className="add-new-column" onClick={toggleOpenNewColumnForm} >
              <i className="fa fa-plus icon" />
              Add another column
            </Col>
          </Row>
        }
        {
          openNewColumn &&
          <Row>
            <Col className="enter-new-column" >
              < Form.Control
              size="sm" type="text"
              placeholder="Enter column title..."
              className="input-enter-new-column"
              ref={newColumnInputRef}
              value={newColumnTitle}
              onChange={onNewCloumTitleChange}
              onKeyDown={event => (event.key === 'Enter') && addNewColumn() }
              />
              <Button variant="success" size="sm" onClick={addNewColumn}>
                Add Column
              </Button>
              <span className="cancel-icon" onClick={toggleOpenNewColumnForm }>
                <i className="fa fa-trash icon"/>
              </span>
            </Col>
          </Row>
        }
      </BootstrapContainer>
    </div>
  )
}
export default BoardContent
