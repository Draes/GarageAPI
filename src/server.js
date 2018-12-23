import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import {Logger} from './logger'
import checkGarageStatus from './context/notifications'
import config from '../.config/properties'
import garage from './controller/garage'

const app = express()
const port = process.env.PORT || 3000

// attach cookie and body parsers
app.use(cookieParser())
app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({extended: true}))

// add controllers
app.use('/garage', garage)

app.use('*', (req, res) => {
  res.status(404).send()
})

// notification handler
setInterval(checkGarageStatus, config.garage.statusRetryInterval)

// global error handler
app.use(function (err, req, res, next) {
  console.log(err)
  Logger.error({
    message: 'Error processing request',
    err: err.toString()
  })
  res.status(500).send({
    status: 'ERROR',
    message: 'UNKNOWN_SERVER_ERROR'
  })
  next()
})

// start accepting connections
app.listen(port)
Logger.info({
  message: `Garage API now Listening on ${port}`
})
