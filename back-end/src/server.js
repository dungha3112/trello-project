import express from 'express'
import {mapOrder} from './utilities/sorts.js'

const app = express();
const hostname = 'localhost'
const port = 5000

app.get('/', (req, res) => {
  res.end('<h1>Welcome</h1>')
})

app.listen(port, hostname, () => {
  console.log(`Server running on ${hostname}:${port}/`)
})
