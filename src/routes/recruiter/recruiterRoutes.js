const express = require('express')
const router = express.Router()

// Call Controller
const recruiterController = require('../../controller/recruiter/recruiterController')

router
.get('/getAll', recruiterController.getAllControllerRecruiter)
.post('/register', recruiterController.register)
.get('/verify/:token', recruiterController.verify)

module.exports = router
