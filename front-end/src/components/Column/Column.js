import React, { useCallback, useEffect, useState } from 'react'
import { Dropdown, Form } from 'react-bootstrap'
import { Container, Draggable } from 'react-smooth-dnd'
import './Column.scss'
import Card from 'components/Card/Card'
import { mapOrder } from '../../utilities/sorts'
import ConfirmModal from 'components/Common/ConfirmModal'
import { MODAL_ACTION_CONFIRM } from 'utilities/constants'
import { saveContentAfterPressEnter, seclectAllInlineText } from 'utilities/contentEditable'


const Column = (props) => {
  const { column, onCardDrop, onUpdateColumn } = props
  const cards = mapOrder(column.cards, column.cardOrder, 'id')

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [columnTitle, setColumnTitle] = useState('')

  const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)

  useEffect( () => {
    setColumnTitle(column.title)
  }, [column.title])

  const handleColumnTitleChange = useCallback((e) => setColumnTitle(e.target.value), [])

  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM ) {
      // remove column
      const newColumn = {
        ...column,
        _destroy: true
      }
      onUpdateColumn(newColumn)
    }
    toggleShowConfirmModal()
  }

  const handleColumnTitleBlur = () => {
    // console.log(columnTitle)
    const newColumn = {
      ...column,
      title: columnTitle
    }
    onUpdateColumn(newColumn)
  }


  return (
    <div className='column'>
      <header className='column-drag-handle' >
        <div className='column-title'>
          {/* {column.title} */}
          <Form.Control
              size="sm" type="text"
              className="trello-content-editable"
              value={columnTitle}
              onKeyDown={saveContentAfterPressEnter}
              onClick={seclectAllInlineText}
              onChange={handleColumnTitleChange}
              onBlur={handleColumnTitleBlur}
              onMouseDown={e => e.preventDefault()}
              spellCheck="false"
          />
        </div>
        <div className='column-dropdown-actions'>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" size="sm" className="dropdown-btn" />

            <Dropdown.Menu>
              <Dropdown.Item >Add card...</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal} >Remove column... </Dropdown.Item>
              <Dropdown.Item >Move all cards in this column (beta)...</Dropdown.Item>
              <Dropdown.Item >Archive all cards in this column(beta)...</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className='card-list' >
        <Container
          orientation="vertical"
          groupName='same-name-columns'
          onDrop={dropResult => onCardDrop(column.id, dropResult)}
          getChildPayload={index => cards[index] }
          dragClass='card-ghost'
          dropClass='card-ghost-drop'
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}>
          { cards.map((card, index) => (
            <Draggable key= {index} >
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
      </div>
      <footer>
        <div className="footer-actions" >
          <i className="fa fa-plus icon" />
          Add another card
        </div>
      </footer>

      <ConfirmModal
      title="Remove Column ?"
      content={`Are you sure want to remove <strong>${column.title}</strong>? <br/> All related cards will also be removed!`}
      show={showConfirmModal}
      onAction={onConfirmModalAction}/>
    </div>
  )
}
export default Column
