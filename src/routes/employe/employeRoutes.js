const { Router } = require('express')
const express = require('express')
const router = express.Router()

// Call Controller
const {getAllControllerEmploye} = require('../../controller/employe/employeController')

router
.get('/getAll', getAllControllerEmploye)

module.exports = router
