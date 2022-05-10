import express from 'express'
/* eslint-disable no-console */
import { mapOrder } from '@/utilities/sorts.js'

const app = express()
const hostname = 'localhost'
const port = 5000

app.get('/', (req, res) => {
  res.end('<h1>Hello word!c</h1><br/>')
})

app.listen(port, hostname, () => {
  console.log(`Server running on ${hostname}:${port}/`)
})
