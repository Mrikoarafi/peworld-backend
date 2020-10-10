const db = require('../../config/db_hireapp')

module.exports = {
  getAllModelRecruiter : () => {
    return new Promise((resolve,reject) => {
      db.query(`SELECT * FROM recruiter`, (err,result) => {
        err?reject(new Error(err.message)): resolve(result)
      })
    })
  },
  getDetailRecruiter : (id) => {
    return new Promise((resolve,reject) => {
      db.query(`SELECT * FROM recruiter WHERE id_recruiter=${id}`, (err,result) => {
        err?reject(new Error(err.message)): resolve(result)
      })
    })
  },
  loginModelRecruiter : (data) => {
    return new Promise((resolve,reject) => {
      db.query(`SELECT * FROM recruiter WHERE email_recruiter='${data.email}'`, (err,result) => {
        err?reject(new Error (err.message)) : resolve(result)
      })
    })
  },
  verification: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE employe set status = 1 WHERE email = '${email}'`, (err, result) => {
        if(err){
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  deleteModel : (id) => {
    return new Promise((resolve,reject) => {
      db.query(`DELETE FROM recruiter WHERE id_recruiter='${id}'`, (err,result) => {
        err?reject(new Error(err.message)) : resolve(result)
      })
    })
  }
}