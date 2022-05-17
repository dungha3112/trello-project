import express from 'express'
import { BoardValidation } from '@/validations/board.validation'
import { BoardController } from '@/controllers/board.controller'


const router = express.Router()

router.route('/')
  // .get((req, res) => console.log('GEt board'))
  .post(BoardValidation.createNew, BoardController.createNew)

export const boardRoutes = router
