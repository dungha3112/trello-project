export const intialData = {
    boards: [
        {
            id: 'board-1',
            columnOrder: ['column-1', 'column-2' , 'column-3'],
            columns: [
                {
                    id: 'column-1',boardId: 'board-1',title: 'To do column 1', 
                    cardOrder:['card-1', 'card-2' , 'card-3', 'card-4', 'card-5'],
                    cards:[
                        {
                            id: 'card-1',boardId: 'board-1',columnId: 'column-1',title: 'Title card 1',
                            cover: 'https://icdn.dantri.com.vn/thumb_w/640/2020/12/16/ngam-dan-hot-girl-xinh-dep-noi-bat-nhat-nam-2020-docx-1608126694049.jpeg'
                        },
                        {
                            id: 'card-2',boardId: 'board-1',columnId: 'column-1',title: 'Title card 2',cover: null
                        },
                        {
                            id: 'card-3',boardId: 'board-1',columnId: 'column-1',title: 'Title card 3',cover: null
                        },
                        {
                            id: 'card-4',boardId: 'board-1',columnId: 'column-1',title: 'Title card 4',cover: null
                        },
                        {
                            id: 'card-5',boardId: 'board-1',columnId: 'column-1',title: 'Title card 5',cover: null
                        },
                    ]
                },
                {
                    id: 'column-2',boardId: 'board-1',title: 'Inprogress column 1', 
                    cardOrder:['card-6', 'card-7' , 'card-8'],
                    cards:[
                        {
                            id: 'card-6',boardId: 'board-1',columnId: 'column-1',title: 'Title card 6',cover: null
                        },
                        {
                            id: 'card-7',boardId: 'board-1',columnId: 'column-1',title: 'Title card 7',cover: null
                        },
                        {
                            id: 'card-8',boardId: 'board-1',columnId: 'column-1',title: 'Title card 8',cover: null
                        }
                    ]
                },
                {
                    id: 'column-3',boardId: 'board-1',title: 'Done column 1', 
                    cardOrder:['card-9', 'card-10' , 'card-11'],
                    cards:[
                        {
                            id: 'card-9',boardId: 'board-1',columnId: 'column-1',title: 'Title card 9',cover: null
                        },
                        {
                            id: 'card-10',boardId: 'board-1',columnId: 'column-1',title: 'Title card 10',cover: null
                        },
                        {
                            id: 'card-11',boardId: 'board-1',columnId: 'column-1',title: 'Title card 11',cover: null
                        }
                    ]
                }
            ]
        }
    ]
}