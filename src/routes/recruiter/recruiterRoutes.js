const express = require('express')
const router = express.Router()

// Call Controller
const {getAllControllerRecruiter,getDetailController,loginController,deleteController} = require('../../controller/recruiter/recruiterController')
const {authentikasi,employe,recruiter} = require('../../helper/authentikasi')
router
.get('/getAll',authentikasi,recruiter, getAllControllerRecruiter)
.get('/getDetail/:id', getDetailController)
.get('/login', loginController)
.delete('/delete/:id', deleteController)

module.exports = router
