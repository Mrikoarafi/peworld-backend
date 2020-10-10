// Call Model
const {getAllModelRecruiter,getDetailRecruiter,loginModelRecruiter,deleteModel} = require('../../model/recruiter/recruiterModel')
// Call Response
const {success,failed,errorServer} = require('../../helper/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_REFRESH, JWTRECRUITER } = require('../../helper/env')

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
    console.log(id);
    try {
      const DetailRecruiter = await getDetailRecruiter(id)
      success(res, DetailRecruiter, 'Success get detail data Recruiter')
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
     
  deleteController : async (req,res) => {
    const id = req.params.id
    try {
      const deleteRecruiter = await deleteModel(id)
      success(res,deleteRecruiter,'Delete Recruiter success')
    } catch (error) {
      errorServer(res,[],error.message)      
    }
  }

}
