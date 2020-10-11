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
  register: (data) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO recruiter (name_recruiter, email_recruiter, company_name, position, phone_number, password, status) VALUES ('${data.name_recruiter}','${data.email_recruiter}','${data.company_name}','${data.position}','${data.phone_number}','${data.password}', 0)`, (err, result) => {
        if (err) {
          reject(new Error(err))
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
  },
  updateStatus: (email) => {
    return new Promise((resolve, reject) => {
      
      db.query(`UPDATE recruiter SET status = 1 WHERE email_recruiter='${email}'`, (err, result) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(result)
        }
      })
    })
  }
}
