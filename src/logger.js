import winston from 'winston'
import config from '../.config/logger'

winston.loggers.add('default', config.default)
export const Logger = winston.loggers.get('default')
