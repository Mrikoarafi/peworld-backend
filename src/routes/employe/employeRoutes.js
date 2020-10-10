const { Router } = require('express')
const express = require('express')
const router = express.Router()

// Call Controller
const {getAllControllerEmploye,getDetailController,loginController} = require('../../controller/employe/employeController')

router
.get('/getAll', getAllControllerEmploye)
.get('/getDetail/:id', getDetailController)
.get('/login', loginController)

module.exports = router
