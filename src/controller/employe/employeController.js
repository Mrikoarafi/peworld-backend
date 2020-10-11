// Call Model
const {getEmailEmploye,getAllModelEmploye,getDetailEmploye,loginModelEmploye,register,verification,UpdateRefreshToken,logoutModel,deleteModel,updateUserKey,newPassword} = require('../../model/employe/employeModel')
// Call Response
const {success,failed,errorServer} = require('../../helper/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {sendEmailEmploye} = require('../../helper/sendEmail')
const { JWTEMPLOYE, JWT_REFRESH } = require('../../helper/env')

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
    try {
      const DetailEmploye = await getDetailEmploye(id)
      success(res, DetailEmploye, 'Success get detail data Employe')
    } catch (error) {
      errorServer(res, [], error.message)
    }
  },
  loginController : async (req,res) => {
    const body = req.body
    try {
      const employe = await loginModelEmploye (body)
      console.log(employe);
      if (employe.length>0) {
        const statusDb = employe[0].status
        const PassDb = employe[0].password
        const email = employe[0].email
        const idEmployeDb = employe[0].id_employe
        const role = 0
        if (statusDb!==0) {
          const matchPass = await bcrypt.compare(body.password,PassDb)
          if (matchPass) {
            // Success
            const refreshtoken = jwt.sign({email:email,role:role}, JWT_REFRESH)
            UpdateRefreshToken(refreshtoken, idEmployeDb)
             jwt.sign({email:email,role:role},JWTEMPLOYE,{expiresIn:3600}, (err,tokenacc) => {
              success(res, {id:idEmployeDb,role:role,tokenacc,refreshtoken:refreshtoken}, 'Success')
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
            failed(res,[],err.message)
          } else {
            const email = decode.email
             await verification(email)
             res.render("index", { email });
            //  success(res, data, 'activated email success')
          }
        })
      }
    } catch (error) {
      failed(res, error, 'error sob')
    }
  },
  refreshtoken : (req,res) => {
    const newToken = req.body.token
    if (newToken) {
      jwt.verify(newToken,JWT_REFRESH, (err,decode) => {
        if (decode.role===0) {
          const refreshtoken = jwt.sign({email:decode.email,role:decode.role},JWTEMPLOYE,{expiresIn:3600})
          success(res,{tokenNew:refreshtoken}, 'Success refresh token')
        }else{
          failed(res,[],'Failed refresh token')
        }
      }) 
    }else{
      failed(res,[], 'Token is required!')
    }
  },
  logoutController : async (req,res) => {
    const id = req.params.id
    try {
      const logoutEmploye = await logoutModel(id)
      success(res,logoutEmploye,'Logout Employe success')
    } catch (error) {
      errorServer(res,[],err.message)      
    }
  },
  deleteController : async (req,res) => {
    const id = req.params.id
    try {
      const deleteEmploye = await deleteModel(id)
      success(res,deleteEmploye,'Delete Employe success')
    } catch (error) {
      errorServer(res,[],error.message)      
    }
  },

  forgetPassword: (req, res) => {
    try {
      const body = req.body
      const email = body.email

      getEmailEmploye(email).then((result) => {
        const userKey = jwt.sign({ email: email }, JWTEMPLOYE)

        updateUserKey(userKey, email).then((result) => {
          success(res, result, 'Please check your email for password reset')
          sendEmailForgotEmploye(email, userKey)
        }).catch((err) => {
          failed(res, [], err.message)
        })
      }).catch((err) => {
        failed(res, [], err.message)
      })
    } catch (error) {
      errorServer(res, [], error.message)
    }
  },

  resetPassword: async (req, res) => {
    try {
      const body = req.body
      const userKey = req.body.userKey

      if (!userKey) {
        failed(res, [], 'User key not found')
      } else {
        const pwd = body.password
        const salt = await bcrypt.genSalt(10)
        const pwdHash = await bcrypt.hash(pwd, salt)

        newPassword(pwdHash, userKey).then((result) => {
          success(res, result, 'Reset password success')
        }).catch((err) => {
          failed(res, [], err.message)
        })
      }
    } catch (error) {
      errorServer(res, [], error.message)
    }
  }
}
