import auth from '../../.config/auth'

export default function (req, res, next) {
  if (req.headers['auth'] === auth.hash) {
    next()
  } else {
    res.status(403).json({ status: 403, message: 'access forbidden' })
  }
}
