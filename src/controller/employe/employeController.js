// Call Model
const {getAllModelEmploye, register, verification} = require('../../model/employe/employeModel')
// Call Response
const {success,failed,errorServer} = require('../../helper/response')
const {sendEmailEmploye} = require('../../helper/sendEmail')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
const { JWTEMPLOYE } = require('../../helper/env')
const e = require('express')
module.exports = {
  getAllControllerEmploye: async (req,res) => {
    try {
      const getEmploye = await getAllModelEmploye()
      console.log(getEmploye);
      success(res, getEmploye, 'Success get all data Employe')
    } catch (error) {
      errorServer(res, [], error.message)
    }
  },
  register: async (req,res) => {
    try {
      const {name, email, phone_number, password} = req.body
      const hashpas = bcrypt.hashSync(password, 10)
      sendEmailEmploye(email)
      const regis  = await register(name, email, phone_number, hashpas)
      success(res, regis, 'berhasil register')
    } catch (error) {
      res.send(error.message)
    }
  },
  verification: (req,res) => {
    try {
      const {token} = req.params
      if(token) {
        jwt.verify(token, JWTEMPLOYE, async (err, decode) => {
          if(err) {
            console.log(err)
          } else {
            const email = decode.email
            console.log(email)
             await verification(email)
             res.render("index", { email });
            //  success(res, data, 'activated email success')
          }
        })
      }
    } catch (error) {
      failed(res, error, 'error sob')
    }
  }
}
