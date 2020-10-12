// Call Model
const {
  getAllModelEmploye,
  getDetailEmploye,
  loginModelEmploye,
  register,
  verification,
  UpdateRefreshToken,
  logoutModel,
  deleteModel,
  updateEmploye,
  insertExpreience,
  insertPortofolio,
  inseertSkill,
} = require("../../model/employe/employeModel");
// const {getEmailEmploye,getAllModelEmploye,getDetailEmploye,loginModelEmploye,register,verification,UpdateRefreshToken,logoutModel,deleteModel,updateUserKey,newPassword} = require('../../model/employe/employeModel')
// Call Response
const {success,failed,errorServer} = require('../../helper/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {sendEmailEmploye} = require('../../helper/sendEmail')
const { JWTEMPLOYE, JWT_REFRESH } = require('../../helper/env')
const upload = require('../../helper/upload')

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
  updateandinsert: async (req,res) => {
    try {
            const {id} = req.params
             const {name, jobdesk,domisili , email, workplace, description, instagram, insert, github, linkedin, work_experience, phone_number, portfolio, skill} = req.body
            //  console.log(work_experience)
             await updateEmploye(name, jobdesk,domisili , email, workplace, description, instagram, github, linkedin, phone_number, id)
             const skill2 = skill.map( async (dt) => {
                const id = dt.id_employe
                const name = dt.name_skill
                await inseertSkill(name, id)
             })
           const insert1 = work_experience.map( async (dt) => {
              try {
                const position = dt.position
              const company_name = dt.company_name
              const month_year = dt.month_year
              const description = dt.description
              const id_employe = dt.id_employe
             await insertExpreience(position, company_name, month_year, description, id_employe)
              } catch (error) {
               return res.send(error.message)
              }
            })
          Promise.all([insert1, skill2]).then((resolve)=>{
              res.send({
               message: "berhasil insert update and edit databasse"
             })
            }).catch((err) =>{
              res.send(err.message)
            }) 
    } catch (error) {
      res.send(error.message)
      
    }
  },
  profilEdit: (req, res) => {
    try {
      upload.uploadsingle(req,res, async (err) =>{
        try {
          if(err) {
            res.send({
              message: err
            })
          } else {
            const {apk_name, link_repo, type_portofolio, id_employe} = req.body
            const image = req.file.filename
            console.log(apk_name, link_repo, type_portofolio, id_employe)
           const data =  await insertPortofolio(apk_name, link_repo, type_portofolio, image, id_employe)
            success(res, data, 'berhasil update')
         }
       } catch (error) {
        failed(res, error.message, 'error update image')
       }
     })
    } catch (error) {
      
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
