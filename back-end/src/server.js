import express from 'express'
import { connectDB } from '@/configs/mongodb'
import { env } from '@/configs/environment'
import { BoardModel } from '@/models/board.model'
connectDB()
  .then(() => console.log('=> Connected successfuly to database server'))
  .then(() => bootServer())
  .catch(err => {
    console.error('===>Err connect db: '+ err)
    process.exit(1)
  })

const bootServer = () => {
  const app = express()

  app.get('/test', async (req, res) => {
    res.end('<h1> Hello word !!! </h1>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`==> Server running on ${env.APP_HOST}:${env.APP_PORT}/`)
  })
}
