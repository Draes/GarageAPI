import {Logger} from '../logger'
const request = require('request')
const {spawn} = require('child_process')
const config = require('../../.config/properties.js')

export default function () {
  const ls = spawn('python', ['../scripts/led.py'])
  notifyClients()
  ls.on('close', code => {
    if (code === 'OPEN') {
      notifyClients()
    }
  })
}

function notifyClients () {
  const notificationRequest = {
    url: config.firebase.notificationsUrl,
    headers: {
      'Authorization': `key=${config.firebase.key}`
    },
    json: {
      'notification': {
        'title': 'Garagem',
        'body': 'Garagem Aberta !',
        'sound': 'default'
      },
      'to': config.firebase.topic
    }
  }

  request.post(notificationRequest, err => {
    if (err) {
      Logger.info({
        message: `Error - communication with firebase failed: ${err}`
      })
    }
  })
}
