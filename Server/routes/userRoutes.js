const express = require('express')
import {signin, signup, forgotPassword, resetPassword} from '../controllers/user'

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)

export default router