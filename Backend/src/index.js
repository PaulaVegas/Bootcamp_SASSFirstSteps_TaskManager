const express = require('express')
const app = express()
const { dbConnection } = require('./dbconfig')
require('dotenv').config()

app.use(express.json())

dbConnection()

const PORT = process.env.PORT || 3001

const swaggerUI = require('swagger-ui-express')
const docs = require('./docs/index')

app.use('/task', require('./routes/task'))

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs))

app.listen(PORT, () => console.log('puerto ok'))
