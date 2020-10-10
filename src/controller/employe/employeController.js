// Call Model
const {getAllModelEmploye,getDetailEmploye,loginModelEmploye} = require('../../model/employe/employeModel')
// Call Response
const {success,failed,errorServer} = require('../../helper/response')
const bcrypt = require('bcrypt')
const {sendEmailPekerja} = require('../../helper/sendEmail')
const jwt = require('jsonwebtoken')
const { JWTEMPLOYE } = require('../../helper/env')
module.exports = {
  getAllControllerEmploye: async (req,res) => {
    try {
      const getEmploye = await getAllModelEmploye()
      success(res, getEmploye, 'Success get all data Employe')
    } catch (error) {
      errorServer(res, [], error.message)
    }
  },
  getDetailController : async (req,res) => {
    const id = req.params.id
    console.log(id);
    try {
      const DetailEmploye = await getDetailEmploye(id)
      console.log(DetailEmploye);
      success(res, DetailEmploye, 'Success get all data Employe')
    } catch (error) {
      errorServer(res, [], error.message)
    }
  },
  loginController : async (req,res) => {
    const body = req.body
    try {
      const employe = await loginModelEmploye (body)
      const statusDb = employe[0].status
      const PassDb = employe[0].password
      const email = employe[0].email
      const idEmployeDb = employe[0].id_employe
      if (employe) {
        if (statusDb!==0) {
          const matchPass = await bcrypt.compare(body.password,PassDb)
          if (matchPass) {
            // Success
            const refreshtoken = jwt.sign({email:email}, JWTEMPLOYE)
             jwt.sign({email:email},JWTEMPLOYE,{expiresIn:'60s'}, (err,tokenacc) => {
              success(res, {id:idEmployeDb,role:0,tokenacc,refreshtoken:refreshtoken}, 'Success')
            })
         }else{
           failed(res,[],'wrong password')
          }
        }else{
          failed(res,[],'Employe has not been actived')
        }
       }else{
         failed(res,[],'Employe has not been registere')
       }
      } catch (error) {
        errorServer(res, [], error.message)
      }
  },
     
}
