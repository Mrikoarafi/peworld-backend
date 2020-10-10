// Call Model
// const {getAllModelRecruiter} = require('../../model/perekrut/perekrutModel')
const recruiterModel = require('../../model/recruiter/recruiterModel')
const { success, failed, errorServer } = require('../../helper/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWTRECRUITER } = require('../../helper/env')
const sendEmail = require('../../helper/sendEmail')


module.exports = {
  getAllControllerRecruiter: () => {
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
  }
}