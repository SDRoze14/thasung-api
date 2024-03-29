// const {exception}=require('console');
const express = require('express');
const app = express()

const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xssClean = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')
const bodyParser = require('body-parser')

const connectDB = require('./config/db')
const errorMiddleware = require('./middlewares/errors')
const ErrorHandler = require('./utils/errorHandler')

dotenv.config({path: './config/config.env'})

process.on('uncaughtException', err => {
  console.log(`ERROR: ${err.stack}`)
  console.log('Shutting down the server due to uncaught exception.')
  process.exit(1)
})

connectDB();

// Set body parser
app.use(bodyParser.urlencoded({ extended: true}))

app.use(express.static('public'))

// setup security header
app.use(helmet())

// body json
app.use(express.json())

// cookie
app.use(cookieParser())

// Sanitize data
app.use(mongoSanitize())

// xss
app.use(xssClean())

// Prevent parameter
app.use(hpp({
  whitelist: ['']
}))

// rate limit
const limiter = rateLimit({
  windowMs: 10*60*1000, // 10 min
  max: 100
})

// Setup CORS
app.use(cors())

app.use(limiter)

// router
const medicalRecord = require('./routes/meidcalRecord.router')
const auth = require('./routes/auth.router')
const user = require('./routes/user.router')
const medicalSupplies = require('./routes/medicalSuppies.router')
const activities = require('./routes/activities.router')
const Symptom = require('./routes/symptom.router')
const Queue = require('./routes/queue.router')
const DrugList = require('./routes/drugLIst.router')
const Appointment = require('./routes/appointment.router')
const Payment = require('./routes/payment.router')

app.use('/api/v1', medicalRecord)
app.use('/api/v1', auth)
app.use('/api/v1', user)
app.use('/api/v1', medicalSupplies)
app.use('/api/v1', activities)
app.use('/api/v1', Symptom)
app.use('/api/v1', Queue)
app.use('/api/v1', DrugList)
app.use('/api/v1', Appointment)
app.use('/api/v1', Payment)

// -------------------------
app.all('*', (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} route not found`, 404))
})

app.use(errorMiddleware)

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