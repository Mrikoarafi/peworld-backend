const { Router } = require('express')
const express = require('express')
const router = express.Router()

// Call Controller
const {getAllControllerEmploye,register, verification} = require('../../controller/employe/employeController')

router
.get('/getAll', getAllControllerEmploye)
.post('/register', register ) 
.get('/register/:token', verification ) 

module.exports = router
