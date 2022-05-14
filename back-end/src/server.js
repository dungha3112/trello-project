import express from 'express'
import { connectDB } from '@/configs/mongodb'
import { env } from '@/configs/environment'

const app = express()
const hostname = env.HOST
const port = env.PORT

connectDB().catch(console.log)
app.get('/', (req, res) => {
  res.end('<h1>Hello word!c</h1><br/>')
})

app.listen(port, hostname, () => {
  console.log(`=> Server running on ${hostname}:${port}/`)
})
