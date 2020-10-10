// Call Model
const {getAllModelRecruiter,getDetailRecruiter,loginModelRecruiter,deleteModel} = require('../../model/recruiter/recruiterModel')
// Call Response
const {success,failed,errorServer} = require('../../helper/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_REFRESH, JWTRECRUITER } = require('../../helper/env')
const sendEmail = require('../../helper/sendEmail')
const recruiterModel = require('../../model/recruiter/recruiterModel')
module.exports = {
  getAllControllerRecruiter: async (req,res) => {
    try {
      const getRecruiter = await getAllModelRecruiter()
      success(res, getRecruiter, 'Success get all data Recruiter')
    } catch (error) {
      errorServer(res, [], error.message)
    }
  },
  getDetailController : async (req,res) => {
    const id = req.params.id
    try {
      const DetailRecruiter = await getDetailRecruiter(id)
      success(res, DetailRecruiter, 'Success get detail data Recruiter')
    } catch (error) {
      errorServer(res, [], error.message)
    }
  },
  register: async (req, res) => {
    try {
      const body = req.body
      const passwords = req.body.password
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(passwords, salt)

      const data = {
        name_recruiter: body.name_recruiter,
        email_recruiter: body.email_recruiter,
        company_name: body.company_name,
        position: body.position,
        phone_number: body.phone_number,
        password: hashPassword
      }

      recruiterModel.register(data).then((result) => {
        success(res, result, 'Register success, please check your email for activation')
        sendEmail.sendEmailRecruiter(data.email_recruiter)
      }).catch((err) => {
        if (err.message = 'Duplicate entry') {
          failed(res, [], 'Email already exist')
        } else {
          failed(res, [], err.message)
        }
      })
    } catch (error) {
      errorServer(res, [], error.message)
    }
  },
  loginController : async (req,res) => {
    const body = req.body
    try {
      const recruiter = await loginModelRecruiter (body)
      const statusDb = recruiter[0].status
      const PassDb = recruiter[0].password
      const email = recruiter[0].email_recruiter
      const idRecruiterDb = recruiter[0].id_recruiter
      const role = 1
      if (recruiter) {
        if (statusDb!==0) {
          const matchPass = await bcrypt.compare(body.password,PassDb)
          if (matchPass) {
            // Success
          
             jwt.sign({email:email,role:role},JWTRECRUITER, (err,tokenacc) => {
              success(res, {id:idRecruiterDb,role:role,tokenacc}, 'Success')
            })
         }else{
           failed(res,[],'wrong password')
          }
        }else{
          failed(res,[],'Recruiter has not been actived')
        }
       }else{
         failed(res,[],'Recruiter has not been registere')
       }
      } catch (error) {
        errorServer(res, [], error.message)
      }
  },
  verify: (req, res) => {
    try {
      const token = req.params.token
      jwt.verify(token, JWTRECRUITER, (err, decode) => {
        if (err) {
          failed(res, [], 'Authorization failed')
        } else {
          const email = decode.email

          recruiterModel.updateStatus(email).then((result) => {
            res.render('index', { email })
          }).catch((err) => {
            failed(res, [], err.message)
          })
        }
      })
    } catch (error) {
      errorServer(res, [], 'Internal server error')
    }
  },
  deleteController : async (req,res) => {
    const id = req.params.id
    try {
      const deleteRecruiter = await deleteModel(id)
      success(res,deleteRecruiter,'Delete Recruiter success')
    } catch (error) {
      errorServer(res,[],error.message)      
    }
  },
}
