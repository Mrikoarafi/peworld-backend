const express = require('express')
const router = express.Router()

// Call Controller
const {getAllControllerRecruiter} = require('../../controller/recruiter/recruiterController')

router
.get('/getAll', getAllControllerRecruiter)

module.exports = router
