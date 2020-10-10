const express = require('express')
const router = express.Router()

// Call Controller
const {getAllControllerRecruiter} = require('../../controller/perekrut/perekrutController')

router
.get('/getAll', getAllControllerRecruiter)

module.exports = router
