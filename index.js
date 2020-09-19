const {exception}=require('console');
const express = require('express');
const app = express()

const dotenv = require('dotenv')

const connectDB = require('./config/db')
const errorMiddleware = require('./middlewares/errors')
const ErrorHandler = require('./utils/errorHandler')

dotenv.config({path: './config/config.env'})

process.on('uncaughtException', err => {
  console.log(`ERROR: ${err.message}`)
  console.log('Shutting down the server due to uncaught exception.')
  process.exit(1)
})

connectDB();

app.use(express.json())

app.all('*', (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} route not found`, 404))
})

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

process.on('unhandledRejection', err => {
  console.log(`Error: ${err.message}`)
  console.log('Shutting down the server due to Unhandled promise rejection.')
  server.close( () => {
    process.exit(1)
  })
})