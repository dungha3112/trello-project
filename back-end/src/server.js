import express from 'express'
import cors from 'cors'
import { corsOptions } from '@/configs/cors'
import { connectDB } from '@/configs/mongodb'
import { env } from '@/configs/environment'
import { apiV1 } from '@/routes/v1'
connectDB()
  .then(() => console.log('=> Connected successfuly to database server'))
  .then(() => bootServer())
  .catch(err => {
    console.error('===>Err connect db: '+ err)
    process.exit(1)
  })

const bootServer = () => {
  const app = express()

  app.use(cors(corsOptions))
  // enable req.body data
  app.use(express.json())

  // use api vi
  app.use('/v1', apiV1)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`==> Server running on ${env.APP_HOST}:${env.APP_PORT}/`)
  })
}
