const express = require('express')
const router = express.Router()
const { registerAccount, logIn, logout } = require('../controllers/authController')

router.post ('/register', registerAccount)
router.post ('/login', logIn)

router.get('/logout', logout)

module.exports = router 