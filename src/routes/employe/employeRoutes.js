const express = require('express')
const router = express.Router()

// Call Controller
const {getAllControllerEmploye,getDetailController,loginController,register,verification,refreshtoken,logoutController,deleteController} = require('../../controller/employe/employeController')
const {authentikasi,employe,recruiter} = require('../../helper/authentikasi')
router
.get('/getAll', authentikasi,employe,getAllControllerEmploye)
.get('/getDetail/:id', getDetailController)
.get('/register/:token', verification ) 
.get('/login', loginController)
.post('/register', register ) 
.post('/refreshtoken', refreshtoken ) 
.put('/logout/:id', logoutController ) 
.delete('/delete/:id',authentikasi,employe, deleteController ) 

module.exports = router
