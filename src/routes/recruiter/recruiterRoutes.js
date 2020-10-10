const express = require('express')
const router = express.Router()

// Call Controller
const {getAllControllerRecruiter,getDetailController,loginController,deleteController} = require('../../controller/recruiter/recruiterController')
const {authentikasi,recruiter} = require('../../helper/authentikasi')
const recruiterController = require('../../controller/recruiter/recruiterController')
router
.get('/getAll',authentikasi,recruiter, getAllControllerRecruiter)
.get('/getDetail/:id', getDetailController)
.get('/login', loginController)
.delete('/delete/:id',authentikasi,recruiter, deleteController)
.post('/register', recruiterController.register)
.get('/verify/:token', recruiterController.verify)

module.exports = router
