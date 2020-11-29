import isAllowed from '../context/allowed'
import express from 'express'
import {spawn} from 'child_process'

const router = express.Router()

router.post('/trigger', isAllowed, (req, res) => {
  const ls = spawn('python', ['../scripts/trigger.py'])
  ls.on('close', code => {
    let message = (code === 1 ? 'Garage lock triggered' : 'An error has occurred')
    res.status(200).json({status: 200, message: message})
  })
})

router.get('/status', isAllowed, (req, res) => {
  const ls = spawn('python', ['../scripts/led.py'])
  ls.on('close', code => {
    res.status(200).json({status: code})
  })
})

module.exports = router
