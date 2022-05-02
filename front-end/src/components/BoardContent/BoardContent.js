import React, { useEffect, useState } from 'react'
import './BoardContent.scss';
import Column from 'components/Column/Column';
import { mapOrder } from '../../utilities/sorts';

import {intialData} from 'actions/initialData';
import { isEmpty } from 'lodash';

const BoardContent = () => {
  const [board , setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  useEffect( () => {
    const boardFromDB = intialData.boards.find(board => board.id === 'board-1');
    if(boardFromDB) {
      setBoard(boardFromDB);
      
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder,'id'));
    }
  },[]);
  if(isEmpty(board)) {
    return <div className="not-found" style={{'padding':'10px', 'color':'white' }}>Board not found</div>
  }

  return (
    <>
      <div className="board-contents">
        { columns.map((column, index) => <Column key={index} column={column}  />)}

      </div>
    </>
  )
}

export default BoardContent;
